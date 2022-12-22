import React, { useState } from 'react';

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
}