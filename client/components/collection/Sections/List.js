import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions';

import EditSections from '../Models/EditSections';

class List extends Component{
     state = {
         sectionId: null
     }
      componentDidMount(){
          this.props.listSections();
      }
      toggleSection = (e)=>{
           e.preventDefault();
           const currentEle = e.target;
           currentEle.classList.add('is-disabled');
           const { id, action } = currentEle.dataset;
           this.props.toggleContent({type: 'sections', id, action}, (err, result)=>{
              currentEle.classList.remove('is-disabled');
              this.props.listSections();
           });  
      }

      onEdit = (e)=>{
          e.preventDefault();
          this.setState({ sectionId: e.target.dataset.id });
      }
      render(){
      	return(
          <Fragment>
                <div className="bd bd-gray-300 rounded table-responsive mg-t-10">
                    {/* https://www.facebook.com/dialog/share&app_id={APP_ID}&display=popup&href={LINK_TO_SHARE}&redirect_uri={REDIRECT_AFTER_SHARE} */}
                    <a href="https://www.facebook.com/dialog/share?app_id=426940641303361&display=popup&href=https://feelfunny.app/fbshare-article/5ed3f1501374a166a06e306f&redirect_uri=https://feelfunny.app" target="_blank">Goto Logo</a>
                    <table className="table mg-b-0">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Key</th>
                        <th>Name</th>
                        <th>Url</th>
                        <th>Description</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.listOfSections.length>0 && this.props.listOfSections.map((section, index)=>{
                                return(
                                    <tr key={section._id}>
                                        <th scope="row">{index+1}</th>
                                        <td>{section._id}</td>
                                        <td><a href={`/list-source-posts/${section._id}`} target="_blank">{section.value}</a></td>
                                        <td><a href={section.url} target="_blank">Goto Logo</a></td>
                                        <td>{section.description}</td>
                                        <td className="custom-switch">
                                        <button onClick={this.onEdit} data-toggle="modal" data-target="#modaldemo1" data-id={section._id} className={section.is_active? "btn tx-uppercase btn-primary" : "btn tx-uppercase btn-primary is-disabled"}>edit section</button>
                                        {section.is_active 
                                          ? <button data-id={section._id} data-action="0" onClick={this.toggleSection} className="btn tx-uppercase btn-danger mg-l-10">disable</button>
                                          : <button data-id={section._id} data-action="1" onClick={this.toggleSection} className="btn tx-uppercase btn-success mg-l-10">active</button>
                                        }
                                        </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                </div>
                
                <EditSections  onSectonEdit={this.state.sectionId}/>
          </Fragment>
        )
      }
}


export default connect(state=>state, actions)(List);






