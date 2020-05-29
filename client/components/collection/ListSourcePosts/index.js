import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions'
import List from './List'
import axios from 'axios';


class Header extends Component{
      constructor(){
            super();
      }
      next_post = React.createRef();
      counter = 0;
      state = {
        sourceName : '',
        listOfPosts : []
      }
      offset = 0;
      limit = 8;
      
      componentDidMount(){
        this.nextPosts();
      }
      nextPosts = async (flag)=>{
        this.offset = (flag==0)? parseInt(this.offset)-8: (this.counter>0 ? parseInt(this.offset)+8 : 0)
        const { params: { source: sourceName} } = this.props.match;
        this.setState({ sourceName });
        const {data: {data: result}} = await axios.get(`/api/page-contents?source_name=${sourceName}&limit=${this.limit}&offset=${this.offset}`);
        console.log(result)
        this.setState({ listOfPosts : result });
        flag>0 && (++this.counter);
      }
      prevPosts = async ()=>{
        
        const { params: { source: sourceName} } = this.props.match;
        this.setState({ sourceName });
        const {data: {data: result}} = await axios.get(`/api/page-contents?source_name=${sourceName}&limit=${this.limit}&offset=${this.offset}`);
        console.log(result)
        this.setState({ listOfPosts : result })
      }
      render(){
      	return(
          <Fragment>
                <div className="br-mainpanel">
                    <div className="br-pagebody">
                        <div className="br-section-wrapper">
                            <h6 className="tx-gray-800 tx-uppercase tx-bold tx-14 mg-b-10">{this.state.sourceName}</h6>
                            <div className="form-layout">
                                <div className="row">

                                    {/* <div className="col-lg-3">
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
                                    </div> */}
                                    <div className="col-lg-12">
                                            <button className={this.offset>0 ? "btn btn-primary uppercase mg-b-10 mr-3 wd-10p" : "btn btn-primary uppercase mg-b-10 mr-3 wd-10p is-disabled"} onClick={()=>this.nextPosts(0)} >Prev</button>
                                            <button className="btn btn-primary uppercase mg-b-10 wd-10p" ref={this.next_post} onClick={()=>this.nextPosts(1)}>Next</button>
                                    </div>
                                </div>
                            </div>
                       
                            <List onUpdateList={this.state.listOfPosts}/>
                        </div>
                    </div>
                </div>
          </Fragment>
        )
      }
}

export default connect(state=>state, actions)(Header);






