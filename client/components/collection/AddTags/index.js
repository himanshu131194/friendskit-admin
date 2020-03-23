import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions'
import List from './List'


class AddTags extends Component{

      tag_name= React.createRef();
      
      onAddTag = (e)=>{
          e.preventDefault();
          const currentEle = e.target;

          currentEle.classList.add('is-disabled');
          const tag_name = this.tag_name.current.value;

          if(tag_name!==''){
             this.props.addTag({tag_name}, (err, result)=>{
                currentEle.classList.remove('is-disabled');
                this.props.listTags();
                this.tag_name.current.value = '';
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
                                            <input className="form-control" ref={this.tag_name} type="text" name="firstname" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group">
                                            <button className="btn btn-primary btn-block uppercase mg-b-10" onClick={this.onAddTag}>New tag</button>
                                        </div>
                                    </div>
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

export default connect(state=>state, actions)(AddTags);






