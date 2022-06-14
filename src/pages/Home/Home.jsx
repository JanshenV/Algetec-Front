//Styles
import './Home.css';

//Api


//Components
import Header from '../../components/Header';

//React
import { useState, useEffect } from 'react';

export default function Home() {
    const [userData, setUserData] = useState('');

    useEffect(() => {
        async function requestUserData() {

        };
    }, []);

    return (
        <div>
            <Header
                title="Algetec"
            />
        </div>
    );
};
