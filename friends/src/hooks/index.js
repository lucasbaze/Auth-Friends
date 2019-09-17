import { useState, useEffect } from 'react';
import axios from 'axios';

//Restructure to a hook
export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            Authorization: token,
        },
    });
};
