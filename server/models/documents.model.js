import mongoose from 'mongoose'
import CONFIG from '../../config';
const {DB} = CONFIG;

const Documents = new mongoose.Schema({
      key: {
        type: String
      },
      url: {
        type: String
      },
      slug: {
        type: String
      },
      mime: {
        type: String
      },
      ext: {
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

export default mongoose.model('documents', Documents);



