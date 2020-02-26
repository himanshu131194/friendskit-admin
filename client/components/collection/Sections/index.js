import React, {Component, Fragment} from 'react'
import List from './List'

class Header extends Component{
      render(){
      	return(
          <Fragment>
                <div class="br-mainpanel">
                    <div class="br-pagebody">
                        <div class="br-section-wrapper">
                            <h6 class="tx-gray-800 tx-uppercase tx-bold tx-14 mg-b-10">Sections details</h6>
                            <p class="mg-b-30 tx-gray-600">A form with a label on top of each form control.</p>

                            <div class="form-layout">
                                <div class="row">

                                    <div class="col-lg-3">
                                        <div class="form-group">
                                            <input class="form-control" type="text" name="firstname" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div class="col-lg-3">
                                        <div class="form-group">
                                            <input class="form-control" type="text" name="firstname" placeholder="Logo url" />
                                        </div>
                                    </div>
                                    <div class="col-lg-3">
                                        <div class="form-group">
                                            <input class="form-control" type="text" name="lastname" placeholder="Description" />
                                        </div>
                                    </div>
                                    <div class="col-lg-2">
                                        <div class="form-group">
                                            <button class="btn btn-primary btn-block mg-b-10">New section</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                       
                            <List/>
                        </div>
                    </div>
                </div>
          </Fragment>
        )
      }
}

export default Header;






