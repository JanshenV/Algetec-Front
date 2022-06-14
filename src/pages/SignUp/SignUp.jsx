//Styles
import './SignUp.css';

//React
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Components
import SignUpForm from '../../components/SignUpForm';

//Api
import { UserSignUp } from '../../services/api';

export default function SignUp() {
    const [signUpData, setSignUpData] = useState({
        nickname: '',
        email: '',
        senha: '',
        nivel: ''
    });

    const levels = [
        'QA Tester',
        'Scrum Master',
        'Developer'
    ];

    const navigate = useNavigate();

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
            nivel: ''
        });
    };

    async function handleSignUpSubmit(event) {
        event.preventDefault();

        const { message } = await UserSignUp(signUpData);
    };

    return (
        <div className='mainLoginContainer'>
            <div className="formLoginContainer">
                <SignUpForm
                    handleData={handleSignUpData}
                    handleSubmit={handleSignUpSubmit}
                    levels={levels}
                />
                <span
                    onClick={() => navigate('/login')}
                    style={{ cursor: 'pointer' }}
                >
                    Página de login.
                </span>
            </div>
        </div>
    );
};

