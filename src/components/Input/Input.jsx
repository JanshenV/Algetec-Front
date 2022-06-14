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
    className: PropTypes.string
};

Input.defaultProps = {
    type: "text",
    placeholder: 'Insira Placeholder',
    autoFocus: false,
    onChange: () => null,
};

export default function Input({
    type, value, placeholder,
    autoFocus, required, onChange,
    className
}) {
    return (
        <input
            className={`customInput ${className}`}
            type={type}
            value={value}
            placeholder={placeholder}
            autoFocus={autoFocus}
            required={required}
            onChange={onChange}
        />
    );
};

