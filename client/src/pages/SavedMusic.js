import React, { useState, useEffect } from 'react';


import { getMe, deleteMusic } from '../utils/API';
import Auth from '../utils/auth';
import { removeMusicId } from '../utils/localStorage';

const SavedMusic = () => {
    const [userData, setUserData] = useState({});

    const userFataLength = Object.keys(userData).length;

    useEffect(() => {
        const getUserData = async () => {
            
        }
    })
}