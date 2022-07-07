const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function CreateIssue(IssueData, token) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'authorization': token
            },
            body: JSON.stringify(IssueData)
        };
        const serverRequest = await fetch(`${BASE_URL}issues`, requestOptions);
        const { issue, message } = await serverRequest.json();
        if (!serverRequest.ok) return { message };

        return { issue };
    } catch ({ message }) {
        return { message };
    };
};

export async function GetAllIssues(token) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                'authorization': token
            },
        };
        const serverRequest = await fetch(`${BASE_URL}issues/all`, requestOptions);
        const { allIssues, message } = await serverRequest.json();
        if (!serverRequest.ok) return { message };

        return { allIssues };
    } catch ({ message }) {
        return { message };
    };
};

export async function EditIssue(status, id, token) {
    try {
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'Application/json',
                'authorization': token
            },
            body: JSON.stringify({ status })
        };
        const serverRequest = await fetch(`${BASE_URL}issues/${id}`, requestOptions);
        const { issue, message } = await serverRequest.json();
        if (!serverRequest.ok) return { message };

        return { issue };
    } catch ({ message }) {
        return { message };
    };
};

export async function DeleteMultiple(arrayToDelete, token) {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'Application/json',
                'authorization': token
            },
            body: JSON.stringify({ arrayToDelete })
        };
        const serverRequest = await fetch(`${BASE_URL}multiple/issues`, requestOptions);
        const { message } = await serverRequest.json();

        return { message };
    } catch ({ message }) {
        return { message };
    };
};