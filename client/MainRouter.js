import React, {Component, Fragment} from 'react'
import {Switch, Route} from 'react-router-dom'

import Header from './components/collection/Partials/Header';
import Leftsidebar from './components/collection/Partials/Leftsidebar';

import Home from './components/Home'

import UniversalUpload from './components/collection/UniversalUpload';
import AddTags from './components/collection/AddTags';
import Crawler from './components/collection/Crawler'




class MainRouter extends Component{
	  render(){
	  	  return(
             <Fragment>
			  <Header/>
			  <Leftsidebar/>
               <Switch>
               	    <Route exact path="/" component={Home}/>
					<Route path="/uploader" component={UniversalUpload}/>
					<Route path="/tags" component={AddTags}/>
					<Route path="/crawler" component={Crawler}/>
               </Switch>
             </Fragment>
	  	  )
	  }
}

export default MainRouter;