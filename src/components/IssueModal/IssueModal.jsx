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

    return (
        <div className='issueModalContainer'>
            <IssueForm
                handleSubmit={handleSubmit}
                handleData={handleIssueData}
                errors={errors}
            />
        </div>
    );
};
