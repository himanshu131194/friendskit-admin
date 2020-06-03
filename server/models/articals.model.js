import mongoose from 'mongoose'
import CONFIG from '../../config';
const {DB} = CONFIG;

const Articles = new mongoose.Schema({
     article_title: {
        type: String
     },
     article_sitename: {
        type: String
     },     
     article_url: {
        type: String
     },     
     article_description: {
        type: String
     },     
     article_cover: {
        url: { type: String },
        width: { type: String },
        height: { type: String }
     },     
     article_posts: [],     
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

export default mongoose.model('articles', Articles);