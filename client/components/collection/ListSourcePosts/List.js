import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions';


class List extends Component{
      render(){
      	return(
          <Fragment>
                <div className="row">
                {this.props.onUpdateList.length>0 && this.props.onUpdateList.map((post)=>(
                    <div className="col-md-3 pd-x-5" data-id={post._id} key={post._id}>
                        <div className="card bd-0 mb-3">
                            <div className="card-body bd bd-b-0 bd-color-gray-lighter rounded-top">
                                <h6 className="mg-b-3"><a href="cards.html" className="tx-dark">{post.title}</a></h6>
                            </div>
                            <img className="card-img-bottom img-fluid" src={post.s3_url} alt="Image"/>
                        </div>
                    </div>
                )) }
                </div>
          </Fragment>
        )
      }
}

// crawled_source: 1
// created: "2020-04-27T06:50:47.069Z"
// ext: "jpg"
// mime_type: "image/jpg"
// next_cursor: null
// post_uploaded: true
// s3_url: "https://stylemycv.s3.ap-south-1.amazonaws.com/uploads/27-04-2020/be17d0d0-b157-4ba2-9fa1-409f81cef722.jpg"
// section: "5e7f3da743e92bf4f795db45"
// slug_id: "be17d0d0-b157-4ba2-9fa1-409f81cef722"
// source: "neyoyohoho"
// title: "LIFE. lol"
// upload_selected: false
// url: "https://www.facebook.com/Neyoyohoho/photos/a.399773226779563/577189389037945/?type=3&theater"
// __v: 0
// _id: "5ea680c7b1cf718603420c24"

export default connect(state=>state, actions)(List);






