//Styles
import './SignUp.css';

//React
import { useState } from 'react';

//Components
import SignUpForm from '../../components/SignUpForm';

export default function SignUp() {
    const [signUpData, setSignUpData] = useState({
        nickname: '',
        email: '',
        senha: ''
    });

    async function handleSignUpData(event, field) {
        const inputValue = event.target.value;

        setSignUpData({
            ...signUpData,
            [field]: inputValue
        });
    };

    async function handleClearAll() {
        setSignUpData({
            nickname: '',
            email: '',
            senha: ''
        });
    };

    async function handleSignUpSubmit(event) {
        event.preventDefault();
    };

    return (
        <div className='mainLoginContainer'>
            <div className="formLoginContainer">
                <SignUpForm
                    handleData={handleSignUpData}
                    handleSubmit={handleSignUpSubmit}
                />
            </div>
        </div>
    );
};

