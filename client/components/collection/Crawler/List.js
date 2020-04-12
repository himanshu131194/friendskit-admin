import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions';

class List extends Component{
      componentDidMount(){
          this.props.listCrawledSources();
      }
      render(){
      	return(
          <Fragment>
                <div className="bd bd-gray-300 rounded table-responsive mg-t-10">
                    <table className="table mg-b-0">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Source</th>
                        <th>Yes count</th>
                        <th>No count</th>
                        <th>Total Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.listOfCrawledSources.length>0 && this.props.listOfCrawledSources.map((source, index)=>{
                                return(
                                    <tr key={source._id}>
                                        <th scope="row">{index+1}</th>
                                        <th>{source._id}</th>
                                        <td>{source.yesCount}</td>
                                        <td>{source.noCount}</td>
                                        <td>{source.totalCount}</td>
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



