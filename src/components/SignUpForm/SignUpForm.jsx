//Styles
import './SignUpForm.css';

//Components
import Input from '../Input/Input';

//Props
import PropTypes from 'prop-types';
SignUpForm.propTypes = {
    handleLoginData: PropTypes.func,
    handleSubmit: PropTypes.func,
    levels: PropTypes.arrayOf(PropTypes.string)
};

SignUpForm.defaultProps = {
    handleLoginData: () => null,
    handleSubmit: () => null,
    levels: []
};

export default function SignUpForm({
    handleData, handleSubmit, levels
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

            <select
                onChange={(e) => handleData(e, "level")}
                required
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
                Cadastrar
            </button>
        </form>
    );
};
