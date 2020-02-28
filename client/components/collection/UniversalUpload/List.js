import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions';

import EditSections from '../Models/EditSections';

class List extends Component{
    state = {
        sectionId: null
    }
    componentDidMount(){
        this.props.listDocuments();
    }
    render(){
        return(
            <Fragment>
                <div className="bd bd-gray-300 rounded table-responsive mg-t-10">
                    <table className="table mg-b-0">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>URL</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.listOfSections.length>0 && this.props.listOfSections.map((section, index)=>{
                                return(
                                    <tr key={section._id}>
                                        <th scope="row">{index+1}</th>
                                        <td>{section.url}</td>
                                        <td className="custom-switch">
                                            <button onClick={this.onEdit} data-toggle="modal" data-target="#modaldemo1" data-id={section._id} className={section.is_active? "btn tx-uppercase btn-primary" : "btn tx-uppercase btn-primary is-disabled"}>copy url</button>
                                        </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                </div>
            </Fragment>
        )
    }
}


export default connect(state=>state, actions)(List);






