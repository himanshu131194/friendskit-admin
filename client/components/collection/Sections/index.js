import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions'
import List from './List'


class Header extends Component{

      section_name= React.createRef();
      section_logo = React.createRef();
      section_description = React.createRef();
      
      onAddSection = (e)=>{
          e.preventDefault();
          const currentEle = e.target;

          currentEle.classList.add('is-disabled');
          const section_name = this.section_name.current.value,
                section_logo = this.section_logo.current.value,
                section_description = this.section_description.current.value;
          if(section_name!=='' && this.section_logo!=='' && this.section_description!==''){
             this.props.addSection({section_name, section_logo, section_description}, (err, result)=>{
                currentEle.classList.remove('is-disabled');
                this.props.listSections();

                this.section_name.current.value = '',
                this.section_logo.current.value = '',
                this.section_description.current.value = '';
             });  
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
                                            <input className="form-control" ref={this.section_name} type="text" name="firstname" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <input className="form-control" ref={this.section_logo} type="text" name="firstname" placeholder="Logo url" />
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <input className="form-control" ref={this.section_description} type="text" name="lastname" placeholder="Description" />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group">
                                            <button className="btn btn-primary btn-block uppercase mg-b-10" onClick={this.onAddSection}>New section</button>
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

export default connect(state=>state, actions)(Header);






