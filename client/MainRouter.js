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
import ListSourcePosts from './components/collection/ListSourcePosts'
import InstagramCrawler from './components/collection/InstagramCrawler'
import Article from './components/collection/Article'
import ArticlesList from './components/collection/Article/List'

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
					<Route path="/upload-live" component={Crawler}/>
					<Route path="/insta-crawler" component={InstagramCrawler}/>
					<Route path="/9gag-crawler" component={NineGagCrawler}/>
					<Route path="/latest-cursor" component={LatestCursor}/>
					<Route path="/list-source-posts/:source" component={ListSourcePosts}/>
					<Route path="/article" component={Article}/>
					<Route path="/list-article" component={ArticlesList}/>
               </Switch>
             </Fragment>
	  	  )
	  }
}


export default MainRouter;