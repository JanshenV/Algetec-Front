//Styles
import './Login.css';

//React
import { useState } from 'react';

//Components
import LoginForm from '../../components/LoginForm';


export default function Login() {
    const [loginData, setLoginData] = useState({
        nickname: '',
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
            nickname: '',
            senha: '',
        });
    };

    async function handleLoginSubmit(event) {
        event.preventDefault();
        console.log(loginData)
    };
    console.log(process.env.REACT_APP_BASE_URL)
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
