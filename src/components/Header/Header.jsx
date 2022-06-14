//Styles
import './Header.css';

//React
import { useState } from 'react';

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

    return (
        <header className='headerMainContainer'>
            <h1>{title}</h1>
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
                <span
                    className='welcomeContainer'
                >
                    Olá, {userData?.nickname ? userData?.nickname : 'Rare Beauty'}
                </span>
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
                />
            </div>
        </header>
    );
};

