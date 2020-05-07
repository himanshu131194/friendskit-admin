import request from 'request'
import rp from 'request-promise'
import postSections from '../models/sections.model'
import Documents from '../models/documents.model'
import Posts from '../models/posts.model'
import externalUrls from '../models/external.url.model'
import latestCursor from '../models/latest_cursor.model'
import mongoose from 'mongoose'
import CONFIG from '../../config';
import uuid from 'uuid/v4';
import AWS from 'aws-sdk'
import moment from 'moment'
import fetch from 'node-fetch';
import fs from 'fs';


const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminOptipng = require('imagemin-optipng');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminWebp = require('imagemin-webp');
const imageminGiflossy = require('imagemin-giflossy');

const s3 = new AWS.S3({
    accessKeyId: CONFIG.S3.ACCESS,
    secretAccessKey: CONFIG.S3.SECRET,
    region: 'ap-south-1'
});

const uploadToS3 = async (externalUrl, data64)=>{
    console.log('s3-upload');
    try{
        let result = null, base64 = null, mime = null, ext = null;
        let listOfSupportedExtns = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
        if(data64){
                result = Buffer.from(data64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
                ext = req.body.ext;
        }else{
                result = await rp({url: externalUrl, encoding: null});
                let buff = new Buffer(result);
                    ext = (externalUrl).split('.').pop();
                    base64 = `data:image/${ext};base64,`+buff.toString('base64');
        }
        const slugId = uuid();
        ext = listOfSupportedExtns.indexOf(ext)<0 ? 'jpg': ext;
        //SAVE BUFFER AS PNG FORMAT 
        fs.writeFileSync(`result_image/${slugId}.${ext}`, result);
        //GET PNG FROM LOCAL AND COMPRESS AND RETURN COMPRESS BUFFF


        const compressedContent = await imagemin([`result_image/${slugId}.{jpg,png,webp,gif}`], 
        {
            use: [
                imageminJpegtran(),
                imageminOptipng()
            ]
        }       
        );
        // const compressedContent = await imagemin([`result_image/${slugId}.{jpg,png,webp,gif}`], {
        //     plugins: [
        //         imageminMozjpeg({quality: 80}),
        //         imageminPngquant({
        //             quality: [0.6, 0.8]
        //         }),
        //         imageminWebp({quality: 80}),
        //         imageminGiflossy({lossy: 80})
        //     ] 
        // });
        result = compressedContent[0].data;
        //DELETE PNG FROM LOCAL
        fs.unlinkSync(`result_image/${slugId}.${ext}`);
        //SAVE BUFFER IN S3 AND GET COMPRESS UPLOADED 
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
            // base64, 
            mime: type,
            ext
        });
        
       return {
            s3_url : `https://${CONFIG.S3.BUCKET}.s3.ap-south-1.amazonaws.com/${key}`,
            slug_id : slugId,
            mime: type,
            ext
       }
    }catch(e){
        console.log(e);
        // return res.status(400).send({
        //     error: e
        // })
    }
}

export default {

    storeAllCrawledUrls : async (req ,res)=>{
        console.log(req.body);
        const next_cursor = req.body.next_cursor ? req.body.next_cursor.trim(): null;
        const { source_urls, source_name, crawled_source, current_url, selected_section } = req.body;
        //CHECK URL IS ALREADY IN DB 
        const urlsArray = source_urls.reverse();
        const is_present = false;
        let resultArray = [];
        for(let x of urlsArray){
            const result = await externalUrls.findOne({ 
                  url : x.src.trim()
            });
            let title = x.title;
            if(!result){
                const s3Result = await uploadToS3(x.src.trim());
                let url = x.src.trim();
                if(crawled_source===1){
                   url = current_url;
                }
                resultArray.push({
                    url,
                    title,
                    s3_url: s3Result.s3_url, 
                    slug_id: s3Result.slug_id,
                    mime_type: s3Result.mime,
                    ext: s3Result.ext,
                    crawled_source,
                    source: source_name.toLowerCase().trim(),
                    next_cursor,
                    section: mongoose.Types.ObjectId(selected_section)
                });
                //UPATE THE LATEST CURSOR COLLECTION
                console.log('crawled_source');
                console.log(crawled_source);

                await latestCursor.findOneAndUpdate({ 
                    source: source_name.toLowerCase().trim()
                }, 
                { next_cursor, url, crawled_source},
                { upsert: true });
            }
        }
        console.log(resultArray);
        resultArray = resultArray.reverse();
        externalUrls.insertMany(resultArray, (err, data)=>{
            console.log(data);
            res.send({
                data
            })
        })
    },

    // uploadPost : async (req, res)=>{
    //     const newPost = {
    //             user_id: req.user ? req.user._id : '5e12110169481b125b9d0cb6',
    //             url: (req.body.uploadedURL).trim(),
    //             slugId: (req.body.postSlug).trim(),
    //             title: (req.body.postTitle).trim(),
    //             section: (req.body.postSections),
    //             mime_type: (req.body.postMime).trim(),
    //             ext: (req.body.postExt).trim(),
    //     };

    //     if((req.body.postMime).indexOf('video')>=0){
    //         newPost['content_type'] = 2;
    //     }

    //     const posts = new Posts(newPost);
    //     try{
    //         const result = await posts.save();
    //         return res.status(200).send({
    //             data : CONFIG.MESSAGES[100]   
    //         })
    //     }catch(e){
    //         return res.status(400).send({
    //             error : CONFIG.ERRORS[100]   
    //         })
    //     }
    // },

    listCrawledPages : async (req, res)=>{
        try{
           const sections = await externalUrls.aggregate([
                {
                    $group: {
                        _id : "$source" ,
                        'yesCount': {
                            "$sum": {
                                "$cond": [ "$post_uploaded", 1, 0 ]
                            }
                        },
                        'noCount': {
                            "$sum": {
                                "$cond": [ "$post_uploaded", 0, 1 ]
                            }
                        },
                        'totalCount': {
                                $sum : 1
                        },
                    }
                }
           ]);
           res.status(200).send({
               data : sections  
           })
        }catch(e){
           res.status(400).send({
               error : e
           })
         }
    },

    listUploadedPosts : async (req, res)=>{
        //   //Count total posts 
        await externalUrls.updateMany({
             
        },{
            post_uploaded: false
        });
        // await latestCursor.deleteMany({}); 
        // const listOfPages = await externalUrls.aggregate([
        //     {
        //      $group: {
        //          _id : "$source" ,
        //          count: { $sum : 1},
        //          section : { $first: '$section'}
        //      }
        //     }
        // ]);
        const result = await Posts.deleteMany({
            // crawled: true
        });
        // //  const result = await latestCursor.find({
        //  const result = await Posts.createIndexes({ created : -1});
        // const result = await Posts.find({
        //     _id : '5eacb1f26846567f35480ec6'//mongoose.Schema.ObjectId('5eacb1f26846567f35480ec6')
        // })
        // //   }).sort({ created : -1}); 
        //   await latestCursor.deleteMany({}); 
        // 'yesCount': {
        //     "$sum": {
        //         "$cond": [ "$post_uploaded", 1, 0 ]
        //     }
        // },

//         const result= await Posts.find({ }, {
//             like_count: 1,
//             comment_count: 1,
//             share_count: 1,
//             download_count: 1,
//             user_id: 1,
//             url: 1,
//             title: 1,
//             section: 1,
//             mime_type: 1,
//             ext: 1,
//             created: 1,
//             liked: 1,
//         }).populate('section')
//                      .sort({ _id: -1})
//                      .skip(0)
//                      .limit(2);

        res.send({
            result
        });
    },

    uploadPost : async (req, res)=>{
        let selectedToOnly = {$match: {}};
        if(req.query && req.query.page){
            let listOfselected = JSON.parse(req.query.page);
            selectedToOnly = listOfselected.indexOf('all')>=0 ? selectedToOnly :  {$match : { source : {$in: listOfselected} }};
        }
        //GET ALL PAGES LIST 
        const listOfPages = await externalUrls.aggregate([
            selectedToOnly,
            {
             $group: {
                 _id : "$source" ,
                 count: { $sum : 1},
                 section : { $first: '$section'}
             }
            }
        ]);
        //GET RANDON VALUE FROM LIST OF PAGES
        const randomIntFromInterval = (min, max) => (Math.floor(Math.random() * (max - min + 1) + min)),
              randomSelectedPage = listOfPages[randomIntFromInterval(0, listOfPages.length-1)],
              selectedPage = randomSelectedPage._id,
              sectionId = randomSelectedPage.section;
        
        //UPDATE PAGE AND GET ONE URL
        const getNewUrl = await externalUrls.findOne({
            source: selectedPage.trim(),
            post_uploaded: false
        });
        
        if(!getNewUrl){
            return res.status(200).send({
                data : []
            })
        };
        
        const urlToUplaod = await externalUrls.findOneAndUpdate({
            _id : getNewUrl._id,
            source: selectedPage.trim(),
            post_uploaded: false
        },
        { post_uploaded: true },
        { new : true });

        //CHECK CRAWLED_SOURCE_URL
        const crawledSourceUrl = await Posts.findOne({
            crawled_source_url: urlToUplaod.url.trim(),
            crawled: true,
        });
        
        if(crawledSourceUrl){
            console.log('alredy exits post');
            console.log(urlToUplaod.url.trim());
            return res.status(200).send({
                data : []
            })
        }
        //UPDATE POST TABLE
        const newPost = {
                user_id: req.user ? req.user._id : '5e7ea43f9cf4640b79d58e6c',
                url: (urlToUplaod.s3_url).trim(),
                slugId: (urlToUplaod.slug_id).trim(),
                title: urlToUplaod.title,
                crawled: true,
                crawled_source: urlToUplaod._id,
                crawled_source_url: urlToUplaod.url.trim(),
                section: sectionId,
                mime_type: (urlToUplaod.mime_type).trim(),
                ext: (urlToUplaod.ext).trim(),
        };
        if((urlToUplaod.mime_type).indexOf('video')>=0){
            newPost['content_type'] = 2;
        }
        const posts = new Posts(newPost);
        try{
            const result = await posts.save();
            return res.status(200).send({
                data : result
            });
            console.log('post uploaded successfully');
        }catch(e){
            return res.status(400).send({
                error : CONFIG.ERRORS[100]   
            })
        }

    },

    getLatestCursor : async (req, res)=>{
        // let { crawled_source, section_name } = req.body;
        // section_name = crawled_source > 1 ? `9gag_${section_name}` : section_name; 
        //GET THE LATEST CURSOR
        try {
            const result = await latestCursor.find({
            }).sort({ created : -1});   
            return res.status(200).send({
                 data : result
            });
        } catch (error) {
            return res.status(400).send({
                error    
            }) 
        }
    },

    latestCursor : async (req, res)=>{
        let { crawled_source, section_name } = req.body;
        section_name = crawled_source > 1 ? `9gag_${section_name}` : section_name; 
        //GET THE LATEST CURSOR
        try {
            const result = await latestCursor.findOne({
                crawled_source, 
                source: section_name.trim()
            }).sort({ created : -1});   
            return res.status(200).send({
                 data : result
            });
        } catch (error) {
            return res.status(400).send({
                error    
            }) 
        }
    },

    nineGagCrawledUrls : async (req ,res)=>{
        const { section_name, next_cursor, selected_section } = req.body;
        let cursor_url = null;        
        let url =  next_cursor ? `${section_name}?${next_cursor}` : section_name;

        const gagURL = `https://9gag.com/v1/group-posts/group/${url}`;
        
        const listOfdata = await fetch(gagURL);
        const {data} = await listOfdata.json();

        const {posts, nextCursor} = data;
        const finalArray = [];

        for(let post of posts){
            if(post.type=="Photo"){
               finalArray.push({
                   title : post.title,
                   src :post.images.image460.url
               });
            }else{
                continue;
            }
        }

        return res.status(200).send({
               source_name : `9gag_${section_name.trim()}`,
               source_urls : finalArray,
               crawled_source: 2,
               next_cursor: nextCursor,
               selected_section
        })
    },


    compressImages : async (req, res)=>{
        // const files = await imagemin(['compress_image/*.{jpg,png}'], {
        //     destination: 'result_image',
        //     plugins: [
        //         imageminJpegtran({
        //             quality: [0.2, 0.3]
        //         }),
        //         imageminPngquant({
        //             quality: [0.2, 0.3]
        //         })
        //     ]
        // });
        // console.log(files[0].data);  
        // fs.writeFileSync(`result_image/test1.png`, files[0].data);
        const s3Result = await uploadToS3('http://www.personal.psu.edu/crd5112/photos/GIF%20Example.gif');
        res.send({
            data: s3Result
        })
    }
     
}