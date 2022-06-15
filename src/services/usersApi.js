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
    } catch ({ message }) {
        return { message };
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
    } catch ({ message }) {
        return { message };
    };
};

export async function UserProfile(token) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                'authorization': token
            },
        };
        const serverRequest = await fetch(`${BASE_URL}usuarios`, requestOptions);
        const { user, message } = await serverRequest.json();

        if (!serverRequest.ok) return { message };
        return { user };
    } catch ({ message }) {
        return { message };
    };
};

export async function AllUsersRequest(token) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                'authorization': token
            },
        };
        const serverRequest = await fetch(`${BASE_URL}usuarios/all`, requestOptions);
        const { allUsers, message } = await serverRequest.json();

        if (!serverRequest.ok) return { message };
        return { allUsers };
    } catch ({ message }) {
        return { message };
    };
};




