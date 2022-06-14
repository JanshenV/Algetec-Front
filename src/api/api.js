const BASE_URL = process.env.REACT_APP_BASE_URL;

async function UserSignUp(UserData) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(UserData)
        };
        const serverRequest = await fetch(`${BASE_URL}/usuarios`, requestOptions);
        const { message } = await serverRequest.json();

        return { message };
    } catch (error) {
        return error;
    };
};


