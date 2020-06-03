import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions'
import CONFIG from '../../../../config'
import axios from 'axios'

class Article extends Component{
      ogTitle = React.createRef();
      ogSitename = React.createRef();
      ogUrl = React.createRef();
      ogDescription = React.createRef();
      ogImage = React.createRef();
      ogWidth = React.createRef();
      ogHeight = React.createRef();
      ogPosts = React.createRef();
      
      onSubmit = async (e)=>{
          e.preventDefault();
          console.log('dsd');
         const { ogTitle, ogSitename, ogUrl, ogDescription, ogImage, ogHeight, ogWidth, ogPosts } = this;
         const result = await axios.post(`${CONFIG.API_URL}/api/create-article`, {
             ogTitle: ogTitle.current.value, 
             ogSitename: ogSitename.current.value, 
             ogUrl: ogUrl.current.value, 
             ogDescription: ogDescription.current.value, 
             ogImage: ogImage.current.value, 
             ogHeight: ogHeight.current.value, 
             ogWidth: ogWidth.current.value, 
             ogPosts: ogPosts.current.value
            });
        //  console.log(ogTitle);
      }
      render(){
      	return(
          <Fragment>
                <div className="br-mainpanel">
                    <div className="br-pagebody">
                        <div className="br-section-wrapper">
                            <div className="form-layout">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="form-layout form-layout-4">
                                        <h6 className="tx-gray-800 tx-uppercase tx-bold tx-14 mg-b-10">OG tags for article</h6>
                                        <div className="row">
                                            <label className="col-sm-4 form-control-label">Og:title - </label>
                                            <div className="col-sm-8 mg-t-10 mg-sm-t-0">
                                            <input type="text" className="form-control" placeholder="Title" ref={this.ogTitle}/>
                                            </div>
                                        </div>
                                        <div className="row mg-t-20">
                                            <label className="col-sm-4 form-control-label">Og:sitename -</label>
                                            <div className="col-sm-8 mg-t-10 mg-sm-t-0">
                                            <input type="text" className="form-control" ref={this.ogSitename} placeholder="Sitename"/>
                                            </div>
                                        </div>
                                        <div className="row mg-t-20">
                                            <label className="col-sm-4 form-control-label">Og:url -</label>
                                            <div className="col-sm-8 mg-t-10 mg-sm-t-0">
                                            <input type="text" className="form-control" ref={this.ogUrl} placeholder="Url"/>
                                            </div>
                                        </div>
                                        <div className="row mg-t-20">
                                            <label className="col-sm-4 form-control-label">Og:description -</label>
                                            <div className="col-sm-8 mg-t-10 mg-sm-t-0">
                                            <textarea rows="2" className="form-control" ref={this.ogDescription} placeholder="Description"></textarea>
                                            </div>
                                        </div>
                                        <div className="row mg-t-20">
                                            <label className="col-sm-4 form-control-label">Og:image -</label>
                                            <div className="col-sm-8 mg-t-10 mg-sm-t-0">
                                            <input type="text" className="form-control" ref={this.ogImage} placeholder="Image"/>
                                            </div>
                                        </div>
                                        <div className="row mg-t-20">
                                            <label className="col-sm-4 form-control-label">Og:width -</label>
                                            <div className="col-sm-8 mg-t-10 mg-sm-t-0">
                                            <input type="text" className="form-control" ref={this.ogWidth} placeholder="Width"/>
                                            </div>
                                        </div>
                                        <div className="row mg-t-20">
                                            <label className="col-sm-4 form-control-label">Og:height -</label>
                                            <div className="col-sm-8 mg-t-10 mg-sm-t-0">
                                            <input type="text" className="form-control" ref={this.ogHeight} placeholder="Height"/>
                                            </div>
                                        </div>
                                        <div className="row mg-t-20">
                                            <label className="col-sm-4 form-control-label">Posts -</label>
                                            <div className="col-sm-8 mg-t-10 mg-sm-t-0">
                                            <textarea rows="2" className="form-control" ref={this.ogPosts} placeholder="Posts"></textarea>
                                            </div>
                                        </div>
                                        <div className="form-layout-footer mg-t-30">
                                            <button className="btn btn-info" onClick={this.onSubmit}>Create article</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          </Fragment>
        )
      }
}

export default connect(state=>state, actions)(Article);








