import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions'
import List from './List'


class AddTags extends Component{

      section_name = React.createRef();
      next_cursor = null;
      total_count =  React.createRef();
      
      onSectionName = (e)=>{
          e.preventDefault();
          const currentEle = e.target;
        //   next_cursor = (e.target.nextCursor || this.next_cursor)? this.next_cursor : null;

          currentEle.classList.add('is-disabled');
          const section_name = this.section_name.current.value;

          if(section_name!==''){
             this.props.crawlNineGag({section_name, next_cursor: this.next_cursor}, (err, result)=>{
                console.log(err)
                this.next_cursor = result.next_cursor;
                if(result){
                    this.total_count.current.innerHTML = parseInt(this.total_count.current.innerHTML) + parseInt(result.source_urls.length);
                    this.props.addSource(result, (err, responce)=>{
                        currentEle.classList.remove('is-disabled');
                        //this.props.listTags();
                        //this.section_name.current.value = '';
                        currentEle.click();
                    });  
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
                            <h6 className="tx-gray-800 tx-uppercase tx-bold tx-14 mg-b-10">Tags details</h6>
                            <p className="mg-b-30 tx-gray-600">A form with a label on top of each form control.</p>

                            <div className="form-layout">
                                <div className="row">

                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <input className="form-control" ref={this.section_name} type="text" name="firstname" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group">
                                            <button id="dddddddd" className="btn btn-primary btn-block uppercase mg-b-10" onClick={this.onSectionName}>craw new data</button>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group">
                                            <button className="btn btn-primary btn-block uppercase mg-b-10" data-nextCursor='next_cursor' onClick={this.onSectionName}>Restore data</button>
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






