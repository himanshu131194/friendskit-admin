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
       return `https://${CONFIG.S3.BUCKET}.s3.ap-south-1.amazonaws.com/${key}`;
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
        const urlsArray = JSON.parse(source_urls);
        const is_present = false;
        const resultArray = [];
        for(let x of urlsArray){
            const result = await externalUrls.findOne({ 
                  url : x.trim()
            });
            if(!result){
                const s3_url = await uploadToS3(x.trim());
                resultArray.push({
                    url: x.trim(),
                    s3_url, 
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
    }

}