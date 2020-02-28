
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions'

class EditSections extends Component{
   section_name= React.createRef();
   section_logo = React.createRef();
   section_description = React.createRef();
   close_model = React.createRef();
   
   updateSection = (e)=>{
        e.preventDefault();
        const currentEle = e.target;
        currentEle.classList.add('is-disabled');
        const section_name = this.section_name.current.value,
              section_id = currentEle.dataset.id,
              section_logo = this.section_logo.current.value,
              section_description = this.section_description.current.value;
        if(section_name!=='' && this.section_logo!==''){
           this.props.addSection({section_id, section_name, section_logo, section_description}, (err, result)=>{
              currentEle.classList.remove('is-disabled');
              this.props.listSections();
              this.close_model.current.click();
           });  
        }
   }

   render(){
      const result = this.props.listOfSections.filter((section)=>section._id===this.props.onSectonEdit);
      this.section_name.current ? this.section_name.current.value = (result.length>0 ? result[0].value: '') : '';
      this.section_logo.current ? this.section_logo.current.value = (result.length>0 ? result[0].url: ''): '';
      this.section_description.current ? this.section_description.current.value = ((result.length>0 && result[0].description) ? result[0].description: ''): '';

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
                        <input className="form-control" ref={this.section_name} type="text" name="section_name"  placeholder="Enter Name"/>
                        </div>
                     </div>

                     <div className="col-lg-12">
                        <div className="form-group">
                        <label className="form-control-label">URL: <span className="tx-danger">*</span></label>
                        <input className="form-control" ref={this.section_logo} type="text" name="section_url" placeholder="Enter URL"/>
                        </div>
                     </div>

                     <div className="col-lg-12">
                        <div className="form-group">
                        <label className="form-control-label">Description: <span className="tx-danger"></span></label>
                        <textarea rows="3" className="form-control" ref={this.section_description}></textarea>
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

export default connect(state=>state, actions)(EditSections);

