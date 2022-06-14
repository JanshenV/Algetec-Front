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
        senha: '',
        level: ''
    });


    const levels = [
        'QA Tester',
        'Scrum Master',
        'Developer'
    ];

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
            senha: '',
            level: ''
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
                    levels={levels}
                />
            </div>
        </div>
    );
};

