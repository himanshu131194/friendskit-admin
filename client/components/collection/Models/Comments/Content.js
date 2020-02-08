import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions'

class CommentContent extends Component{
    
    commentContent = React.createRef();
    postComment = React.createRef();

    
    onComment = (e)=>{
        e.preventDefault();
        this.props.onPostComment(1);
        const content = (this.commentContent.current.value).trim();
        if(content!==''){
            const postId = this.props.selectedPost;

            console.log(postId);

            this.props.postComments(postId, content, (err, res)=>{
                if(!err){
                    setTimeout(()=>{
                        this.props.onPostComment(0);
                        this.commentContent.current.value = '';
                        this.postComment.current.classList.add('disabled-red');
                        //REFRESH COMMENTS LIST 
                        this.props.listComments(postId); 
                    }, 2000)
                }
            })
        }
    }

    validateComment = (e)=>{
        const content = (this.commentContent.current.value).trim();
        (content!=='') ? this.postComment.current.classList.remove('disabled-red') : this.postComment.current.classList.add('disabled-red') 
    }

    render(){
        return(
            <div class="media post-comment">
            <div class="media-content">
                <div class="field">
                    <p class="control">
                        {/* <textarea ref={this.postTitle} className="textarea comment-textarea" rows="1" placeholder="Say something about this ..."></textarea> */}
                        <textarea ref={this.commentContent} onKeyUp={this.validateComment} class="textarea" rows="1" placeholder="Write a comment..."></textarea>
                    </p>
                </div>
                <div class="actions">
                    {/* <div class="action is-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-at-sign"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>
                    </div> */}
                    <div class="action is-upload">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-camera"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                        <input type="file" />
                    </div>
                    <a class="button is-solid primary-button raised uppercase disabled-red" ref={this.postComment} onClick={this.onComment}>Post Comment</a>
                </div>
            </div>
        </div>
        )
    }
}

export default connect(state=>state, actions)(CommentContent);