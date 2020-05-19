import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions'
import List from './List'
import axios from 'axios'

class AddTags extends Component{

      section_name = React.createRef();
      next_cursor = null;//'QVFBVHJOYkpMdk5oVXJCVjdPR2J0REI5azdEZ2FaY21xbUJqM0lFTUVWMEVURTg1RGZNV0Z5LXNOanV1TWxUMkpOSUpwbG5EN2lEXzdaOXZSc1d5NHllZg==';
      cursor_id = null;//300712527;
      

      total_count =  React.createRef();
      selected_section = React.createRef();
      crawl_new = React.createRef();

      componentDidMount(){
        this.props.listSections();
      }

      getLatestCursor = async (e)=>{
          const currentEle = e.target;
                currentEle.classList.add('is-disabled');
          const section_name = this.section_name.current.value;
          const response = await this.props.latestCursor({ crawled_source: 2, section_name }, (err, result)=>{
                if(result){
                    this.next_cursor = result.next_cursor;
                    currentEle.classList.remove('is-disabled');
                }
                console.log(result.next_cursor);
          });
      }
      
      onCrawlData = (e)=>{
          e.preventDefault();
          const currentEle = e.target;
        //   next_cursor = (e.target.nextCursor || this.next_cursor)? this.next_cursor : null;

          currentEle.classList.add('is-disabled');
          const section_name = this.section_name.current.value;
          const selected_section = this.selected_section.current.value;
        //   const cursor_id = null;
          if(section_name!==''){
             this.props.crawlInstaGram({section_name, selected_section, cursor_id: this.cursor_id, next_cursor: this.next_cursor}, (err, result)=>{
                console.log(result);
                if(err){
                    console.log(err);
                    return;
                }
                this.next_cursor = result.next_cursor;
                this.cursor_id = result.cursor_id;
                if(result.next_cursor && result.cursor_id){
                    this.total_count.current.innerHTML = parseInt(this.total_count.current.innerHTML) + parseInt(result.source_urls.length);
                    this.props.addSource(result, (err, responce)=>{
                        currentEle.classList.remove('is-disabled');
                        //this.props.listTags();
                        //this.section_name.current.value = '';
                         currentEle.click();
                    });
                    // currentEle.click();
                }

             });  
          }
      }

      render(){
      	return(
          <Fragment>
                <div className="br-mainpanel">
                    <div className="br-pagebody">
                        <div className="br-section-wrapper">
                            <div className="form-layout">
                                <div className="row">
                                <div className="col-lg-3">
                                        <div className="form-group">
                                            <input className="form-control" ref={this.section_name} type="text" name="firstname" placeholder="UserName" />
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <select class="form-control" ref={this.selected_section}>
                                            {
                                                this.props.listOfSections.length>0 && this.props.listOfSections.map((section, index)=>{
                                                    return <option value={section._id}>{section.value}</option>
                                                })
                                            }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group">
                                            <button ref={this.crawl_new} className="btn btn-primary btn-block uppercase mg-b-10" onClick={this.onCrawlData}>craw new data</button>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group">
                                            <button className="btn btn-primary btn-block uppercase mg-b-10" data-nextCursor='next_cursor' onClick={this.getLatestCursor}>Restore data</button>
                                        </div>
                                    </div>

                                    <div className="col-lg-2">
                                        <div className="form-group">
                                            <h1 ref={this.total_count}>0</h1>
                                        </div>
                                    </div>

                                </div>
                            </div>
                       
                            {/* <List/> */}
                        </div>
                    </div>
                </div>
          </Fragment>
        )
      }
}

export default connect(state=>state, actions)(AddTags);






