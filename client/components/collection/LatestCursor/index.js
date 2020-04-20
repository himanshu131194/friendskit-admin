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
                            <h6 className="tx-gray-800 tx-uppercase tx-bold tx-14 mg-b-10">Latest cursor details</h6>                       
                            <List/>
                        </div>
                    </div>
                </div>
          </Fragment>
        )
      }
}

export default connect(state=>state, actions)(Header);






