//Styles
import './Header.css';

//Icons
import { UserCircleIcon } from '@heroicons/react/solid';

export default function Header({
    title,
}) {
    return (
        <header className='headerMainContainer'>
            <h1>{title}</h1>
            <UserCircleIcon className='userIcon' />
        </header>
    );
};

