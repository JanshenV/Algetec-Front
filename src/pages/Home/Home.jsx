//Styles
import './Home.css';

//Api
import { UserProfile } from '../../services/api';

//Components
import Header from '../../components/Header';

//React
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [userData, setUserData] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('algetecToken');
        if (!token) return navigate('/login');

        async function requestUserData() {
            const { user, message } = await UserProfile(token);

            if (message) {
                if (message.includes('jwt malformed') || message.includes('jwt expired')) return navigate('/login');
            };

            setUserData(user);
        };
        requestUserData();
    }, [userData]);

    return (
        <div>
            <Header
                title="Algetec"
            />
        </div>
    );
};
