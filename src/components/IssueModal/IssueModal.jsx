//Styles
import './IssueModal.css';

//Global Variables
import useGlobal from '../../hooks/useGlobal';

//Components
import IssueForm from '../IssueForm';

//Api
import { CreateIssue } from '../../services/issuesApi';

//Props
import PropTypes from 'prop-types';
IssueModal.propTypes = {
    setIssueModal: PropTypes.func,
    allUsers: PropTypes.array
};

IssueModal.defaultProps = {
    setIssueModal: () => null,
    allUsers: []
};


export default function IssueModal({
    setIssueModal, allUsers
}) {
    const {
        useState, useEffect,
        token,
        errors, setErrors
    } = useGlobal();

    const [issueData, setIssueData] = useState({
        problema: '',
        versao: '',
        descricao: '',
        prioridade: '',
        status: ''
    });

    const statuses = [
        'Aprovado',
        'Reprovado',
        'Novo',
        'Não será removido',
        'Duplicado',
        'Não é erro',
        'Resolvido'
    ];

    const [issueComplete, setIssueComplete] = useState(false);

    console.log(allUsers);

    useEffect(() => {
        function handleRedirect() {
            if (!issueComplete) return;
            setTimeout(() => handleCloseModal(), 3000);
        };
        handleRedirect();
    }, [issueComplete]);

    function handleCloseModal() {
        setIssueData({
            problema: '',
            versao: '',
            descricao: '',
            prioridade: '',
            status: ''
        });
        setErrors('');
        setIssueModal(false);
    };

    async function handleIssueData(event, field) {
        const inputValue = event.target.value;
        setErrors('');

        setIssueData({
            ...issueData,
            [field]: inputValue
        });
    };

    async function handleSubmit(event) {
        event.preventDefault();

        const { issue, message } = await CreateIssue(issueData, token);
        if (message) return setErrors(message);
        setIssueComplete(true);
    };

    return (
        <div className='issueModalMainContainer'>
            <div className="formIssueContainer">
                {
                    issueComplete ?
                        <h2>Issue cadastrada com sucesso!</h2>
                        :
                        <>
                            <h2>Cadastre uma Issue</h2>
                            {errors &&
                                <span className='error'>
                                    {errors}
                                </span>
                            }
                            <IssueForm
                                handleSubmit={handleSubmit}
                                handleData={handleIssueData}
                                errors={errors}
                                statuses={statuses}
                            />
                            <button
                                onClick={handleCloseModal}
                                className="buttonCloseModal"
                            >
                                Cancelar
                            </button>
                        </>
                }
            </div>
        </div>
    );
};
