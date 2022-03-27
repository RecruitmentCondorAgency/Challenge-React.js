import * as React from "react";
import { Form,Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'


export default function signup() {
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
                            Password is required to Sign In
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Repead Password</Form.Label>
                        <Form.Control required type="password" placeholder="Password" />
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