//React
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//PropTypes
import PropTypes from 'prop-types';

export default function useGlobalProvider() {
    const [errors, setErrors] = useState('');
    const [userData, setUserData] = useState('');

    const token = localStorage.getItem('algetecToken');
    const currentUrl = window.location.href;
    const navigate = useNavigate();

    return {
        useState, useEffect,
        navigate, token,
        errors, setErrors,
        userData, setUserData,
        PropTypes
    };
};