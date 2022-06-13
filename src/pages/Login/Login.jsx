//Styles
import './Login.css';

//React
import { useState } from 'react';

export default function Login() {
    const [loginData, setLoginData] = useState({
        nickname: '',
        senha: ''
    });

    async function handleLoginData(event, field) {
        const inputValue = event.target.value;

        setLoginData({
            ...loginData,
            [field]: inputValue
        });
    };

    async function handleSubmit(event) {
        event.preventDefault();
    };

    return (
        <div className='mainLoginContainer'>
            <div className="formLoginContainer">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                        type={"type"}
                        placeholder={'placeholder'}
                        onFocus={true}
                        onChange={(e) => handleLoginData(e, "nickname")}
                    />

                    <input
                        type={"type"}
                        placeholder={'placeholder'}
                        onFocus={true}
                        onChange={(e) => handleLoginData(e, "senha")}
                    />

                    <button>
                        {'ButtonTextLogin'}
                    </button>
                </form>
            </div>
        </div>
    );
};
