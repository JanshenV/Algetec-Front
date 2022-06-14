//Styles
import './Header.css';

//React
import { useState } from 'react';
import { useNavigate } from 'react-router';

//Icons
import {
    UserCircleIcon,
    LogoutIcon
} from '@heroicons/react/solid';

export default function Header({
    title, userData
}) {

    const [onHover, setOnHover] = useState({
        profile: false,
        logout: false
    });

    const navigate = useNavigate();

    function handleOnHover(field) {
        if (field === 'profile') {
            const localProfile = onHover.profile;
            setOnHover({
                ...onHover,
                [field]: !localProfile
            });
            return;
        };
        if (field === 'logout') {
            const localLogout = onHover.logout;
            setOnHover({
                ...onHover,
                [field]: !localLogout
            });
            return;
        };
    };

    function handleLogout() {
        localStorage.removeItem('algetecToken');
        navigate('/login');
    };

    return (
        <header className='headerMainContainer'>
            <h1>
                {title}
            </h1>
            <div className="userProfileContainer">
                <div className='iconAndMessage'>
                    {
                        onHover.profile &&
                        <span>
                            Edite seu perfil.
                        </span>
                    }
                    <UserCircleIcon
                        className='reactIcons'
                        onMouseEnter={() => handleOnHover("profile")}
                        onMouseLeave={() => handleOnHover("profile")}
                    />
                </div>
                <div className='welcomeContainer'>
                    Olá,
                    <span style={{ color: 'white' }}>
                        {userData?.nickname ? userData?.nickname : 'Rare Beauty'}
                    </span>
                    <br></br>
                    Nível:
                    <span style={{ color: 'white' }}>{userData.nivel}</span>
                </div>

            </div>
            <div className='iconAndMessage'>
                {
                    onHover.logout &&
                    <span>
                        Logout.
                    </span>
                }
                <LogoutIcon
                    className='reactIcons'
                    onMouseEnter={() => handleOnHover("logout")}
                    onMouseLeave={() => handleOnHover("logout")}
                    onClick={handleLogout}
                />
            </div>
        </header>
    );
};

