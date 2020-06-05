
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions'

class AddPostsToArticle extends Component{
   selectedInput = React.createRef();
   state = {
    listOfPostImages : []
   }
   dynamicImageList = ()=>{
      return [
          <Fragment>
                <div className="col-sm-6 mg-t-10">
                    <img className="article-posts" src="https://stylemycv.s3.ap-south-1.amazonaws.com/uploads/04-06-2020/0442a42f-6b29-4af2-850c-ae46c46c2aef.jpg"/>
                </div>
                <div className="col-sm-6 mg-t-10">
                <img className="article-posts" src="https://stylemycv.s3.ap-south-1.amazonaws.com/uploads/04-06-2020/0442a42f-6b29-4af2-850c-ae46c46c2aef.jpg"/>
                </div>
                <div className="col-sm-6 mg-t-10">
                    <img className="article-posts" src="https://stylemycv.s3.ap-south-1.amazonaws.com/uploads/04-06-2020/0442a42f-6b29-4af2-850c-ae46c46c2aef.jpg"/>
                </div>
                <div className="col-sm-6 mg-t-10">
                    <img className="article-posts" src="https://stylemycv.s3.ap-south-1.amazonaws.com/uploads/04-06-2020/0442a42f-6b29-4af2-850c-ae46c46c2aef.jpg"/>
                </div>
                <div className="col-sm-6 mg-t-10">
                    <img className="article-posts" src="https://stylemycv.s3.ap-south-1.amazonaws.com/uploads/04-06-2020/0442a42f-6b29-4af2-850c-ae46c46c2aef.jpg"/>
                </div>
                <div className="col-sm-6 mg-t-10">
                    <img className="article-posts" src="https://stylemycv.s3.ap-south-1.amazonaws.com/uploads/04-06-2020/0442a42f-6b29-4af2-850c-ae46c46c2aef.jpg"/>
                </div> 
          </Fragment>
      ]
   }
   uploadPosts = (e)=>{
    e.preventDefault();
    let uploadedFiles = e.target.files;
    let postsArray= [];
    for(let post of uploadedFiles){
        let mime = post.type,
            ext = post.name.split('.').pop();
        let reader = new FileReader;
        reader.onload =  async (data64)=>{

            postsArray.push({
                mime, 
                ext,
                data64: data64.target.result});    
            await this.setState({
                listOfPostImages: postsArray
            })      
        }
        reader.readAsDataURL(post);
    }
    console.log(postsArray)
 
    // this.setState({
    //     listOfPostImages: postsArray
    // })
    // console.log(uploadedFiles);
    // this.setState({ loading: true});
    // let id = e.target.dataset.id;
    // let uploadedFile = e.target.files[0],
    //     mime = uploadedFile.type,
    //     ext = uploadedFile.name.split('.').pop();
   }
   resetUploaded = (e)=>{
        this.selectedInput.current.value = '';
        this.setState({
            listOfPostImages: []
        })      
   }
   render(){
      return(
        <div id="uploadpost_article" className="modal fade">
            <div className="modal-dialog modal-dialog-vertical-center width-500-min" role="document">
            <div className="modal-content bd-0 tx-14">
                 <div className="modal-header pd-15">
                    <h6 className="tx-14 mg-b-0 tx-uppercase tx-inverse tx-bold">upload article posts</h6>
                </div>
                <div className="modal-body pd-15">
                    <p className="mg-b-5">
                        <div class="row">
                            <div class="col-sm-12 mg-t-10 mg-sm-t-0">
                                <input type="file" ref={this.selectedInput} onChange={this.uploadPosts} multiple/>
                                <button className="tx-uppercase"  onClick={this.resetUploaded}>reset</button>
                            </div>
                        </div>
                        <div className="row article-post-list">
                            { this.state.listOfPostImages.length>0 && this.state.listOfPostImages.map((result, index)=>(
                                <div className="article-posts-box col-sm-6 mg-t-10" key={index+1}>
                                    <img className="article-posts" src={result.data64}/>
                                </div> 
                            )) 
                            }
                        </div>
                    </p>
                </div>
                <div className="modal-footer">
                    <button type="button" className={this.state.listOfPostImages.length>0? "btn btn-primary tx-uppercase": "btn btn-primary tx-uppercase is-disabled"}>upload all</button>
                    <button type="button" className="btn btn-secondary tx-uppercase" data-dismiss="modal">Close</button>
                </div>
            </div>
            </div>
        </div>
      )
   }
}

export default connect(state=>state, actions)(AddPostsToArticle);

