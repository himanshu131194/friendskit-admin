import mongoose from 'mongoose'
import CONFIG from '../../config';
const {DB} = CONFIG;

const Tags = new mongoose.Schema({
      name: {
           type: String
      },
      created: {
            type: Date,
            default: Date.now
      },
      is_active:{
      	type: Boolean, default: DB.DEFAULT_TRUE
      },
      updated:{ 
            type: Date
      },
      comment: {
            type: String
      }
})

export default mongoose.model('tags', Tags);



