
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions'

class EditTags extends Component{
   tag_name= React.createRef();
   close_model = React.createRef();
   
   updateSection = (e)=>{
        e.preventDefault();
        const currentEle = e.target;
        currentEle.classList.add('is-disabled');
        const tag_name = this.tag_name.current.value,
              tag_id = currentEle.dataset.id;
        if(tag_name!==''){
           this.props.addTag({tag_id, tag_name}, (err, result)=>{
              currentEle.classList.remove('is-disabled');
              this.props.listTags();
              this.close_model.current.click();
           });  
        }
   }

   render(){
      const result = this.props.listOfTags.filter((section)=>section._id===this.props.onTagEdit);
      this.tag_name.current ? this.tag_name.current.value = (result.length>0 ? result[0].name: '') : '';

      return(
        <div id="modaldemo1" className="modal fade">
            <div className="modal-dialog modal-dialog-vertical-center width-500-min" role="document">
            <div className="modal-content bd-0 tx-14">
                <div className="modal-header pd-y-20 pd-x-25">
                <h6 className="tx-14 mg-b-0 tx-uppercase tx-inverse tx-bold">Message Preview</h6>
                <button type="button" className="close" ref={this.close_model} data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body pd-25">
                    <p className="mg-b-5">
                     <div className="col-lg-12">
                        <div className="form-group">
                        <label className="form-control-label">Name: <span className="tx-danger">*</span></label>
                        <input className="form-control" ref={this.tag_name} type="text" name="tag_name"  placeholder="Enter Name"/>
                        </div>
                     </div>
                    </p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary tx-uppercase" data-id={result.length>0 ? result[0]._id: null } onClick={this.updateSection}>Save changes</button>
                    <button type="button" className="btn btn-secondary tx-uppercase" data-dismiss="modal">Close</button>
                </div>
            </div>
            </div>
        </div>
      )
   }
}

export default connect(state=>state, actions)(EditTags);

