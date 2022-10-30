import {React, useEffect, useRef, useState} from "react";
import { Media, Form, FormGroup, Input, Col, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import cu3 from "./cu3.jpg";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {  faFacebookF , faGoogle, faGithub} from '@fortawesome/free-brands-svg-icons';
import { FaSpinner } from 'react-icons/fa';
import { gsap } from "gsap";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Navb2 from "./Navbar2";

function Signup() {

    const [isOpen, setisOpen] = useState(false);
    const [redirect, setredirect] = useState(false);
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    let navigate = useNavigate();

    function handleSubmit() {
        

        if (email.value.length === 0) {
            alert("Please enter email!");
            return 0;
        }

        if (username.value.length === 0) {
            alert("Please enter username!");
            return 0;
        }

        if (password.value.length === 0) {
            alert("Please enter password!");
            return 0;
        }

        if (firstname.value.length === 0) {
            alert("Please enter firstname!");
            return 0;
        }

        setisOpen(true);
        console.log(email.value);
        axios.post('https://codecasebackend.herokuapp.com/users/signup', {
            username: username.value,
            password: password.value,
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value
        })
        .then(function (response) {
            console.log(response);
            setisOpen(false);
            alert("Registration Successfull!");
            let path = "/login";
            navigate(path);
        })
        .catch(function (error) {
            console.log(error);
            setisOpen(false);
            alert("An error occured!");
        });
    }

    return(
        <div className="loginback"> 
            <div className="loginbody container">
                {redirect ? <Navigate to="/dashboard"></Navigate> : null}
                <Modal isOpen={isOpen} size="lg" centered>
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
                <div className="row hund_height ">
                    <div className="col-12 col-md-6 hund_height">
                    <div className="container ">
                            <div className="login_modal_body d-flex justify-content-center">
                                <a className="cursive1 mt-4 login_head_anchor" href="/">CodeCase</a>
                                
                            </div>
                            <hr className="hor_line"></hr>
                            <div className="d-flex justify-content-center mt-md-3 d-none d-md-block">
                                <p className=" center_text login_para">Welcome to codecase! Sign Up using your codeforces  username <br/> and email. Please 
                                provide corrrect email as it will be used during <br/> verification.</p>
                            </div>
                            <form className="mt-md-1" >
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
                                <div className="form-group row">
                                    <label  className="col-12 col-md-4 col-form-label cursive1 texts1 mt-md-2">Email</label>
                                    <div className="col-11 col-md-7 mt-3 login_placeholder">
                                    <Input type="email"  className="cursive1 texts2" placeholder="Email" innerRef={(inp) => setemail(inp)}> </Input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label  className="col-12 col-md-4 col-form-label cursive1 texts1 mt-md-2">First Name</label>
                                    <div className="col-11 col-md-7 mt-3 login_placeholder">
                                    <Input type="text"  className="cursive1 texts2" placeholder="First Name" innerRef={(inp) => setfirstname(inp)}> </Input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label  className="col-12 col-md-4 col-form-label cursive1 texts1 mt-md-2">Last Name</label>
                                    <div className="col-11 col-md-7 mt-3 login_placeholder">
                                    <Input type="text"  className="cursive1 texts2" placeholder="Last Name" innerRef={(inp) => setlastname(inp)}> </Input>
                                    </div>
                                </div>
                                
                            </form>
                            <div className="row login_sub">
                                    <div className="col-6 offset-3 col-md-5 offset-md-4 mt-sm-3">
                                        <button className="btn btn-dark hund_width cursive1" onClick={handleSubmit}>Submit</button>
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
}

export default Signup;