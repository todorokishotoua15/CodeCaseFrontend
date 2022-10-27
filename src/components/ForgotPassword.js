import {React, useState, useEffect} from "react";
import { Media, Form, FormGroup, Input, Col, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import cu3 from "./cu3.jpg";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {  faFacebookF , faGoogle, faGithub} from '@fortawesome/free-brands-svg-icons';
import { gsap } from "gsap";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Navb2 from "./Navbar2";



function ForgotPassword(){
    const [redirect, setredirect] = useState(false);
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    function handleSubmit() {

    }

    
    return (
        <div className="loginback"> 
            <div className="loginbody container">
                
                
                <div className="row hund_height ">
                    <div className="col-12 col-md-6 hund_height">
                    <div className="container ">
                            <div className="login_modal_body d-flex justify-content-center">
                                <h1 className="cursive1 mt-4 login_head">Reset Password</h1>
                                
                            </div>
                            <hr className="hor_line"></hr>
                            <div className="d-flex justify-content-center mt-md-3 d-none d-md-block">
                                <p className=" center_text login_para">If you forgot your password, enter your username and email <br/>that you used during signup. An OTP will be sent which you will have <br/>
                                to enter to reset password.</p>
                            </div>
                            <form className="mt-md-5" >
                                <div className="form-group row">
                                    <label  className="col-12 col-md-4 col-form-label cursive1 texts1 mt-md-2">Username</label>
                                    <div className="col-11 col-md-7 mt-3 login_placeholder">
                                    <Input type="text"  className="cursive1 texts2" placeholder="codeforces username" innerRef={(inp) => setusername(inp)}> </Input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputPassword" className="col-12 col-md-4 col-form-label cursive1 texts1 mt-2">Email</label>
                                    <div className="col-11 col-md-7 mt-3 login_placeholder">
                                    <Input type="email" className="form-control cursive1 texts2" id="inputPassword" placeholder="Email" innerRef={(inp) => setpassword(inp)}> </Input>
                                    </div>
                                </div>
                                
                                
                            </form>
                            <div className="row login_sub">
                                    <div className="col-6 offset-3 col-md-5 offset-md-4 mt-sm-3">
                                        <button className="btn btn-dark hund_width cursive1" onClick={handleSubmit}>Submit</button>
                                    </div>
                                </div>
                            
                        </div>
                    </div>
                    <div className="col-6 g-0 d-none d-md-block  hund_height">
                        <div className="contaier  nopadd nomarg hund_height">
                                <img src={cu3} className="media_img hund_height hund_width"></img>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
    
}

export default ForgotPassword;