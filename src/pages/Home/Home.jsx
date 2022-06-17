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
    EditIssue,
    DeleteMultiple
} from '../../services/issuesApi';

//Global Variables
import useGlobal from '../../hooks/useGlobal';

//Components
import Header from '../../components/Header';
import IssueModal from '../../components/IssueModal';
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
    const [multipleIssues, setMultipleIssues] = useState([]);
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

    async function handleModalInfoData(e, item, data) {
        e.stopPropagation();
        if (e.target.className !== 'issues') return;

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
                if (message === 'jwt malformed' ||
                    message === 'jwt expired')
                    return navigate('/login');
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
            let localAllIssues = allIssuesApi.sort((a, b) => a.issue_id - b.issue_id);
            setAllIssues([...localAllIssues]);
        };
        requestAllIssues();
    }, [allIssues]);

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

    function sortById() {
        let localAllIssues = [...allIssues];
        const lastIndex = localAllIssues.length - 1;

        if (localAllIssues[lastIndex].issue_id > localAllIssues[0].issue_id) {
            localAllIssues = localAllIssues.sort(({ issue_id: issueA }, { issue_id: issueB }) => issueB - issueA);
        } else {
            localAllIssues = localAllIssues.sort(({ issue_id: issueA }, { issue_id: issueB }) => issueA - issueB);
        };

        setAllIssues(localAllIssues);
    };



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

    async function handleArrayMultipleIssues(e) {
        const issueId = e.target.value;
        if (!issueId) return;
        let localMultipleIssues = multipleIssues;
        const findExistingIssue = localMultipleIssues.find(id => id === issueId);

        if (findExistingIssue) {
            localMultipleIssues = localMultipleIssues.filter(id => id !== issueId);
            setMultipleIssues([...localMultipleIssues]);
            return;
        };

        localMultipleIssues.push(issueId);
        setMultipleIssues([...localMultipleIssues]);
    };

    async function handleDeleteMultipleIssues() {
        const { message } = await DeleteMultiple(multipleIssues, token);
        if (message) return console.log(message);
        setMultipleIssues([]);
    };

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
                        className="createIssue"
                    >
                        Criar issue
                    </div>
                    <div
                        onClick={handleDeleteMultipleIssues}
                        className="deleteMultipleIssues"
                    >
                        Deletar Selecionadas
                    </div>
                </div>

                <div className="issuesHeader">
                    <ul>
                        <li onClick={() => sortById()}>
                            Item
                        </li>
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
                                onClick={(e) => handleModalInfoData(e, item, data)}
                            >
                                <div className='checkboxIssue'>
                                    <input
                                        type="checkbox"
                                        value={item.issue_id}
                                        onChange={(e) => handleArrayMultipleIssues(e)}
                                    />
                                </div>
                                <div>{item.issue_id}</div>
                                <div>{item.problema}</div>
                                <div>{item.versao}</div>
                                <div>{item.descricao}</div>
                                <div>{item.prioridade}</div>
                                <div>{item.status}</div>
                                <div>{data}</div>
                                <div>{item.autor}</div>
                                <div>{item.atribuido.nickname}</div>
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
