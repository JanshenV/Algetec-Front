//Styles
import './Header.css';

//Icons
import {
    UserCircleIcon,
    LogoutIcon
} from '@heroicons/react/solid';

export default function Header({
    title, userData
}) {
    return (
        <header className='headerMainContainer'>
            <h1>{title}</h1>
            <div className="userProfileContainer">
                <UserCircleIcon className='reactIcons' />
                <span className='welcomeContainer'>
                    Olá, {userData?.nickname ? userData?.nickname : 'Rare Beauty'}
                </span>
            </div>
            <LogoutIcon className='reactIcons' />
        </header>
    );
};

