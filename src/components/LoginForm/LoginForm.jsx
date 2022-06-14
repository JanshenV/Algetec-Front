//Styles
import './LoginForm.css';

//Components
import Input from '../Input/Input';

//Props
import PropTypes from 'prop-types';
LoginForm.propTypes = {
    handleLoginData: PropTypes.func,
    handleSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
    handleLoginData: () => null,
    handleSubmit: () => null,
};

export default function LoginForm({
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
                type="password"
                placeholder="Escolha uma senha."
                required
                onChange={(e) => handleData(e, "senha")}
            />

            <button>
                Login
            </button>
        </form>
    );
};
