import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../../actions'
import Loader from './Loader';

class Uploads extends Component{
     state = {
         loading : 0
     }
    
    onUploadContent = (e)=>{
        e.preventDefault();
        this.setState({loading: 1});
        let uploadedFile = e.dataTransfer ? e.dataTransfer.files[0]: e.target.files[0],
            mime = uploadedFile.type,
            ext = uploadedFile.name.split('.').pop();
        let reader = new FileReader;
            reader.onload =  (data64)=>{
                          this.props.uploadS3({url: null, mime, ext, data64: data64.target.result}, (err, res)=>{
                               console.log(res)
                              if(!err){
                                  console.log(err);
                              }
                            })
                    console.log(data64.target.result)
            }
          reader.readAsDataURL(uploadedFile);
    }
    render(){
        return(
            <Fragment>
                {this.state.loading===1 && <Loader/>}
                <div className="card-body model-pd"> 
                        <div className="login-wrapper">
                        <div className="form-wrapper">
                                    <div className="login-form">

                                    <div className="field button-wrap">
                                    <div className="control uppercase">
                                        <div className="upload-btn-wrapper">
                                        <button className="button is-solid accent-button raised is-fullwidth uppercase"><i className="mdi mdi-plus"></i> add pictures/videos</button>
                                        <input type="file" id="choose_file" name="myfile" onChange={this.onUploadContent} />
                                        </div>
                                    </div>
                                    </div>
                                    
                                    <div className="field">
                                        <h3 className="uppercase text-center">OR</h3>
                                    </div>

                                    <div className="field">
                                        <div className="control">
                                            <input className="input pl-0 text-center" type="text" placeholder="paste url for picture/video" />
                                        </div>
                                    </div>

                                    </div>
                        </div>
                        </div>
                </div>
             </Fragment>
            )
    }
}

export default connect(state=>state, actions)(Uploads);




