import mongoose from 'mongoose'
import CONFIG from '../../config';
const {DB} = CONFIG;

const externalUrls = new mongoose.Schema({
      url:{
        type: String
      },
      title:{
        type: String
      },
      s3_url:{
          type: String
      },
      slug_id : {
          type: String
      },
      mime_type: {
        type: String
      },
      ext: {
        type: String
      },
      post_uploaded:{
        type: Boolean, 
        default: DB.DEFAULT_FALSE
      },
      source:{
        type: String
      },
      crawled_source: {
        type: Number,
        default: DB.CRAWLED_TYPE.DEFAULT
      },
      next_cursor:{
        type: String
      },
      cursor_id:{
        type: String
      },
      upload_selected: {
        type: Boolean, 
        default: DB.DEFAULT_TRUE
      },
      section:{
        type:mongoose.Schema.ObjectId,
        ref: 'sections'
      },
      created: {
      	 type: Date,
      	 default: Date.now
      },
      updated:{ 
         type: Date
      },
      comment: {
      	 type: String
      }
})

export default mongoose.model('external_urls', externalUrls);