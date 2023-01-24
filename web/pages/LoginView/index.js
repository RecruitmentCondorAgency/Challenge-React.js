import { Container, Row, Col } from "react-bootstrap";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavBar } from "../../components/NavBar";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import './styles.css';

export const LoginView = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const usenavigate = useNavigate();

    useEffect(()=>{
        
    },[]);


    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            // implentation
            console.log('proceed');
            fetch("http://localhost:3000/users/?email=" + email).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Please Enter registered email');
                } else {
                    console.log('db: ' + resp[0].password + ' - fm: ' + password);
                    if (resp[0].password === password) {
                        localStorage.setItem('userLogged',email);
                        localStorage.setItem('userFirstName', resp[0].first_name)
                        toast.success('Success');                        
                        usenavigate('/profile')
                    }else{
                        toast.error('Please Enter valid credentials');
                    }
                }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }

    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            toast.warning('Please Enter Email');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
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
                            <Form onSubmit={ProceedLogin} >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" name="email" />

                                    
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Login &#8594;
                                </Button>
                                <label>You do not have an account? <Link to="/register">Sign up</Link></label>
                            
                            </Form>
                            
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}