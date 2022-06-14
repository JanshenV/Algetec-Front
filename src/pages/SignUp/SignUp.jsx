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

    const [errors, setErrors] = useState('');

    const levels = [
        'QA Tester',
        'Scrum Master',
        'Developer'
    ];

    const navigate = useNavigate();

    async function handleSignUpData(event, field) {
        const inputValue = event.target.value;
        setErrors('');

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
        setErrors('');
    };

    async function handleSignUpSubmit(event) {
        event.preventDefault();

        const { message } = await UserSignUp(signUpData);

        if (!message.includes('sucesso')) return setErrors(message);
        handleClearAll();
    };

    return (
        <div className='mainSignUpContainer'>
            <h2>Cadastre-se</h2>
            {
                errors &&
                <span className='errorSpan'>
                    {errors}
                </span>
            }
            <div className="formSignUpContainer">
                <SignUpForm
                    handleData={handleSignUpData}
                    handleSubmit={handleSignUpSubmit}
                    errors={errors}
                    levels={levels}
                />
                Já tem cadastro ?
                <span
                    onClick={() => navigate('/login')}
                >
                    Página de login.
                </span>
            </div>
        </div>
    );
};

