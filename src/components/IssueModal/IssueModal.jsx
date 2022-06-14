//Styles
import './IssueModal.css';

//React
import { useState } from 'react';

//Props
import PropTypes from 'prop-types';

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

    async function handleIssueData(event, field) {
        const inputValue = event.target.value;

        setIssueData({
            ...issueData,
            [field]: inputValue
        });
    }


    async function handleSubmit(event) {
        event.prenvetDefault();
    };



    return (
        <div className='issueModalContainer'>

        </div>
    );
};
