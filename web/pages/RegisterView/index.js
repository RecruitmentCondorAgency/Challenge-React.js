import { Container, Row, Col } from "react-bootstrap";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavBar } from "../../components/NavBar";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import './styles.css';

export const RegisterView = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [newUser, setNewUser] = useState({});

    const usenavigate = useNavigate();

    const ProceedRegister = (e) => {
        e.preventDefault()
        if (validate()) {
            setNewUser({'first_name':firstName,
                        'last_name':lastName,
                        'email':email,
                        'password':password,
                        'universities':[]
                    })
            console.log({'first_name':firstName,
            'last_name':lastName,
            'email':email,
            'password':password,
            'universities':[]
        })
            axios.post('http://localhost:3000/users/', {'first_name':firstName,
                                                            'last_name':lastName,
                                                            'email':email,
                                                            'password':password,
                                                            'universities':[]
                                                        })
            .then((resp) => {
                toast.success('Success');
                localStorage.setItem('userLogged',email);
                localStorage.setItem('userFirstName',firstName);
                usenavigate('/profile')
            }).catch((err) => {
                toast.error('Register Failed due to :' + err.message);
            });
        }
    }

    const validate = () => {
        let result = true;
        if (firstName === '' || firstName === null) {
            result = false;
            toast.warning('Please Enter First Name');
        }
        if (lastName === '' || lastName === null) {
            result = false;
            toast.warning('Please Enter Last Name');
        }
        if (email === '' || email === null) {
            result = false;
            toast.warning('Please Enter Email');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }

        if (password != repassword) {
            result = false;
            toast.warning('Please Confirm Password');
        }
        return result;
    }


    return (
        <div>
            <NavBar />
            <Container>
                <Row>
                    <Col xs={12} md={{ span: 6, offset: 3 }}>
                        <div className="formWrap">
                            <Form onSubmit={ProceedRegister} >
                                <Form.Group className="mb-3" controlId="firstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="lastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" name="email" />
                                   
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword2">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicRePassword">
                                    <Form.Label>ConfirmPassword</Form.Label>
                                    <Form.Control type="password" value={repassword} onChange={e => setRePassword(e.target.value)} placeholder="Confirm Password" />
                                </Form.Group>
                                {/*
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Check me out" />
                                </Form.Group>
                                */}
                                <Button variant="primary" type="submit">
                                    Register
                                </Button>
                                <label>Do you have an account? <Link to="/login">Log in</Link></label>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        
    )
}