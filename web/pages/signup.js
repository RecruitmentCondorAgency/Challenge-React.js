import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import { Form,Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";

function setUser(user){
    var link = `http://localhost:3000/users`;
    return new Promise((resolve,reject)=>{
        axios.post(link,user).then((response)=>{
            resolve(response.data);
        }).catch((error)=>{
            reject(error);
        });
    })
}

export default function signup() {
    const navigate = useNavigate();
    const [validated, setValidated] = React.useState(false);
    const [email, emailUpdate] = React.useState('');
    const [name, nameUpdate] = React.useState('');
    const [password, passwordUpdate] = React.useState('');
    const [repeat, repeatUpdate] = React.useState('');
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }else{
            setUser({
                id:email,
                name:name,
                password:password,
            }).then((data)=>{
                ReactSession.set("user.id",data.id);
                ReactSession.set("user.name",data.name);
                navigate("/");
            }).catch((error)=>{
                console.error(error);
                alert("Can't create user. Maybe it already exist");
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

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Fullname</Form.Label>
                        <Form.Control required type="text" placeholder="Enter fullname" 
                            value={name}
                            onChange={(e)=> nameUpdate(e.target.value)}
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
                            Password is required to Sign In
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicRepeat">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control required type="password" placeholder="Repeat Password"
                            value={repeat}
                            onChange={(e)=> repeatUpdate(e.target.value)}
                            isInvalid={password!==repeat}
                        />
                        <Form.Control.Feedback type="invalid">
                            The password must match
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        <span className="mx-2">Sign up</span>    
                        <FontAwesomeIcon 
                            icon={faUserPlus} 
                        />
                    </Button>
                </Form>
            </div>
        </div>

    );
}