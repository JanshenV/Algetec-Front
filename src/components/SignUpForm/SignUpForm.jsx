//Styles
import './SignUpForm.css';

//Components
import Input from '../Input/Input';

//Props
import PropTypes from 'prop-types';
SignUpForm.propTypes = {
    handleLoginData: PropTypes.func,
    handleSubmit: PropTypes.func,
};

SignUpForm.defaultProps = {
    handleLoginData: () => null,
    handleSubmit: () => null,
};

export default function SignUpForm({
    handleData, handleSubmit
}) {
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Input
                type="text"
                placeholder="Escolha seu Nickname"
                autoFocus={true}
                required={true}
                onChange={(e) => handleData(e, "nickname")}
            />

            <Input
                type="text"
                placeholder="Insira seu email."
                required={true}
                onChange={(e) => handleData(e, "email")}
            />

            <Input
                type="password"
                placeholder="Escolha uma senha."
                required
                onChange={(e) => handleData(e, "senha")}
            />

            <button>
                Cadastrar
            </button>
        </form>
    );
};
