//Styles
import './LoginForm.css';

//Components
import Input from '../Input';

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
        <form
            className='customLoginForm'
            onSubmit={(e) => handleSubmit(e)}

        >
            <Input
                type="text"
                placeholder="Insira seu Email"
                autoFocus={true}
                onChange={(e) => handleData(e, "email")}
            />

            <Input
                type="password"
                placeholder="Insira sua senha."
                onChange={(e) => handleData(e, "senha")}
            />

            <button>
                Login
            </button>
        </form>
    );
};
