import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import "./Login.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [loginType, setLoginType] = useState('');
    const navigateTo = useNavigate();
    function navigateToExternalUrl(url) {
        window.location.href = url;
    }
    const handleLogin = (event) => {
        console.log("handleLogin")
        event.preventDefault();
        // Call login API and handle response
        if (loginType === 'manager') {
            console.log('Manager login')
            axios.get(`http://localhost:8081/api/stores/pwd/${email}`)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        console.log('Login successful');
                        localStorage.setItem('login', true);
                        navigateTo('/home')
                        // navigateToExternalUrl('https://localhost:8081/')
                    } else {
                        setShowAlert(true);
                        localStorage.setItem('login', false);
                        setAlertMessage('Incorrect email or password');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    localStorage.setItem('login', false);
                    setShowAlert(true);
                    setAlertMessage('Incorrect email or password');
                });
        } else if (loginType === 'user') {
            axios.get(`localhost:8081/api/users/pwd/${email}`)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        console.log('Login successful');
                    } else {
                        setShowAlert(true);
                        setAlertMessage('Incorrect email or password');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setShowAlert(true);
                    setAlertMessage('Incorrect email or password');
                });
        }
    };

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            {showAlert && <Alert variant="danger">{alertMessage}</Alert>}
            <div>
                <button onClick={() => setLoginType('manager')}>Store Owner login</button>
                <button onClick={() => setLoginType('user')}>Customer login</button>
            </div>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Login ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
};


export default Login;
