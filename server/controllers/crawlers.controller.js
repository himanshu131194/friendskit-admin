import postSections from '../models/sections.model'
import Documents from '../models/documents.model'
import Posts from '../models/posts.model'
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

const uploadToS3 = async (externalUrl, data64)=>{
    console.log('s3-upload');
    console.log(externalUrl);
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
        const { source_urls, source_name } = req.body;
        //CHECK URL IS ALREADY IN DB 
        const urlsArray = source_urls;
        const is_present = false;
        const resultArray = [];
        for(let x of urlsArray){
            const result = await externalUrls.findOne({ 
                  url : x.trim()
            });
            if(!result){
                const s3Result = await uploadToS3(x.trim());
                resultArray.push({
                    url: x.trim(),
                    s3_url: s3Result.s3_url, 
                    slug_id: s3Result.slug_id,
                    mime_type: s3Result.mime,
                    ext: s3Result.ext,
                    source: source_name.toLowerCase().trim()
                });
            }
        }
        console.log(resultArray);
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
                    count: { $sum : 1}
                }
               }
           ]);
           res.status(200).send({
               data : sections  
           })
        }catch(e){
           res.status(400).send({
               error : CONFIG.ERRORS[100]
           })
         }
    },

    listUploadedPosts : async (req, res)=>{
          //Count total posts 
        //  const result = await externalUrls.updateMany({}, {post_uploaded: false});
        //   const result = await Posts.deleteMany({
        //       crawled: true
        //   });
          res.send({
               count: result
          })
    },

    uploadPost : async (req, res)=>{
        
        
        //GET ALL SECTIONS 
        const listOfSections = await postSections.find({});
        let sectionId = "5e7ea56943e92bf4f795db43"; //DEFAULT FUNNY

        //GET ALL PAGES LIST 
        const listOfPages = await externalUrls.aggregate([
            {
             $group: {
                 _id : "$source" ,
                 count: { $sum : 1}
             }
            }
        ]);

        //GET RANDON VALUE FROM LIST OF PAGES
        const randomIntFromInterval = (min, max) => (Math.floor(Math.random() * (max - min + 1) + min));
        const selectedPage = listOfPages[randomIntFromInterval(0, listOfPages.length-1)]._id;

        const getSectionId = (sectionName)=>{
              for(let x of listOfSections){
                   if((x.value).includes(sectionName)){
                       return x._id;
                   }
              }
        }

        if(selectedPage.includes('funny')){
            sectionId = getSectionId('funny');
        }else if(selectedPage.includes('india')){
            sectionId = getSectionId('india');
        }else if(selectedPage.includes('comic') || selectedPage.includes('cartoon')){
            sectionId = getSectionId('comic');
        }
        
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

        console.log(urlToUplaod);
        console.log(sectionId);
        

        //CHECK CRAWLED_SOURCE_URL
        const crawledSourceUrl = await Posts.findOne({
            crawled_source_url: urlToUplaod.url.trim(),
            crawled: true,
        });

        if(crawledSourceUrl){
            return res.status(200).send({
                data : []
            })
        }

        //UDDATE POST TABLE
        const newPost = {
                user_id: req.user ? req.user._id : '5e7ea43f9cf4640b79d58e6c',
                url: (urlToUplaod.s3_url).trim(),
                slugId: (urlToUplaod.slug_id).trim(),
                title: '',
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
            })
        }catch(e){
            return res.status(400).send({
                error : CONFIG.ERRORS[100]   
            })
        }





    },

}