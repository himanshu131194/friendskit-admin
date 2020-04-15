import mongoose from 'mongoose'
import CONFIG from '../../config';
const {DB} = CONFIG;

const latestCursor = new mongoose.Schema({
      url:{
        type: String
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

export default mongoose.model('latest_cursor', latestCursor);