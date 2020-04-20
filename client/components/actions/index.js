import {LOAD_POSTS, AUTH_USERS, LIST_SECTIONS, LIST_TAGS, LIST_DOCUMENTS, CURRENT_POST, COMMENTS_LIST, COMMENT_UPVOTE, LIST_CURSORS} from './types'
import CONFIG from '../../../config'
import axios from 'axios'


export const listPosts = ({limit, offset}, cb)=>{
    return async (dispatch)=>{
           let err = null, result = [];
           try{
               let {data} = await axios.get(`${CONFIG.API_URL}/api/list-posts?limit=${limit}&offset=${offset}`);
                    result = data.data
           }catch(e){
               err = e.response.data.error;
           }
           dispatch({
               type: LOAD_POSTS,
               payload: result
           })
           cb(null, result);
    }
}

export const authUsers = ()=>{
    return async (dispatch)=>{
           let err = null, result = null;
           try{
               let {data} = await axios.get(`${CONFIG.API_URL}/api/authenticate`);
                    console.log(data)
                    result = data.user;
                    console.log(result);
           }catch(e){
               err = e.response.data.error;
           }
           result = {
                auth : true,
                data : {
                    gender: 1,
                    badgets: 1,
                    account_type: 1,
                    favourite_sections: [],
                    _id: "5e3551da2dafec60becda62c",
                    name: "himanshu131194@gmail.com",
                    email: "himanshu savita",
                    account_id: "113944163418601847954",
                    created: "2020-02-01T10:24:26.981Z",
                    __v: 0
                }    

                // auth : result ? true : false,
                // data : result 
           }
           dispatch({
               type: AUTH_USERS,
               payload: result
           })
    }
}

export const uploadS3 = ({url, mime, ext, data64}, cb)=>{
    return async ()=>{
             let err = null, result = null;
                 try{
                     let {data} = await axios.post(`${CONFIG.API_URL}/api/upload-s3`, {url, mime, ext, data64});
                     cb(null, data) 
                 }catch(e){
                     err = e;
                     cb(err, null)
                 }
    }
}

export const uploadAll = ({uploadedURL, postSlug, postTitle , postSections, postMime, postExt}, cb)=>{
    return async ()=>{
                let err = null, result = null;
                console.log('uploadAll');
                try{
                    console.log({uploadedURL, postSlug, postTitle, postSections, postMime, postExt});
                    let {data} = await axios.post(`${CONFIG.API_URL}/api/upload-posts`,
                                                    {uploadedURL, postSlug, postTitle, postSections, postMime, postExt});
                    cb(null, data) 
                }catch(err){
                    cb(err, null)
                }
            
    }
}

export const listDocuments= ()=>{
    return async (dispatch)=>{
           let err = null, result = null;
           try{
               let {data} = await axios.get(`${CONFIG.API_URL}/api/list-documents`);
                    result = data.data;
           }catch(e){
               err = e.response.data.error;
           }
           dispatch({
               type: LIST_DOCUMENTS,
               payload: result
           })
    }
}

export const postLiked = (post_id, flag, cb)=>{
    return async ()=>{
            //  let err = null, result = null;
                 try{
                     let {data} = await axios.post(`${CONFIG.API_URL}/api/post-liked`, {post_id, flag});
                     let result = data.data;
                     cb(null, result) 
                 }catch(e){
                    //  err = e.response.data.error;
                     cb(e, null)
                 }
    }
}

export const postComments = (post_id, text, cb)=>{
    return async ()=>{
             let err = null, result = null;
                 try{
                     let {data} = await axios.post(`${CONFIG.API_URL}/api/post-comments`, {post_id, text});
                     cb(null, data) 
                 }catch(e){
                     err = e.response.data.error;
                     cb(err, null)
                 }
    }
}

export const listComments = (post_id)=>{
    return async (dispatch)=>{
             let err = null, result = null;
             console.log(post_id);
                 try{
                     let {data} = await axios.post(`${CONFIG.API_URL}/api/list-comments`, {post_id});
                     result = data['data'];
                 }catch(e){
                     err = e;
                 }
                 dispatch({
                    type: COMMENTS_LIST,
                    payload: result
                })
    }
}


export const upvoteComments = (comment_id, post_id, flag, cb)=>{
    return async ()=>{
             let result = null;
                 try{
                     let {data} = await axios.post(`${CONFIG.API_URL}/api/upvote-comments`, {comment_id, post_id, flag});
                     result = data['data'];
                     cb(null, result)
                 }catch(e){
                     cb(e, null)
                 }
    }
}

export const setPostId = (post_id)=>{
    console.log("post_id");
    return (dispatch)=>{
            dispatch({
                type: CURRENT_POST,
                payload: post_id
            })
    }
}

export const addSection = (section_details, cb)=>{
    return async ()=>{
        let result = null;
            try{
                let {data} = await axios.post(`${CONFIG.API_URL}/api/add-sections`, section_details);
                result = data['data'];
                cb(null, result)
            }catch(e){
                cb(e, null)
            }
    }
}

export const addSource= (source_details, cb)=>{
    return async ()=>{
        let result = null;
            try{
                let {data} = await axios.post(`${CONFIG.API_URL}/api/upload-crawled-urls`, source_details);
                result = data['data'];
                cb(null, result)
            }catch(e){
                cb(e, null)
            }
    }
}


export const listSections = ()=>{
    return async (dispatch)=>{
           let err = null, result = null;
           try{
               let {data} = await axios.get(`${CONFIG.API_URL}/api/list-sections`);
                    result = data.data;
           }catch(e){
               err = e.response.data.error;
           }
           dispatch({
               type: LIST_SECTIONS,
               payload: result
           })
    }
}


export const listCrawledSources = ()=>{
    return async (dispatch)=>{
           let err = null, result = null;
           try{
               let {data} = await axios.get(`${CONFIG.API_URL}/api/list-crawled-pages`);
                    result = data.data;
           }catch(e){
               err = e.response.data.error;
           }
           dispatch({
               type: LIST_SECTIONS,
               payload: result
           })
    }
}


export const addTag = (tag_details, cb)=>{
    return async ()=>{
        let result = null;
            try{
                let {data} = await axios.post(`${CONFIG.API_URL}/api/add-tags`, tag_details);
                result = data['data'];
                cb(null, result)
            }catch(e){
                cb(e, null)
            }
    }
}

export const listTags = ()=>{
    return async (dispatch)=>{
           let err = null, result = null;
           try{
               let {data} = await axios.get(`${CONFIG.API_URL}/api/list-tags`);
                    result = data.data;
           }catch(e){
               err = e.response.data.error;
           }
           dispatch({
               type: LIST_TAGS,
               payload: result
           })
    }
}

export const toggleContent = ({type, id, action}, cb)=>{
    console.log('data');
    action = action > 0? true: false; 
    return async ()=>{
        let result = null;
            try{
                let {data} = await axios.post(`${CONFIG.API_URL}/api/toggle-contents`, {type, id, action});
                result = data['data'];
                cb(null, result)
            }catch(e){
                cb(e, null)
            }
    }
}




export const crawlNineGag = (section_details, cb)=>{
    return async ()=>{
        let result = null;
            try{
                let {data} = await axios.post(`${CONFIG.API_URL}/api/9gag-crawled-urls`, section_details);
                result = data;
                cb(null, result)
            }catch(e){
                cb(e, null)
            }
    }
}



export const latestCursor = (section_details, cb)=>{
    return async ()=>{
        let result = null;
            try{
                let {data} = await axios.post(`${CONFIG.API_URL}/api/latest-cursor`, section_details);
                console.log(data);
                result = data.data;
                cb(null, result)
            }catch(e){
                cb(e, null)
            }
    }
}



export const listLatestCursors = (cb)=>{
    return async (dispatch)=>{
        let err = null, result = null;
        try{
            let {data} = await axios.get(`${CONFIG.API_URL}/api/latest-cursor`);
                 result = data.data;
        }catch(e){
            err = e.response.data.error;
        }
        dispatch({
            type: LIST_CURSORS,
            payload: result
        })
    }
}




