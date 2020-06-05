
import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions'
import CONFIG from '../../../../config'
import AddPostsToArticle from './Model'
import axios from 'axios'

class ArticlesList extends Component{
    state = {
        listOfArticles : [],
        loading :false
    }
      async componentDidMount(){
          const {data : {data}} = await axios.get(`${CONFIG.API_URL}/api/list-articles`);
          this.setState({
              listOfArticles: data
          })
      }
      uploadNewCover = (e)=>{
        e.preventDefault();
        this.setState({ loading: true});
        let id = e.target.dataset.id;
        let uploadedFile = e.target.files[0],
            mime = uploadedFile.type,
            ext = uploadedFile.name.split('.').pop();
        let reader = new FileReader;
            reader.onload =  (data64)=>{
                                this.props.uploadS3({url: null, mime, ext, data64: data64.target.result}, async (err, res)=>{
                                    if(!err){
                                        console.log(res);
                                        //UPDATE ARTICLE 
                                        const result = await axios.post(`${CONFIG.API_URL}/api/update-articles`, {
                                              id,
                                              url: res.url
                                        });
                                        this.setState({ loading: false});
                                        console.log(result)
                                    }
                                })
            }
          reader.readAsDataURL(uploadedFile);
      }
      uploadPosts = (e)=>{
          const uploadedFiles = e.target.files;
          console.log(uploadedFiles);
      }
      render(){
         return(
            <Fragment>
            <AddPostsToArticle/>
            <div className="br-mainpanel">
                <div className="br-pagebody">
                    <div className="br-section-wrapper">
                        <h6 className="tx-gray-800 tx-uppercase tx-bold tx-14 mg-b-10">Sections details</h6>
                        <div className="bd bd-gray-300 rounded table-responsive mg-t-10">
                                {/* https://www.facebook.com/dialog/share&app_id={APP_ID}&display=popup&href={LINK_TO_SHARE}&redirect_uri={REDIRECT_AFTER_SHARE} */}
                                
                                <table className="table mg-b-0">
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>URL</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Upload Cover</th>
                                    <th>Posts</th>
                                    <th>Share</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.listOfArticles.length>0 && this.state.listOfArticles.map((article, index)=>{
                                            return(
                                                <tr key={article._id}>
                                                    <th scope="row">{index+1}</th>
                                                    <td><a href={`${article.article_url}`} target="_blank">Goto</a></td>
                                                    <td>{article.article_title}</td>
                                                    <td>{article.article_description}</td>
                                                    <td>
                                                        {
                                                            this.state.loading===true 
                                                            ?<div class="sk-spinner sk-spinner-pulse sk-spinner-pulse-small bg-gray-800"></div>
                                                            :<input type="file" data-id={article._id} onChange={this.uploadNewCover}/>
                                                        }                                                        
                                                    </td>
                                                    <td>
                                                         <button data-toggle="modal" data-target="#uploadpost_article" data-id={article._id} className={true? "tx-uppercase" : "tx-uppercase is-disabled"}>open</button>
                                                    </td>
                                                    <td>
                                                        <a href={`https://www.facebook.com/dialog/share?app_id=426940641303361&display=popup&href=https://feelfunny.app/fbshare-article/${article._id}&redirect_uri=https://feelfunny.app`} target="_blank">SHARE</a>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                </table>
                            </div>  
                    </div>
                </div>
            </div>
            </Fragment>
         )
      }
}


export default connect(state=>state, actions)(ArticlesList);

// article_cover: {,…}
// height: "200"
// url: "https://stylemycv.s3.ap-south-1.amazonaws.com/uploads/31-05-2020/5ce05174-177c-4877-a300-9a27f682906f.jpg"
// width: "800"

// article_description: "You get memes, everyone gets memes!"
// article_posts: ["5ed3b5181296d5545fb08ea3", "5ed3b0681296d5545fb08e9c", "5ed39c401296d5545fb08e7e",…]
// article_sitename: "feelfunny"
// article_title: "Ten Random Memes For People Tired Of Everything"
// article_url: "https://feelfunny.app/article/5ed3f1501374a166a06e306f"
// created: "2020-05-31T18:02:56.417Z"
// __v: 0
// _id: "5ed3f1501374a166a06e306f"


