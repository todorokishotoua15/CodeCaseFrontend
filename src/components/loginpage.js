import {React, useEffect, useRef, useState} from "react";
import { Media, Form, FormGroup, Input, Col, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import cu3 from "./cu3.jpg";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {  faFacebookF , faGoogle, faGithub} from '@fortawesome/free-brands-svg-icons';
import { gsap } from "gsap";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Navb2 from "./Navbar2";

function LoginPage() {

    const [isOpen, setisOpen] = useState(false);
    const [redirect, setredirect] = useState(false);
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
   
    function login(event) {
        console.log(username.value);
        if (username.value.length === 0 || password.value.length === 0) {
            alert("Invalid username or password");
            return 0;
        }
        fetch("https://codeforces.com/api/user.info?handles=" + username.value)
            .then((res) => res.json())
            .then((res) => {
                var result = res.result[0];
                var rating = result.rating;
                console.log(rating);
                toggleModal();
                axios.post("https://codecasebackend.herokuapp.com/users/updrating", {
                    username : username.value,
                    rating: rating
                }).then((res) => {
                    console.log("rating fetch successful!");
                    axios.post('https://codecasebackend.herokuapp.com/users/login', {
                        username: username.value,
                        password: password.value,
                        rating: rating
                    })
                    .then(function (response) {
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('username', username.value);
                        setredirect(true);

                    })
                    .catch(function (error) {
                        alert("Invalid Credentials!");
                        console.log(error);
                        setisOpen(false)
                    });
                }).catch((err)=> {
                    console.log(err);
                })
            }).catch((err)=>{
                console.log(err);
                alert("Invalid username!");
            })
        
    }

    function toggleModal() {
        console.log("clicked");
        setisOpen(!isOpen);
    }

    let navigate = useNavigate();

    return(
        <div className="loginback"> 
            <div className="loginbody container">
                {redirect ? <Navigate to="/dashboard"></Navigate> : null}
                <Modal isOpen={isOpen} fullscreen={true} toggle={toggleModal} animation={false}>
                        <div className=" ml-0 row">
                            <div className="col-12">
                                <div className="skel_nav ">
                                    <span className="skel_loading"></span>
                                </div>
                            </div>
                        </div>
                        <div className="row row-content2 d-flex justify-content-center mt-3 w-100">
                        <div className="col-10 col-md-5 skel_nav1">
                            
                        </div>
                        </div>
                        <div className="row mt-5 mb-5 gx-5 align-items-center tt1">
                            <div className=" col-6 offset-3 offset-md-0 col-md-3 skel_button">
                                
                            </div>
                            <div className="col-6 offset-3 offset-md-0 mt-3 mt-md-0 col-md-3 offset-md-1 skel_button">
                                
                            </div>
                            <div className="col-6 offset-3 offset-md-0 mt-3 mt-md-0 col-md-3 offset-md-1 skel_button">
                                
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center mt-md-3">
                            <div className="col-12 mt-5 skel_head1 ">
                                
                            </div>
                            
                        </div>
                        <div className="row  mt-2  ">
                                <div className="col-6 offset-3  mt-md-7 d-flex justify-content-center mt-5 mb-5 ">
                                    <div className="skel_circ">

                                    </div>
                                </div>
                        </div>
                </Modal>
                <div className="row hund_height ">
                    <div className="col-12 col-md-6 hund_height">
                    <div className="container ">
                            <div className="login_modal_body d-flex justify-content-center">
                                <h1 className="cursive1 mt-4 login_head">CodeCase</h1>
                                
                            </div>
                            <hr className="hor_line"></hr>
                            <div className="d-flex justify-content-center mt-md-3 d-none d-md-block">
                                <p className=" center_text login_para">Welcome to codecase! Login using your codeforces  username <br/> and the password
                                which you used during sign up!</p>
                            </div>
                            <form className="mt-md-5" >
                                <div className="form-group row">
                                    <label  className="col-12 col-md-4 col-form-label cursive1 texts1 mt-md-2">Username</label>
                                    <div className="col-11 col-md-7 mt-3 login_placeholder">
                                    <Input type="text"  className="cursive1 texts2" placeholder="codeforces username" innerRef={(inp) => setusername(inp)}> </Input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputPassword" className="col-12 col-md-4 col-form-label cursive1 texts1 mt-2">Password</label>
                                    <div className="col-11 col-md-7 mt-3 login_placeholder">
                                    <Input type="password" className="form-control cursive1 texts2" id="inputPassword" placeholder="Password" innerRef={(inp) => setpassword(inp)}> </Input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col offset-md-4 mt-2">
                                        <a className="cursive1 for_pass" href="/forgotpass">Forgot password?</a>
                                    </div>
                                    
                                </div>
                                
                            </form>
                            <div className="row login_sub">
                                    <div className="col-6 offset-3 col-md-5 offset-md-4 mt-sm-3">
                                        <button className="btn btn-dark hund_width cursive1" onClick={login}>Submit</button>
                                    </div>
                                </div>
                            <div className="row mt-4">
                                <div className="col-1 offset-3 offset-md-5 mt-5">
                                    <i className="fa fa-google fa-2x"></i>
                                </div>
                                <div className="col-1 offset-1 offset-md-0 mt-5">
                                    <i className="fa fa-facebook fa-2x"></i>
                                </div>
                                <div className="col-1 offset-1 offset-md-0 mt-5">
                                    <i className="fa fa-github fa-2x"></i>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col offset-md-1 d-flex justify-content-center">
                                    <p className="cursive1">Oauth coming soon!</p>
                                </div>
                            </div>
                            
                            <div className="row mt-long">
                            <hr className="hor_line mt-sm-6 mt-5 "></hr>
                            <div className="text-center p-3 cursive1 " >
                                © The site was developed and deployed by harsh kumar
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
};

export default LoginPage;