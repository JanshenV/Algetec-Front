//Styles
import './Login.css';

//React
import { useState } from 'react';

//Components
import LoginForm from '../../components/LoginForm';

//Api
import { UserLogin } from '../../services/api';


export default function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        senha: '',
    });

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

        if (message) return console.log(message);
        if (token) return console.log(token);
    };
    return (
        <div className='mainLoginContainer'>
            <div className="formLoginContainer">
                <LoginForm
                    handleData={handleLoginData}
                    handleSubmit={handleLoginSubmit}
                />
            </div>
        </div>
    );
};
