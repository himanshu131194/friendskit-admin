import React, {PureComponent, Fragment} from 'react';

import Leftsidebar from './collection/Partials/Leftsidebar';
import Sections from './collection/Sections';




class Home extends PureComponent{
      render(){
      	 return(
                  <Fragment>
                        <Sections/>
                  </Fragment>
      	 )
      }
}

export default Home;

