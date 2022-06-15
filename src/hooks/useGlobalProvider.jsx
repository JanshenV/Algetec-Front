import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useGlobalProvider() {
    const [error, setError] = useState({
        message: ''
    });

    const token = localStorage.getItem('algetecToken');

    const [userData, setUserData] = useState({});

    const currentUrl = window.location.href;
    const navigate = useNavigate();

    return {
        useState, useEffect,
        navigate, token,
    };
};