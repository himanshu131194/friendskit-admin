import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions'
import CONFIG from '../../../../config'

import List from './List'
import axios from 'axios'

class Header extends Component{

      source_name= React.createRef();
      source_urls = React.createRef();
      post_counter = React.createRef();
      postButton = React.createRef();
      stopButton = React.createRef();
      counter = 0;
      keepPosting = true;
      
      onAddSource = (e)=>{
          e.preventDefault();
          const currentEle = e.target;

          currentEle.classList.add('is-disabled');
          const source_name = this.source_name.current.value,
                source_urls = this.source_urls.current.value;
          if(source_name!=='' && this.source_urls!==''){
             this.props.addSource({source_name, source_urls}, (err, result)=>{
                currentEle.classList.remove('is-disabled');
                this.props.listSections();
                this.source_name.current.value = '';
                this.source_urls.current.value = '';
             });  
          }
      }

      stopKeepPosting = ()=>{
        this.keepPosting=false;
        this.postButton.current.classList.remove('is-disabled');
      }
      
      addNewPosts = async (e)=>{
          const currentEle = e.target;
          currentEle.classList.add('is-disabled');
          const sourceName = this.source_name.current.value;
          
          const baseUrl = `${CONFIG.API_URL}/api/post-crawled-urls`;

          const url = sourceName!=='' ? `${baseUrl}?page=${sourceName}` : baseUrl;

          const result = await axios.get(url);
          if(result){
            ++this.counter;
            this.post_counter.current.innerHTML = this.counter;
            if(this.keepPosting){
                currentEle.click();
                console.log('posted');
                this.stopButton.current.classList.remove('is-disabled');
            }else{
                console.log('stopped');
                this.keepPosting= true;
                currentEle.classList.remove('is-disabled');
                this.stopButton.current.classList.add('is-disabled');
            }
          }
      }

      render(){
      	return(
          <Fragment>
                <div className="br-mainpanel">
                    <div className="br-pagebody">
                        <div className="br-section-wrapper">
                            <h6 className="tx-gray-800 tx-uppercase tx-bold tx-14 mg-b-10">Sections details</h6>
                            <p className="mg-b-30 tx-gray-600">A form with a label on top of each form control.</p>

                            <div className="form-layout">
                                <div className="row">
                                <div className="col-lg-3">
                                        <div className="form-group">
                                            <input className="form-control" ref={this.source_name} type="text" name="firstname" placeholder="Name" />
                                        </div>
                                </div>
                                <div className="col-lg-1">
                                     <h1 ref={this.post_counter}>0</h1>
                                </div>
                                <div className="col-lg-3">
                                        <div className="form-group">
                                            <button ref={this.postButton} className="btn btn-primary btn-block uppercase mg-b-10" onClick={this.addNewPosts}>Uplaod New Posts</button>
                                        </div>
                                </div> 
                                <div className="col-lg-2">
                                        <div className="form-group">
                                            <button ref={this.stopButton} className="btn btn-danger btn-block uppercase mg-b-10 is-disabled" onClick={this.stopKeepPosting}>stop</button>
                                        </div>
                                </div> 
                                    {/* <div className="col-lg-4">
                                        <div className="form-group">
                                            <input className="form-control" ref={this.source_name} type="text" name="firstname" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <textarea rows="3" ref={this.source_urls} className="form-control" placeholder="Textarea"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group">
                                            <button className="btn btn-primary btn-block uppercase mg-b-10" onClick={this.onAddSource}>New Source</button>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                       
                            <List/>
                        </div>
                    </div>
                </div>
          </Fragment>
        )
      }
}

export default connect(state=>state, actions)(Header);






