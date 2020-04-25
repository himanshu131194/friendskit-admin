import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions';

class List extends Component{
      selectedSources = { 

      };
      componentDidMount(){
          this.props.listCrawledSources();
      }
      selectSource = (e)=>{
          let isSelected = e.target.checked,
              sourceValue = e.target.dataset.source;
          if(isSelected){
              this.selectedSources[sourceValue] = sourceValue; 
          }else{
              delete this.selectedSources[sourceValue];
          }
          this.props.onListOfSelectedSource(Object.keys(this.selectedSources));
      }
      render(){
      	return(
          <Fragment>
                <div className="bd bd-gray-300 rounded table-responsive mg-t-10">
                    <table className="table mg-b-0">
                    <thead>
                        <tr>
                        <th>
                            <input type="checkbox" data-source='all' onClick={this.selectSource}/>
                        </th>
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
                                        <th>
                                            <input data-source={source._id} type="checkbox" onClick={this.selectSource}/>
                                        </th>
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



