//Styles
import './Home.css';

//Api
import {
    UserProfile,
    AllUsersRequest
} from '../../services/usersApi';

//Global Variables
import useGlobal from '../../hooks/useGlobal';

//Components
import Header from '../../components/Header';
import IssueModal from '../../components/IssueModal';

export default function Home() {
    const {
        token, navigate,
        userData, setUserData,
        useState, useEffect,
        allUsers, setAllUsers
    } = useGlobal();

    const [issueModal, setIssueModal] = useState(false);
    useEffect(() => {
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

    useEffect(() => {
        async function requestAllUsers() {
            if (allUsers.length) return;
            const {
                allUsers: allUsersApi,
                message
            } = await AllUsersRequest(token);
            if (message) return alert(message);
            setAllUsers(allUsersApi);
        };
        requestAllUsers();
    }, [allUsers]);

    return (
        <div className='homeMainContainer'>
            <Header
                title="Algetec"
                userData={userData}
            />

            <div className='issuesContainer'>
                <div className="issuesFunctions">
                    <div
                        onClick={() => setIssueModal(true)}
                    >
                        Criar issue
                    </div>
                </div>

                <div className="issues">

                </div>
            </div>

            {
                issueModal &&
                <div className='modalContainer'>
                    <IssueModal
                        setIssueModal={setIssueModal}
                        token={token}
                        allUsers={allUsers}
                    />
                </div>
            }
        </div>
    );
};
