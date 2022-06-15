//Styles
import './Home.css';

//Libs
import dateFormat from 'dateformat';

//Api
import {
    UserProfile,
    AllUsersRequest,
} from '../../services/usersApi';
import {
    GetAllIssues,
    EditIssue
} from '../../services/issuesApi';

//Global Variables
import useGlobal from '../../hooks/useGlobal';

//Components
import Header from '../../components/Header';
import IssueInfoModal from '../../components/IssueInfoModal';

export default function Home() {
    const {
        token, navigate,
        userData, setUserData,
        useState, useEffect,
        allUsers, setAllUsers,
        allIssues, setAllIssues
    } = useGlobal();

    const [issueModal, setIssueModal] = useState(false);
    const [isssueInfoModal, setIsssueInfoModal] = useState(false);
    const [modalInfoData, setModalInfoData] = useState({
        item: '',
        problema: '',
        versao: '',
        prioridade: '',
        status: '',
        data: '',
        autor: '',
        atribuido: ''
    });

    async function handleModalInfoData(item, data) {
        setIsssueInfoModal(true);
        setModalInfoData({
            item: item.issue_id,
            problema: item.problema,
            versao: item.versao,
            prioridade: item.prioridade,
            status: item.status,
            data,
            autor: item.autor,
            atribuido: item.atribuido.nickname
        });
    };

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

    useEffect(() => {
        async function requestAllIssues() {
            const {
                allIssues: allIssuesApi,
                message
            } = await GetAllIssues(token);
            if (message) return console.log(message);
            const localAllIssues = allIssuesApi.sort((a, b) => a.issue_id - b.issue_id);
            setAllIssues(localAllIssues);
        };
        requestAllIssues();
    }, [allIssues, modalInfoData.status]);

    useEffect(() => {
        async function handleStatusEdit() {
            if (!modalInfoData.status || !modalInfoData.item) return;
            const {
                issue: issueApi,
                message
            } = await EditIssue(
                modalInfoData.status,
                modalInfoData.item,
                token);
            if (message) return console.log(message);
        };

        handleStatusEdit();
    }, [modalInfoData]);

    function handleCloseInfoModal() {
        setIsssueInfoModal(false);
        setModalInfoData({
            item: '',
            problema: '',
            versao: '',
            prioridade: '',
            status: '',
            data: '',
            autor: '',
            atribuido: ''
        });
    };

    return (
        <div className='homeMainContainer'>
            <Header
                title="Algetec"
                userData={userData}
            />

            <div className='issuesContainer'>
                <div className="issuesFunctions">
                    <div onClick={() => setIssueModal(true)}>
                        Criar issue
                    </div>
                </div>

                <div className="issuesHeader">
                    <ul>
                        <li>Item</li>
                        <li>Problema</li>
                        <li>Versão</li>
                        <li>Descrição</li>
                        <li>Prioridade</li>
                        <li>Status</li>
                        <li>Data</li>
                        <li>Autor</li>
                        <li>Atribuida à</li>
                    </ul>
                </div>

                {
                    allIssues.length &&
                    allIssues.map((item, index) => {
                        let data = dateFormat(item.data, 'dd/mm/yyyy');
                        return (
                            <div
                                className="issues"
                                key={index}
                                onClick={() => handleModalInfoData(item, data)}
                            >
                                <ul>
                                    <li>{item.issue_id}</li>
                                    <li>{item.problema}</li>
                                    <li>{item.versao}</li>
                                    <li>{item.descricao}</li>
                                    <li>{item.prioridade}</li>
                                    <li>{item.status}</li>
                                    <li>{data}</li>
                                    <li>{item.autor}</li>
                                    <li>{item.atribuido.nickname}</li>
                                </ul>
                            </div>
                        );
                    })
                }
            </div>

            {
                issueModal &&
                <div className='modalContainer'>
                    <IssueModal
                        setIssueModal={setIssueModal}
                        token={token}
                    />
                </div>
            }

            {
                isssueInfoModal &&
                <IssueInfoModal
                    modalInfoData={modalInfoData}
                    handleCloseModal={handleCloseInfoModal}
                    setModalInfoData={setModalInfoData}
                />
            }
        </div>
    );
};
