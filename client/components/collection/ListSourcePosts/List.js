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
                            <img className="card-img-bottom img-fluid" src={post.url} alt="Image"/>
                            <h3>{post._id}</h3>
                        </div>
                    </div>
                )) }
                </div>
          </Fragment>
        )
      }
}

// id
// :
// 5ed2ce11f53463752b90bb8d
// article_posts
// :
// article_title
// :
// "Ten Random Memes For People Tired Of Everything"
// article_sitename
// :
// "feelfunny"
// article_url
// :
// "https://feelfunny.app/article"
// article_description
// :
// "You get memes, everyone gets memes!"
// article_cover
// :
// Object
// created
// :
// 2020-05-30T21:20:17.204+00:00
// __v
// :
// 0

export default connect(state=>state, actions)(List);






