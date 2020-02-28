import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions'
import Uploader from './Uploader'


class Main extends Component{
      render(){
      	return(
          <Fragment>
               <Uploader/>
          </Fragment>
        )
      }
}

export default connect(state=>state, actions)(Main);






