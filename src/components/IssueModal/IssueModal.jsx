//Styles
import './IssueModal.css';

//React
import { useState } from 'react';

//Props
import PropTypes from 'prop-types';

//Components
import IssueForm from '../IssueForm';

export default function IssueModal({

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
