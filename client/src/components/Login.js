import React, { useState } from 'react';


import { loginUser } from '../utils/API';
import Auth from '../utils/auth';

const LoginForm = () => {
    const [userData, setUserData] = useState({ email: '', password: ''});
    const [validated] = useState(false)
    const [showAlert, setShowAlert] = useState(false);
};