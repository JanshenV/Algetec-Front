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