//Styles
import './Header.css';

//Icons
import {
    UserCircleIcon,
    LogoutIcon
} from '@heroicons/react/solid';

export default function Header({
    title, username
}) {
    return (
        <header className='headerMainContainer'>
            <h1>{title}</h1>
            <div className="userProfileContainer">
                <UserCircleIcon className='reactIcons' />
                <span className='welcomeContainer'>
                    Olá, {username ? username : 'Rare Beauty'}
                </span>
            </div>
            <LogoutIcon className='reactIcons' />
        </header>
    );
};

