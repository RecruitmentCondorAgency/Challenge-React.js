import * as React from "react";
import { Form,Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


export default function Login() {
    const [validated, setValidated] = React.useState(false);
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
    
        setValidated(true);
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
                        <Form.Control required type="email" placeholder="Enter email" />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Password" />
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