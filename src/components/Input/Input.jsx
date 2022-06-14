//Styles
import './Input.css';

//Props
import PropTypes from 'prop-types';
Input.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    required: PropTypes.bool,
    onChange: PropTypes.func,
};

Input.defaultProps = {
    type: "text",
    placeholder: 'Insira Placeholder',
    autoFocus: false,
    onChange: () => null,
};

export default function Input({
    type, value, placeholder,
    autoFocus, required, onChange
}) {
    return (
        <input
            className='customInput'
            type={type}
            value={value}
            placeholder={placeholder}
            autoFocus={autoFocus}
            required={required}
            onChange={onChange}
        />
    );
};

