import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions'
import List from './List'

class Uploader extends Component{
    externalUrlInput = React.createRef();
    state = {
        loading : 0
    }

    componentDidMount(){
    }

    validateUplaodURL = (url)=>{
        return (/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi).test(url);
    }

    onTypeImageURL = (e)=>{
        const contentURL = this.externalUrlInput.current.value.trim();
        if(contentURL.length>0 && this.validateUplaodURL(contentURL)){
            this.setState({loading: 1});
            this.props.uploadS3({url: contentURL, mime:null, ext: null, data64:null}, (err, res)=>{
                console.log(res);
                if(!err){
                      this.uploadedFileObj.postMime = res.mime;
                      this.uploadedFileObj.postExt = res.ext;
                      this.uploadedFileObj.postSlug = res.slug;
                      this.uploadedFileObj.uploadedURL = res.url;
                    //   this.props.onUploadComplete(this.uploadedFileObj, res.base64);
                }else{
                      this.externalUrlInput.current.classList.add('text-error');
                }
                this.setState({loading: 0});
              })
             console.log(contentURL);
         }else{
            this.externalUrlInput.current.classList.add('text-error');
         }

    }


      render(){
      	return(
          <Fragment>
                <div className="br-mainpanel">
                    <div className="br-pagebody">
                        <div className="br-section-wrapper">
                            <h6 className="tx-gray-800 tx-uppercase tx-bold tx-14 mg-b-10">Sections details</h6>
                            <p className="mg-b-30 tx-gray-600">A form with a label on top of each form control.</p>

                            <div className="form-layout">
                                <div className="row">

                                    <div className="col-lg-9">
                                        <div className="form-group">
                                            <input className="form-control" ref={this.externalUrlInput} type="text" name="firstname" placeholder="url" />
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <button onClick={this.onTypeImageURL}  class={this.state.loading==0? "btn btn-primary btn-block uppercase mg-b-10": "btn btn-primary btn-block uppercase mg-b-10 is-disabled"}>generate url</button>
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

export default connect(state=>state, actions)(Uploader);






