import mongoose from 'mongoose'
import CONFIG from '../../config';
const {DB} = CONFIG;

const Comments = new mongoose.Schema({
      post_id:{
         type: mongoose.Schema.ObjectId,
         ref: "posts"
      },
      user_id:{
         type: mongoose.Schema.ObjectId,
         ref: "users"
      },
      parent_id:{
         type: mongoose.Schema.ObjectId,
         ref: "comments"
      },
      points:{
         type: Number,
         default: DB.DEFAULT_COUNT
      },
      liked:{
         type: Boolean,
         default: DB.DEFAULT_FALSE
      },
      replies_count:{
          type: Number,
          default: DB.DEFAULT_COUNT
      },
      text:{
         type: String
      },
      is_active:{
      	type: Boolean, default: DB.DEFAULT_TRUE
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

export default mongoose.model('comments', Comments);