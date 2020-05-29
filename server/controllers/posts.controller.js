import postSections from '../models/sections.model'
import postTags from '../models/tags.model'
import Documents from '../models/documents.model'
import Posts from '../models/posts.model'
import likedPosts from '../models/liked_posts.model'
import Comments from '../models/comments.model'
import likedComments from '../models/liked_comments.model'
import externalUrls from '../models/external.url.model'
import mongoose from 'mongoose'
import CONFIG from '../../config';
import uuid from 'uuid/v4';
import AWS from 'aws-sdk'
import rp from 'request-promise'
import moment from 'moment'

const s3 = new AWS.S3({
    accessKeyId: CONFIG.S3.ACCESS,
    secretAccessKey: CONFIG.S3.SECRET,
    region: 'ap-south-1'
});

export default {

    listSections : async (req, res)=>{
        try{
           const sections = await postSections.find({});
           res.status(200).send({
               data : sections  
           })
        }catch(e){
           res.status(400).send({
               error : CONFIG.ERRORS[100]
           })
         }
    },

    listTags : async (req, res)=>{
        try{
           const sections = await postTags.find({});
           res.status(200).send({
               data : sections  
           })
        }catch(e){
           res.status(400).send({
               error : CONFIG.ERRORS[100]
           })
         }
    },

    listUniversalUploads : async (req, res)=>{
        try{
           const documents = await Documents.find({}).sort({created: -1});
           return res.status(200).send({
               data : documents  
           })
        }catch(e){
           return res.status(400).send({
               error : CONFIG.ERRORS[100]
           })
         }
    },

    uploadImagetoS3 : async (req, res)=>{
        console.log('s3-upload');
         try{
             let result = null, base64 = null, mime = null, ext = null;
             let listOfSupportedExtns = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
             if(!req.body.url && req.body.data64){
                     result = Buffer.from(req.body.data64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
                     ext = req.body.ext;
             }else{
                     result = await rp({url: req.body.url, encoding: null});
                     let buff = new Buffer(result);
                         ext = (req.body.url).split('.').pop();
                         base64 = `data:image/${ext};base64,`+buff.toString('base64');
                         console.log('ext')
                         console.log(ext)
             }

             ext = listOfSupportedExtns.indexOf(ext)<0 ? 'jpg': ext;
             const slugId = uuid();
             const base64Data = result;
             const type = `image/${ext}`;
             const key = `uploads/${moment().format('DD-MM-YYYY')}/${slugId}.${ext}`;
             const params = {
                   Bucket: CONFIG.S3.BUCKET,
                   Key: key,
                   Body: base64Data,
                   ContentType: type
             }
             const s3Result = await s3.putObject(params).promise(); 

             console.log({
                 url : `https://${CONFIG.S3.BUCKET}.s3.ap-south-1.amazonaws.com/${key}`,
                 key: key,
                 slug: slugId,
                 base64, 
                 mime: type,
                 ext
             });

            const documentsObj = new Documents({
                url : `https://${CONFIG.S3.BUCKET}.s3.ap-south-1.amazonaws.com/${key}`,
                key: key,
                slug: slugId,
                mime: type,
                ext
            });

            await documentsObj.save();

           return res.status(200).send({
                 url : `https://${CONFIG.S3.BUCKET}.s3.ap-south-1.amazonaws.com/${key}`,
                 key: key,
                 slug: slugId,
                 base64, 
                 mime: type,
                 ext
             });
         }catch(e){
             console.log(e);
             return res.status(400).send({
                 error: e
             })
         }
    },

    uploadPost : async (req, res)=>{
        const newPost = {
                user_id: req.user ? req.user._id : '5e12110169481b125b9d0cb6',
                url: (req.body.uploadedURL).trim(),
                slugId: (req.body.postSlug).trim(),
                title: (req.body.postTitle).trim(),
                section: (req.body.postSections),
                mime_type: (req.body.postMime).trim(),
                ext: (req.body.postExt).trim(),
        };

        if((req.body.postMime).indexOf('video')>=0){
            newPost['content_type'] = 2;
        }

        const posts = new Posts(newPost);
        try{
            const result = await posts.save();
            console.log(result);
            return res.status(200).send({
                data : CONFIG.MESSAGES[100]   
            })
        }catch(e){
            console.log(e);
            return res.status(400).send({
                error : CONFIG.ERRORS[100]   
            })
        }
    },

    listPosts : async (req, res)=>{
        const postMatchObject = { is_active: true };
        try{
            const skip = parseInt(req.query.offset) || 0,
                  limit = parseInt(req.query.limit) || 2;

            console.log(req.query);
            
            const posts = await Posts.aggregate([
                        { $match : postMatchObject },
                        {
                          $lookup: {
                            from : 'sections',
                            localField: 'section',
                            foreignField: '_id',
                            as: 'section_details'
                          }
                        },
                        { $unwind: "$section_details" },
                        {
                          $lookup: {
                            from : 'liked_posts',
                            let : { liked_post : '$_id'},
                            pipeline: [
                                {
                                    $match:{
                                         $expr: { $eq: [ "$post_id",  "$$liked_post" ] },
                                         user_id: mongoose.Types.ObjectId(req.user._id),
                                         is_active: true       
                                    }
                                }
                            ],
                            as : 'liked'
                          }
                        },
                        { $project: 
                            { 
                                like_count: 1,
                                comment_count: 1,
                                share_count: 1,
                                download_count: 1,
                                user_id: 1,
                                url: 1,
                                title: 1,
                                section: 1,
                                mime_type: 1,
                                ext: 1,
                                created: 1,
                                liked: { $size:  "$liked" },
                                'section_details._id': 1, 
                                'section_details.value': 1, 
                                'section_details.url': 1, 
                            }
                        },
                        { $sort: { created : -1 } }
                  ])
                  .skip(skip)
                  .limit(limit);


            res.status(200).send({
                data : posts  
            })

            console.log(posts);
        }catch(e){
            console.log(e);
            res.status(400).send({
                error : CONFIG.ERRORS[100]
            })
        } 
    },

    postLiked: async (req, res)=>{
        console.log(req.user);
        const postId = (req.body.post_id).trim();
        const counter = req.body.flag===true ? 1: -1;

        console.log(counter);

        try{
           let isActive = counter>0 ? true: false;
           await likedPosts.findOneAndUpdate({
               user_id: mongoose.Types.ObjectId(req.user._id),
               post_id: mongoose.Types.ObjectId(postId)                    
           }, 
           { is_active: isActive },
           { upsert: true });

           const updatePosts = await Posts.findOneAndUpdate(
                    { _id: postId },
                    {
                        $inc : { like_count: counter }
                    },
                    {new: true}
           );
           res.status(200).send({
               data : updatePosts  
           })
        }catch(e){
           res.status(400).send({
               error : e   
           })
        }
    },

    queryTest : async (req, res)=>{
        // const postMatchObject = {};
        // if(req.query && req.query['post_id']!=='undefined'){
        //     let _id = (req.query['post_id']).trim();
        //     postMatchObject['_id'] = mongoose.Types.ObjectId(_id)
        // }
        try{
            const posts  = await Posts.updateMany({}, {liked: false, like_count: 0, comment_count: 0, share_count: 0});
            res.status(200).send({
                data : posts  
            })
        }catch(e){
            res.status(400).send({
                error : e
            })
        } 
    },

    postComments: async (req, res)=>{
        const postId = (req.body.post_id).trim(),
              commentTxt = (req.body.text).trim();
        const comments = new Comments({
              user_id: req.user._id,
              post_id: postId,
              text: commentTxt
         });
        try{
           const result = await comments.save();
           const countComments = await Posts.findOneAndUpdate(
                    { _id: postId },
                    {
                        $inc : { comment_count: 1 }
                    },
                    {new: true}
           );
           res.status(200).send({
               data : countComments  
           })
        }catch(e){
           res.status(400).send({
               error : e   
           })
        }
    },

    listComments: async (req, res)=>{
        const postId = req.body.post_id;
        const userId = mongoose.Types.ObjectId(req.user._id);
        try{
           const comments = await Comments.aggregate([
                  { $match : { post_id : mongoose.Types.ObjectId(postId), is_active : true  } },
                  {  
                    $lookup: {
                          from : 'users',
                          localField: 'user_id',
                          foreignField: '_id',
                          as: 'user_details'
                    }
                  },
                  { $unwind: "$user_details" },
                  {
                    $lookup: {
                        from: 'liked_comments',
                        let : { liked_comment: '$_id' },
                        pipeline: [
                            { $match:
                                { 
                                    $expr: { $eq: [ "$comment_id",  "$$liked_comment" ] },
                                    post_id: mongoose.Types.ObjectId(postId) ,
                                    user_id: mongoose.Types.ObjectId(req.user._id),
                                    is_active: true,
                                }
                            }
                        ],
                        as : 'liked'
                    }
                  },
                  { $project: 
                    { 
                        points: 1,
                        created: 1,
                        liked: {$size: "$liked"},
                        user_id: 1, post_id: 1, text: 1,
                        'user_details._id': 1, 
                        'user_details.name': 1, 
                        'user_details.profile_pic': 1, 
                        'user_details._id': 1
                    }
                  },
                  {
                     $set : { current_user: { $eq: [ "$user_id", userId ] } }
                  },
                  { $sort: { created : -1 } }
           ]);
           console.log(comments);
           res.status(200).send({
               data : comments  
           })
        }catch(e){
           res.status(400).send({
               error : e
           })
        } 
    },

    upvoteComments: async (req, res)=>{
        const commentId = req.body.comment_id;
        const postId = req.body.post_id;
        const counter = req.body.flag===true ? 1: -1;
        try{
            let isActive = counter>0 ? true: false;
            await likedComments.findOneAndUpdate({
                user_id: mongoose.Types.ObjectId(req.user._id),
                comment_id: mongoose.Types.ObjectId(commentId), 
                post_id: mongoose.Types.ObjectId(postId)                    
            }, 
            { is_active: isActive },
            { upsert: true })

            const upvotedComment = await Comments.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId(commentId) },
                {
                    $inc : { points: counter }
                },
                {new: true}
            );

            res.status(200).send({
                data : upvotedComment  
            })
        }catch(e){
           res.status(400).send({
               error : e
           })
        } 
    },

    deleteComment : async (req, res)=>{
          const {comment_id, post_id} = req.body;
          try {
            const result = await Comments.findOneAndUpdate({
                _id: mongoose.Types.ObjectId(comment_id), 
                user_id : mongoose.Types.ObjectId(req.user._id),
                post_id: mongoose.Types.ObjectId(post_id)                    
            }, 
            { is_active: false });

            await likedComments.findOneAndUpdate({
                user_id: mongoose.Types.ObjectId(req.user._id),
                comment_id: mongoose.Types.ObjectId(comment_id), 
                post_id: mongoose.Types.ObjectId(post_id)                    
            }, 
            { is_active: false })

            res.status(200).send({
                data : result  
            })
          } catch(e) {
            res.status(400).send({
                error : e
            })
          }
    },

    addSections : async (req, res)=>{
         console.log(req.body);
         const sectionId = req.body.section_id ? req.body.section_id: null;
         const is_active = req.body.disabled ? req.body.disabled : true;
         const { section_name, section_logo, section_description } = req.body;
         try {
            const result = await postSections.findOneAndUpdate({
              _id: mongoose.Types.ObjectId(sectionId),                 
            }, 
            { value: section_name,
              url: section_logo, 
              description: section_description,
              is_active
            },
            { upsert: true });

            res.status(200).send({
                data : result  
            })
         } catch (e) {
            res.status(400).send({
                error : e
            })
         }
    },

    addTags : async (req, res)=>{
        console.log(req.body);
        const tagId = req.body.tag_id ? req.body.tag_id: null;
        const is_active = req.body.disabled ? req.body.disabled : true;
        const { tag_name } = req.body;
        try {
        const result = await postTags.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(tagId),                 
        }, 
        {   name: tag_name,
            is_active
        },
        { upsert: true });

        res.status(200).send({
            data : result  
        })
        } catch (e) {
        res.status(400).send({
            error : e
        })
        }
    },

    toggleContents: async (req, res)=>{
        console.log(req.body);
        const {type, id, action} = req.body;
        let result = null;
        try {
           if(type==='sections'){
              result = await postSections.findOneAndUpdate({
                _id: mongoose.Types.ObjectId(id),                 
              }, 
              { is_active: action });
           }else if(type==='tags'){
              result = await postTags.findOneAndUpdate({
                _id: mongoose.Types.ObjectId(id),                 
              }, 
              { is_active: action });
           }

           res.status(200).send({
               data : result  
           })
        } catch (e) {
           res.status(400).send({
               error : e
           })
        }
   },

   listPostsOfCrawledPage : async (req, res) =>{
        const { source_name: source , limit=8, offset=0 } = req.query; 
        
        console.log(req.query);
        // console.log(li);

        try {
            const result = await externalUrls.find({source})
                                            .skip(parseInt(offset))
                                            .limit(parseInt(limit))
                                            .sort({ created: -1 });
            res.send({
                data: result
            })
        } catch (error) {
            return res.send({
                error
            })            
        }        
    } 

}







  