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
import AWS, { CostExplorer } from 'aws-sdk'
import moment from 'moment'
import fetch from 'node-fetch';
import fs from 'fs';


//LIBS FOR INSTACRAWLER
import getEmails from 'get-emails';
import got from 'got';


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
        const cursor_id = req.body.cursor_id ? req.body.cursor_id : null;
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
                    cursor_id,
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
                        'upload_selected' : { "$first": "$upload_selected"}
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

    selectedToUploadPosts : async (req, res)=>{
        let selectedToOnly = JSON.parse(req.query.page);
        let toRemove = [], toAdd = [];
        for(let x in selectedToOnly){
            selectedToOnly[x]? toAdd.push(x) : toRemove.push(x);
        }

        if(toRemove.length>0){
            await externalUrls.updateMany({source : { $in : toRemove }},{
                upload_selected: false
            });
        }
        if(toAdd.length>0){
            await externalUrls.updateMany({source : { $in : toAdd }},{
                upload_selected: true
            });
        }
        // for(x in req.query.page)
        // if(req.query && req.query.page){
        //     let listOfselected = JSON.parse(req.query.page);
        //     selectedToOnly = listOfselected.indexOf('all')>=0 ? selectedToOnly :  {   
        //         source : { $in : listOfselected } 
        //     };
        // }
        console.log(req.query.page);
        console.log(toRemove);

        console.log(toAdd);

        //MAKE ALL FALSE FIRST 
        // await externalUrls.updateMany({     
        // },{
        //     upload_selected: false
        // });
        // const result = await externalUrls.updateMany(selectedToOnly,{
        //     upload_selected: true
        // });

        res.send({
            result:[]
        })
    },

    listUploadedPosts : async (req, res)=>{
        console.log('lsit of ')

        //   //Count total posts 
        // const result = await externalUrls.updateMany({
             
        // },{
        //     upload_selected: false
        // });
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
        // const result = await Posts.deleteMany({
            // crawled: true
        // });
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

    instaCrawledUrls : async (req ,res)=>{
        console.log(req.body);

        const QUERY_HASH = '58b6785bea111c67129decbe6a448951';
        let { section_name: username, next_cursor, cursor_id, selected_section } = req.body;
        let listOfLatestposts = [], uniqueName=''; 

        const transformPosts = (posts = []) => posts.map(({node}) => ({
            ...node,
            comments: node.edge_media_to_comment ? node.edge_media_to_comment.count : 0,
            likes: node.edge_liked_by ? node.edge_liked_by.count : 0,
            media: node.display_url,
            text: node.edge_media_to_caption.edges.map(({node: {text}}) => text).join(''),
            time: node.taken_at_timestamp,
            type: node.is_video ? 'video' : 'image',
            url: `https://www.instagram.com/p/${node.shortcode}`,
            username: node.owner.username
        }));

        const fetchMorePosts = async (prev_cursor_id, prev_next_cursor)=>{
            // console.log('fetchMorePosts');
            // console.log(cursor_id)
            // console.log(typeof next_cursor)
            let k = JSON.stringify({"id":prev_cursor_id,"first":12,"after": prev_next_cursor.toString()});

            const result = await fetch('https://www.instagram.com/graphql/query/?query_hash='+QUERY_HASH+'&variables='+k);
            const { data: { user : { edge_owner_to_timeline_media: { edges: currentPosts, page_info } } } } = await result.json();
            const { has_next_page, end_cursor } = page_info;

            next_cursor = has_next_page ? end_cursor: null;
            cursor_id = has_next_page ? prev_cursor_id: null;
            console.log(next_cursor.toString());    
           // console.log(currentPosts);
            listOfLatestposts = currentPosts;
        }

        if(next_cursor && cursor_id){
            console.log('insdie new task')
            // console.log(next_cursor);
            // console.log(cursor_id);

            await fetchMorePosts(cursor_id, next_cursor);
        }else{
            uniqueName = username.trim();
            const url = `https://instagram.com/${uniqueName}`;
            const {graphql: { user } } = await got(url, {searchParams: {__a: 1}}).json();   
            const email = getEmails(user.biography).values().next().value || '';
            const {
                edge_owner_to_timeline_media : {
                    edges : currentPosts,
                    page_info: {end_cursor, has_next_page}
                },
                id
            } =  {
                ...user,
                description: user.biography,
                email,
                followers: user.edge_followed_by.count,
                following: user.edge_follow.count,
                fullName: user.full_name,
                posts: user.edge_owner_to_timeline_media.count,
                url,
                username: uniqueName,
                website: user.external_url
            };
            next_cursor = has_next_page ? end_cursor: null;
            cursor_id = has_next_page ? id: null;
            listOfLatestposts = currentPosts;
        }
        
        //console.log(listOfLatestposts);
        
        console.log('finalArray')
        const finalArray = [];
        for(let post of transformPosts(listOfLatestposts)){
            if(post.type==='image'){
               finalArray.push({
                   title : (post.text).split('\n')[0],
                   src :post.display_url
               });
            }else{
                continue;
            }
        }

        return res.status(200).send({
               source_name : `insta_${username}`,
               source_urls : finalArray,
               crawled_source: 3,
               next_cursor,
               cursor_id,
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
    },
    
    instagramCrawler : async (req, res)=>{
            const QUERY_HASH = '58b6785bea111c67129decbe6a448951';
            const transformPosts = (posts = []) => posts.map(({node}) => ({
                ...node,
                comments: node.edge_media_to_comment ? node.edge_media_to_comment.count : 0,
                likes: node.edge_liked_by ? node.edge_liked_by.count : 0,
                media: node.display_url,
                text: node.edge_media_to_caption.edges.map(({node: {text}}) => text).join(''),
                time: node.taken_at_timestamp,
                type: node.is_video ? 'video' : 'image',
                url: `https://www.instagram.com/p/${node.shortcode}`,
                username: node.owner.username
            }));

            const username = req.query.username;
            const url = `https://instagram.com/${username}`;
            const {graphql: { user} } = await got(url, {searchParams: {__a: 1}}).json();   
            const email = getEmails(user.biography).values().next().value || '';
            const data =  {
                ...user,
                description: user.biography,
                email,
                followers: user.edge_followed_by.count,
                following: user.edge_follow.count,
                fullName: user.full_name,
                posts: user.edge_owner_to_timeline_media.count,
                url,
                username,
                website: user.external_url
            };

            const {
                edge_owner_to_timeline_media: {
                    edges: currentPosts,
                    page_info: {end_cursor, has_next_page}
                },
                id
            } = data;


            return res.send({
                data : transformPosts(currentPosts)
            })
    }
}




// 'use strict';
// const getEmails = require('get-emails');
// const got = require('got');

// module.exports = async username => {
// 	if (typeof username !== 'string') {
// 		throw new TypeError(`Expected \`username\` to be of type \`string\` but received type \`${typeof username}\``);
// 	}

// 	try {
// 		const url = `https://instagram.com/${username}`;
// 		const {graphql: {user}} = await got(url, {searchParams: {__a: 1}}).json();
// 		const email = getEmails(user.biography).values().next().value || '';

// 		return {
// 			...user,
// 			description: user.biography,
// 			email,
// 			followers: user.edge_followed_by.count,
// 			following: user.edge_follow.count,
// 			fullName: user.full_name,
// 			posts: user.edge_owner_to_timeline_media.count,
// 			url,
// 			username,
// 			website: user.external_url
// 		};
// 	} catch (error) {
// 		if (error.response.statusCode === 404) {
// 			error.message = `User "${username}" not found`;
// 		}

// 		throw error;
// 	}
// };


// {
//     node: {
//       __typename: 'GraphImage',
//       id: '2310480928324321494',
//       shortcode: 'CAQeimxFgDW',
//       dimensions: [Object],
//       display_url: 'https://instagram.fblr2-1.fna.fbcdn.net/v/t51.2885-15/e35/97541152_159107825623635_5249339708604449442_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=GbpvzCskDmsAX-hN7aT&oh=fa26e71c1cb7a518c1bf4a60bb9a1800&oe=5EEB0FE4',
//       gating_info: null,
//       fact_check_overall_rating: null,
//       fact_check_information: null,
//       media_preview: 'ACoq2pLhEfa0gBHbFN+0oeko/wC+ayrsfv3+o/kKiDAcDk0h2Nv7Qn/PT9P/AK1H2lO8g/KsbcT7UD72PUUDsba3cQGGcE+uMVbrmWWukXoPpQhM566kX7Q65Gcjj8BUJXa/+9/P/PNQ6jaCW4cq3zZGR+A/KqB+0W/XJUfiP/rfpQBsHjk8D3/z+FMzyCO1UDdiddhGCSPpV0GgostXQL0H0rm4zlcDsa6RegoQmcxfKvnuSOQc56HoO4piFkA53A4GG68+hH9RXSSwxucsqknuQDTfIj/uL/3yP8KBHLi3V5htGw8kjHoPyPPcVcFuR3Brd8mPOdq/kKf5af3R+QpFo55Y2RuRwf8APNdMvQVGI19B+QqWmhSP/9k=',
//       owner: [Object],
//       is_video: false,
//       accessibility_caption: "Photo by Memes.com on May 16, 2020. Image may contain: possible text that says 'Let's confuse the innocent'",
//       edge_media_to_caption: [Object],
//       edge_media_to_comment: [Object],
//       comments_disabled: false,
//       taken_at_timestamp: 1589650811,
//       edge_liked_by: [Object],
//       edge_media_preview_like: [Object],
//       location: null,
//       thumbnail_src: 'https://instagram.fblr2-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/97541152_159107825623635_5249339708604449442_n.jpg?_nc_ht=instagram.fblr2-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=GbpvzCskDmsAX-hN7aT&oh=25ea6e9818cb4c84f7d11653fa987bd9&oe=5EE99E87',
//       thumbnail_resources: [Array]
//     }
//   },