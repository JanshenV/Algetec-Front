const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function UserSignUp(UserData) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(UserData)
        };
        const serverRequest = await fetch(`${BASE_URL}usuarios/signup`, requestOptions);
        const { message } = await serverRequest.json();

        return { message };
    } catch (error) {
        return error;
    };
};

export async function UserLogin(UserData) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(UserData)
        };
        const serverRequest = await fetch(`${BASE_URL}usuarios/login`, requestOptions);
        const { message, token } = await serverRequest.json();

        if (!serverRequest.ok) return { message };

        return { token };
    } catch (error) {
        return error;
    };
};




