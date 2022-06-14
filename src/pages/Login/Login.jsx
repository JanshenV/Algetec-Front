//Styles
import './Login.css';

//React
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Components
import LoginForm from '../../components/LoginForm';

//Api
import { UserLogin } from '../../services/api';


export default function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        senha: '',
    });
    const [errors, setErrors] = useState('');

    const token = localStorage.getItem('algetecToken');
    const navigate = useNavigate();

    useEffect(() => {
        function checkToken() {
            if (token) return navigate('/home');
        };
        checkToken();
    }, []);

    async function handleLoginData(event, field) {
        const inputValue = event.target.value;
        setErrors('');

        setLoginData({
            ...loginData,
            [field]: inputValue
        });
    };

    async function handleClearAll() {
        setLoginData({
            email: '',
            senha: '',
        });
        setErrors('');
    };

    async function handleLoginSubmit(event) {
        event.preventDefault();
        const { token, message } = await UserLogin(loginData);

        if (message) return setErrors(message);

        localStorage.setItem('algetecToken', token);
        handleClearAll();
        navigate('/home');
    };

    return (
        <div className='mainLoginContainer'>
            <div className="formLoginContainer">
                <h2>
                    Faça seu login
                </h2>
                {
                    errors &&
                    <span className='error'>
                        {errors}
                    </span>
                }
                <LoginForm
                    handleData={handleLoginData}
                    handleSubmit={handleLoginSubmit}
                />

                Não tem cadastro ?
                <span
                    className='signupSpan'
                    onClick={() => navigate('/signup')}
                >
                    Cadastre-se.
                </span>
            </div>
        </div>
    );
};
