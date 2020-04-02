import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions'
import List from './List'


class Header extends Component{

      source_name= React.createRef();
      source_urls = React.createRef();
      
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

                                    <div className="col-lg-4">
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






