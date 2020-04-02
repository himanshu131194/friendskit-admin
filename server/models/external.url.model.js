import mongoose from 'mongoose'
import CONFIG from '../../config';
const {DB} = CONFIG;

const externalUrls = new mongoose.Schema({
      url:{
        type: String
      },
      s3_url:{
          type: String
      },
      post_uploaded:{
        type: Boolean, 
        default: DB.DEFAULT_FALSE
      },
      source:{
        type: String
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