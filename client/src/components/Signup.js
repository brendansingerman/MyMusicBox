import React, { useState } from 'react';
import { Form } from 'react-bootstrap/lib/Navbar';

import { createUser } from '../utils/API';
import Auth from '../utils/auth';

const Signup = () => {
    const [userData, setUserData] = useState({ username: '', email: '', password: ''});
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleInput = (event) => {
        const { user_name, value } = event.target;
        setUserData({ ...userData, [user_name]: value});
    };

    const handlesubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
    }

    try {
        const response = await createUser(userData)

        if (!response.ok) {
            throw new Error('Something is wrong!');
        }

        const { token, user } = await response.json();
        console.log(user);
        Auth.login(token);
      } catch (err) {
        console.error(err);
        setShowAlert(true);
    }

    setUserData({
        username: '',
        email: '',
        password: '',
      });
}

return (
    <>
    <Form noValidate validated={validated} onSubmit={handlesubmit}>
    <Alert></Alert>
    </Form>
    </>
)
}