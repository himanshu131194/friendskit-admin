import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions';

class List extends Component{
      componentDidMount(){
          this.props.listLatestCursors();
      }
      render(){
      	return(
          <Fragment>
                <div className="bd bd-gray-300 rounded table-responsive mg-t-10">
                 <div class="table-wrapper">
                  <table id="datatable2" class="table display responsive nowrap">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Source</th>
                        <th>Crawled Source</th>
                        {/* <th>Next Cursor</th> */}
                        <th>URL</th>
                        <th>Laetst URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.listOfLatestCursors.length>0 && this.props.listOfLatestCursors.map((cursor, index)=>{
                                let latestUrl  = cursor.crawled_source > 1 ? '' : `https://facebook.com/${cursor.source}/photos`;
                                return(
                                    <tr key={cursor._id}>
                                        <th scope="row">{index+1}</th>
                                        <th>{cursor.source}</th>
                                        <td>{cursor.crawled_source > 1 ? '9gag' : 'fb'}</td>
                                        {/* <td>{cursor.next_cursor}</td> */}
                                        <td><a target="_blank" href={cursor.url}>goto</a></td>
                                         <td>{latestUrl !== ''? <a target="_blank" href={latestUrl}>goto</a>: ''}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                    </div>
                </div>
          </Fragment>
        )
      }
}




export default connect(state=>state, actions)(List);



