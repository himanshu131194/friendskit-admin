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
    copyToClipBoard = (e)=>{
        let id = e.target.dataset.id;
        let copyText = document.getElementById(id);
        copyText.select();
        // copyText.setSelectionRange(0, 99999); /*For mobile devices*/
        document.execCommand("copy")
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
                            this.props.listOfDocuments.length>0 && this.props.listOfDocuments.map((document, index)=>{
                                return(
                                    <tr key={document._id}>
                                        <th scope="row">{index+1}</th>
                                        <td>
                                            <input id={document._id} className="form-control" ref={this.externalUrlInput} type="text" defaultValue={document.url} placeholder="paste url for picture/video"/>
                                        </td>
                                        <td className="custom-switch">
                                            <button onClick={this.copyToClipBoard} data-toggle="modal" data-target="#modaldemo1" data-id={document._id} className={document.is_active? "btn tx-uppercase btn-primary" : "btn tx-uppercase btn-primary is-disabled"}>copy url</button>
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






