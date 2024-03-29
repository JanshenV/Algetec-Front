//Styles
import './SignUp.css';

//Global Variables
import useGlobal from '../../hooks/useGlobal';

//Components
import SignUpForm from '../../components/SignUpForm';

//Api
import { UserSignUp } from '../../services/usersApi';

export default function SignUp() {
    const {
        token, navigate,
        useState, useEffect,
        errors, setErrors
    } = useGlobal();

    const [signUpData, setSignUpData] = useState({
        nickname: '',
        email: '',
        senha: '',
        nivel: ''
    });
    const [signUpComplete, setSignUpComplete] = useState(false);

    const levels = [
        'QA Tester',
        'Scrum Master',
        'Developer'
    ];

    useEffect(() => {
        function checkToken() {
            if (token) return navigate('/home');
        };
        checkToken();
    }, []);

    useEffect(() => {
        function handleRedirect() {
            if (!signUpComplete) return;
            setTimeout(() => navigate('/login'), 3000);
        };
        handleRedirect();
    }, [signUpComplete]);

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
        setSignUpComplete(true);
        handleClearAll();
    };

    return (
        <div className='mainSignUpContainer'>
            {
                errors &&
                <span className='errorSpan'>
                    {errors}
                </span>
            }
            {
                signUpComplete ?
                    <h1 >
                        Cadastro Realizado com sucesso!
                    </h1> :
                    <div className="formSignUpContainer">
                        <h2>Cadastre-se</h2>
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
            }
        </div>
    );
};

