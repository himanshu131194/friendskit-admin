import React, {PureComponent, Fragment} from 'react';

import Header from './collection/Partials/Header';
import Leftsidebar from './collection/Partials/Leftsidebar';
import Sections from './collection/Sections';




class Home extends PureComponent{
      render(){
      	 return(
                  <Fragment>
                        <Header/>
                        <Leftsidebar/>
                        <Sections/>
                  </Fragment>
      	 )
      }
}

export default Home;

