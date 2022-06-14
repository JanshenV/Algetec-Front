//Styles
import './IssueModal.css';

//React
import { useState } from 'react';

//Components
import IssueForm from '../IssueForm';

//Props
import PropTypes from 'prop-types';
IssueModal.propTypes = {
    setIssueModal: PropTypes.func
};

IssueModal.defaultProps = {
    setIssueModal: () => null
};


export default function IssueModal({
    setIssueModal
}) {
    const [issueData, setIssueData] = useState({
        problema: '',
        versao: '',
        descricao: '',
        prioridade: '',
        status: ''
    });

    const [errors, setErrors] = useState('');
    const [issueComplete, setIssueComplete] = useState(false);

    async function handleIssueData(event, field) {
        const inputValue = event.target.value;

        setIssueData({
            ...issueData,
            [field]: inputValue
        });
    };

    async function handleSubmit(event) {
        event.prenvetDefault();
    };

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

    return (
        <div className='issueModalMainContainer'>
            <div className="formIssueContainer">
                <h2>Cadastre uma Issue</h2>
                <IssueForm
                    handleSubmit={handleSubmit}
                    handleData={handleIssueData}
                    errors={errors}
                />
                <button
                    onClick={handleCloseModal}
                    className="buttonCloseModal"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};
