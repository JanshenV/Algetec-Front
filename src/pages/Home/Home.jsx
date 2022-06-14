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

        if (userData) return;
        async function requestUserData() {
            const { user, message } = await UserProfile(token);

            if (message) {
                alert('Token expirado, faça login novamente.');
                localStorage.removeItem('algetecToken');
                if (message.includes('jwt malformed') || message.includes('jwt expired')) return navigate('/login');
            };

            setUserData({ ...user });
        };
        requestUserData();
    }, [userData]);

    return (
        <div className='homeMainContainer'>
            <Header
                title="Algetec"
                userData={userData}
            />

            <div className='issuesContainer'>
                <div className="issuesFunctions">
                    <div>
                        Criar issue
                    </div>
                </div>

                <div className="issues">

                </div>
            </div>

        </div>
    );
};
