//Styles
import './Login.css';

//React
import { useState } from 'react';
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
    const navigate = useNavigate();

    async function handleLoginData(event, field) {
        const inputValue = event.target.value;

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
    };

    async function handleLoginSubmit(event) {
        event.preventDefault();
        const { token, message } = await UserLogin(loginData);

        if (message) return alert(message);

        localStorage.setItem('algetecToken', token);
        handleClearAll();
        navigate('/home');
    };

    return (
        <div className='mainLoginContainer'>
            <div className="formLoginContainer">
                <LoginForm
                    handleData={handleLoginData}
                    handleSubmit={handleLoginSubmit}
                />
                <span
                    onClick={() => navigate('/signup')}
                    style={{ cursor: 'pointer' }}
                >
                    Cadastre-se.
                </span>
            </div>
        </div>
    );
};
