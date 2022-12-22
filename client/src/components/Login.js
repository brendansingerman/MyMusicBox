import React, { useState } from 'react';


import { loginUser } from '../utils/API';
import Auth from '../utils/auth';

const LoginForm = () => {
    const [userData, setUserData] = useState({ email: '', password: ''});
    const [validated] = useState(false)
    const [showAlert, setShowAlert] = useState(false);

    const handleInput = (event) => {
        const { user_name, value } = event.target
        setUserData({ ...userData, [user_name]: value });
    };
    const handlesubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        try {
            const response = await loginUser(userData);

            if (!response.ok) {
                throw new Error('something went wrong!')
            }

            const { token, user } = await response.json();
            console.log(user);
            Auth.login(token);
        } catch (err) {
            console.error(err);
            setShowAlert(true)
        }

        setUserFormData({
            username: '',
            email: '',
            password: '',
          });
    }
}