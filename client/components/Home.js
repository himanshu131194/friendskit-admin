import React, {Component, Fragment} from 'react';

import Header from './collection/partials/Header';
import MobileHeader from './collection/partials/MobileHeader';
import LoginModel from './collection/Models/Login'
import Upload from './collection/Models/Upload/'



class Home extends Component{
      render(){
      	 return(
           <Fragment>
			   <Header/>
            <MobileHeader/>

            <LoginModel/>
            <Upload/>
            
                     <div className="post-container">
                         <section className="posts">
                           <div className="posts-inner">
                           </div>
                        </section>
                     </div>
           </Fragment>
      	 )
      }
}

export default Home;