import React, {Component, Fragment} from 'react'
import {Switch, Route} from 'react-router-dom'

import Header from './components/collection/Partials/Header';
import Leftsidebar from './components/collection/Partials/Leftsidebar';

import Home from './components/Home'

import UniversalUpload from './components/collection/UniversalUpload';
import AddTags from './components/collection/AddTags';
import Crawler from './components/collection/Crawler'
import LatestCursor from './components/collection/LatestCursor'
import NineGagCrawler from './components/collection/NineGagCrawler'

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
					<Route path="/9gag-crawler" component={NineGagCrawler}/>
					<Route path="/latest-cursor" component={LatestCursor}/>
               </Switch>
             </Fragment>
	  	  )
	  }
}

export default MainRouter;