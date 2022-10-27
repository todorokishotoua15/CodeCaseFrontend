import {React, useState, useEffect} from "react";
import { Media, Form, FormGroup, Input, Col, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import cu3 from "./cu3.jpg";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {  faFacebookF , faGoogle, faGithub} from '@fortawesome/free-brands-svg-icons';
import { FaSpinner } from 'react-icons/fa';
import { gsap } from "gsap";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Navb2 from "./Navbar2";



function ForgotPassword(){
    const [redirect, setredirect] = useState(false);
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [otp, setotp] = useState("");
    const [otp_entered, setotpentered] = useState("");
    const [reset, setreset] = useState(false);
    const [newpass, setnewpass] = useState("");
    const [isOpen,setisOpen] = useState(false);

    function handleSubmit() {
        setisOpen(true);
        console.log(username.value);
        axios.post("http://localhost:3001/forgotpass/", {
                username: username.value,
                email: email.value
            
        })
        .then((res) => {
            console.log(res.data.otp);
            setotp(res.data.otp)
            setisOpen(false);
            localStorage.setItem('email', email.value);
            localStorage.setItem('username', username.value);

        }).catch((err) => {
            console.log(err);
            alert("An error occured!");
            setisOpen(false);
        })
    }

    function validate_otp() {
        console.log(localStorage.getItem('email'));
        axios.post("http://localhost:3001/forgotpass/validate", {
            otp: otp_entered.value,
            email: localStorage.getItem('email')
        }).then((res)=> {
            if (res.data.validation === "success") {
                setreset(true);
            }
            else {
                alert("Wrong OTP!");
                setreset(false);
            }
        }) .catch((err) => {
            console.log(err);
            alert("An error has occured!");
            setreset(false);
        })
    }

    function reset_pass() {
        var username1 = localStorage.getItem('username');
        var email = localStorage.getItem('email');
        setisOpen(true);
        axios.post("http://localhost:3001/forgotpass/changepass", {
            username:username1,
            password: newpass.value
        }).then((res) => {
            setreset(false);
            setotp("");
            alert("Password changed successfully!")
            setisOpen(false);
        }).catch((err) => {
            alert("An error occured!");
        })
    }

    function toggle(){
        setisOpen(!isOpen);
    }

    if (reset === true) {
        return (
            <div className="loginback"> 
            <Modal isOpen={isOpen} size="lg" centered toggle={toggle}>
                <ModalBody className>
                    <div className="row">
                        <div className="fa-3x  col-1 offset-md-4 ">
                            <FaSpinner icon="spinner" className="fa-spin"></FaSpinner>
                            
                        </div>
                        <div className="col-6 offset-2 offset-md-0 fa-3x">
                            <p>Loading...</p>
                        </div>
                    </div>
                    
                </ModalBody>
            </Modal>
            <div className="loginbody container">
                
                
                <div className="row hund_height ">
                    <div className="col-12 col-md-6 hund_height">
                    <div className="container ">
                            <div className="login_modal_body d-flex justify-content-center">
                                <h1 className="cursive1 mt-4 login_head">Enter New Password</h1>
                                
                            </div>
                            <hr className="hor_line"></hr>
                            <div className="d-flex justify-content-center mt-md-3 ">
                                <p className=" center_text login_para">Enter your New password.</p>
                            </div>
                            <form className="mt-md-5" >
                                
                                <div className="form-group row">
                                    <label htmlFor="otp" className="col-12 col-md-4 col-form-label cursive1 texts1 mt-2">New password:</label>
                                    <div className="col-11 col-md-7 mt-3 login_placeholder">
                                    <Input type="password" className="form-control cursive1 texts2" id="otp" placeholder="New Password" innerRef={(inp) => setnewpass(inp)}> </Input>
                                    </div>
                                </div>
                                
                                
                            </form>
                            <div className="row login_sub">
                                    <div className="col-6 offset-3 col-md-5 offset-md-4 mt-sm-3">
                                        <button className="btn btn-dark hund_width cursive1" onClick={reset_pass}>Submit</button>
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

    if (otp.length === 0) {
        return (
            <div className="loginback"> 
            <Modal isOpen={isOpen} size="lg" centered toggle={toggle}>
                <ModalBody className>
                    <div className="row">
                        <div className="fa-3x  col-1 offset-md-4 ">
                            <FaSpinner icon="spinner" className="fa-spin"></FaSpinner>
                            
                        </div>
                        <div className="col-6 offset-2 offset-md-0 fa-3x">
                            <p>Loading...</p>
                        </div>
                    </div>
                    
                </ModalBody>
            </Modal>
                <div className="loginbody container">
                    
                    
                    <div className="row hund_height ">
                        <div className="col-12 col-md-6 hund_height">
                        <div className="container ">
                                <div className="login_modal_body d-flex justify-content-center">
                                    <h1 className="cursive1 mt-4 login_head">Reset Password</h1>
                                    
                                </div>
                                <hr className="hor_line"></hr>
                                <div className="d-flex justify-content-center mt-md-3 ">
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
                                        <Input type="email" className="form-control cursive1 texts2" id="inputPassword" placeholder="Email" innerRef={(inp) => setemail(inp)}> </Input>
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
    
    else {
        return (
            <div className="loginback"> 
                <div className="loginbody container">
                    
                    
                    <div className="row hund_height ">
                        <div className="col-12 col-md-6 hund_height">
                        <div className="container ">
                                <div className="login_modal_body d-flex justify-content-center">
                                    <h1 className="cursive1 mt-4 login_head">Enter OTP</h1>
                                    
                                </div>
                                <hr className="hor_line"></hr>
                                <div className="d-flex justify-content-center mt-md-3 d-none d-md-block">
                                    <p className=" center_text login_para">Please check your email, if it is not present, then check spam or wait for <br/>
                                     2-3 minutes. OTP will be valid for 24 hrs.</p>
                                </div>
                                <form className="mt-md-5" >
                                    
                                    <div className="form-group row">
                                        <label htmlFor="otp" className="col-12 col-md-4 col-form-label cursive1 texts1 mt-2">Enter OTP:</label>
                                        <div className="col-11 col-md-7 mt-3 login_placeholder">
                                        <Input type="text" className="form-control cursive1 texts2" id="otp" placeholder="OTP" innerRef={(inp) => setotpentered(inp)}> </Input>
                                        </div>
                                    </div>
                                    
                                    
                                </form>
                                <div className="row login_sub">
                                        <div className="col-6 offset-3 col-md-5 offset-md-4 mt-sm-3">
                                            <button className="btn btn-dark hund_width cursive1" onClick={validate_otp}>Submit</button>
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
    
}

export default ForgotPassword;