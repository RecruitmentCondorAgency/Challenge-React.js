import * as React from "react";
import { ReactSession } from 'react-client-session';
import { Form,Button } from 'react-bootstrap';
import { Link,useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import axios from "axios";

function getUser(email){
    var link = `http://localhost:3000/users/${email}`;
    return new Promise((resolve,reject)=>{
        axios.get(link).then((response)=>{
            resolve(response.data);
        }).catch((error)=>{
            console.error(error);
            reject(error.response);
        });
    })
}


export default function Login() {
    const navigate = useNavigate();
    const [validated, setValidated] = React.useState(false);
    const [email, emailUpdate] = React.useState('');
    const [password, passwordUpdate] = React.useState('');
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }else{
            getUser(email).then((data)=>{
                if(data.id==email&&data.password==password){
                    ReactSession.set("user.id",data.id);
                    ReactSession.set("user.name",data.name);
                    navigate("/");
                }else{
                    alert("Password missmatch!");
                }
            }).catch((error)=>{
                if(error.status==404){
                    alert("User doesn't exist");
                }else{
                    alert("Can't get user. Try Again Later");
                }
            });
        }
        setValidated(false);
    }
    return (
        <div className="container py-5 px-4 px-md-0">
            <div className="row full-center">
                <Form className="col-12 card p-3 shadow" noValidate 
                    validated={validated} 
                    onSubmit={handleSubmit}
                >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" 
                            value={email}
                            onChange={(e)=> emailUpdate(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Password" 
                            value={password}
                            onChange={(e)=> passwordUpdate(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Password is required to log in
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="mt-1 mb-4 text-muted">
                        You do not have an account? Sign up <Link to="/signup">here</Link> 
                    </div>
                    <Button variant="primary" type="submit">
                        <span className="mx-2">Login</span>   
                        <FontAwesomeIcon 
                            icon={faArrowRight} 
                        />
                    </Button>
                </Form>
            </div>
        </div>

    );
}