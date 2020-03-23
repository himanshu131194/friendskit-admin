import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions';

import EditTags from '../Models/EditTags';

class List extends Component{
     state = {
         tagId: null
     }
      componentDidMount(){
          this.props.listTags();
      }
      toggleTag = (e)=>{
           e.preventDefault();
           console.log('dsdsdsdsds');
           const currentEle = e.target;
           currentEle.classList.add('is-disabled');
           const { id, action } = currentEle.dataset;
           this.props.toggleContent({type: 'tags', id, action}, (err, result)=>{
              currentEle.classList.remove('is-disabled');
              this.props.listTags();
           });  
      }

      onEdit = (e)=>{
          e.preventDefault();
          this.setState({ tagId: e.target.dataset.id });
      }
      render(){
      	return(
          <Fragment>
                <div className="bd bd-gray-300 rounded table-responsive mg-t-10">
                    <table className="table mg-b-0">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Key</th>
                        <th>Name</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.listOfTags.length>0 && this.props.listOfTags.map((tag, index)=>{
                                return(
                                    <tr key={tag._id}>
                                        <th scope="row">{index+1}</th>
                                        <td>{tag._id}</td>
                                        <td>{tag.name}</td>
                                        <td className="custom-switch">
                                        <button onClick={this.onEdit} data-toggle="modal" data-target="#modaldemo1" data-id={tag._id} className={tag.is_active? "btn tx-uppercase btn-primary" : "btn tx-uppercase btn-primary is-disabled"}>edit tag</button>
                                        {tag.is_active 
                                          ? <button data-id={tag._id} data-action="0" onClick={this.toggleTag} className="btn tx-uppercase btn-danger mg-l-10">disable</button>
                                          : <button data-id={tag._id} data-action="1" onClick={this.toggleTag} className="btn tx-uppercase btn-success mg-l-10">active</button>
                                        }
                                        </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                </div>
                
                <EditTags  onTagEdit={this.state.tagId}/>
          </Fragment>
        )
      }
}


export default connect(state=>state, actions)(List);






