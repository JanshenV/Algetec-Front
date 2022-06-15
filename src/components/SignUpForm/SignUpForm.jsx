//Styles
import './SignUpForm.css';

//Components
import Input from '../Input/Input';

//Global Variables
import useGlobal from '../../hooks/useGlobal';

//Props
import PropTypes from 'prop-types';
SignUpForm.propTypes = {
    handleLoginData: PropTypes.func,
    handleSubmit: PropTypes.func,
    levels: PropTypes.arrayOf(PropTypes.string),
    errors: PropTypes.string
};

SignUpForm.defaultProps = {
    handleLoginData: () => null,
    handleSubmit: () => null,
    levels: []
};

export default function SignUpForm({
    handleData, handleSubmit, levels,
    errors
}) {
    const {
        useState, useEffect,
    } = useGlobal();

    const [inputsError, setInputsError] = useState({
        nickname: false,
        email: false,
        senha: false,
        nivel: false
    });

    useEffect(() => {
        function handleErrors() {
            const localErrors = errors;
            if (!errors) return setInputsError({
                nickname: false,
                email: false,
                senha: false,
                nivel: false
            });

            if (localErrors.includes('nickname')) return setInputsError({
                ...inputsError,
                nickname: true
            });

            if (localErrors.includes('email')) return setInputsError({
                ...inputsError,
                email: true
            });

            if (localErrors.includes('senha')) return setInputsError({
                ...inputsError,
                senha: true
            });

            if (localErrors.includes('nivel')) return setInputsError({
                ...inputsError,
                nivel: true
            });
        };
        handleErrors();
    }, [errors]);


    return (
        <form
            className='customSignUpForm'
            onSubmit={(e) => handleSubmit(e)}
        >
            <Input
                type="text"
                placeholder="Escolha seu Nickname"
                autoFocus={true}
                onChange={(e) => handleData(e, "nickname")}
                className={inputsError.nickname ? 'error' : ''}
            />

            <Input
                type="text"
                placeholder="Insira seu email."
                onChange={(e) => handleData(e, "email")}
                className={inputsError.email ? 'error' : ''}
            />

            <Input
                type="password"
                placeholder="Escolha uma senha."
                onChange={(e) => handleData(e, "senha")}
                className={inputsError.senha ? 'error' : ''}
            />

            <select
                className={`levelSelection ${inputsError.nivel ? 'error' : ''}`}
                onChange={(e) => handleData(e, "nivel")}
            >
                <option value="">
                    Selecione sua função
                </option>
                {
                    levels.map((option, index) => {
                        return (
                            <option
                                value={option}
                                key={index}
                            >
                                {option}
                            </option>
                        );
                    })
                }
            </select>

            <button>
                Confirmar
            </button>
        </form>
    );
};
