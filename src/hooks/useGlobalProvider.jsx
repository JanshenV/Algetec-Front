//React
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useGlobalProvider() {
    const [errors, setErrors] = useState('');
    const [userData, setUserData] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [allIssues, setAllIssues] = useState([]);
    const [tokenError, setTokenError] = useState('');

    const token = localStorage.getItem('algetecToken');
    const navigate = useNavigate();

    return {
        useState, useEffect,
        navigate, token,
        errors, setErrors,
        userData, setUserData,
        allUsers, setAllUsers,
        allIssues, setAllIssues,
        tokenError, setTokenError
    };
};