//Styles
import './Header.css';

//Global Variables
import useGlobal from '../../hooks/useGlobal';

//Icons
import {
    UserCircleIcon,
    LogoutIcon
} from '@heroicons/react/solid';

//PropTypes
import PropTypes from 'prop-types';
Header.propTypes = {
    title: PropTypes.string,
};
Header.defaultProps = {
    title: "My Companie's name",
};

export default function Header({ title }) {

    const {
        useState, setUserData,
        userData, navigate,
        setErrors
    } = useGlobal();


    function handleLogout() {
        navigate('/login');
        localStorage.removeItem('algetecToken');
        setUserData('');
        setErrors('');
    };

    return (
        <header className='headerMainContainer'>
            <h1>
                {title}
            </h1>
            <div className="userProfileContainer">
                <div className='iconAndMessage'>
                    <UserCircleIcon
                        className='reactIcons'
                    />
                </div>
                <div className='welcomeContainer'>
                    Olá,
                    <span style={{ color: 'white' }}>
                        {userData?.nickname ? userData?.nickname : 'Rare Beauty'}
                    </span>
                    <br></br>
                    Nível:
                    <span style={{ color: 'white' }}>{userData?.nivel}</span>
                </div>

            </div>
            <div className='iconAndMessage'>
                <LogoutIcon
                    className='reactIcons'
                    onClick={handleLogout}
                />
            </div>
        </header>
    );
};

