//Styles
import './IssueForm.css';

//Components
import Input from '../Input';

//React
import { useState, useEffect } from 'react';

//PropTypes
import PropTypes from 'prop-types';
IssueForm.propTypes = {
    handleSubmit: PropTypes.func,
    handleData: PropTypes.func,
    errors: PropTypes.string,
    statuses: PropTypes.arrayOf(PropTypes.string)
};
IssueForm.defaultProps = {
    handleSubmit: () => null,
    handleData: () => null,
    statuses: []
};

export default function IssueForm({
    handleSubmit, handleData, errors,
    statuses
}) {

    const [inputsError, setInputsError] = useState({
        prioridade: false,
        descricao: false,
        versao: false,
        problema: false,
    });

    useEffect(() => {
        function handleErrors() {
            const localErrors = errors;
            if (!errors) return setInputsError({
                nickname: false,
                email: false,
                senha: false,
                nivel: false
            });

            if (localErrors.includes('prioridade')) return setInputsError({
                ...inputsError,
                prioridade: true
            });

            if (localErrors.includes('descricao')) return setInputsError({
                ...inputsError,
                descricao: true
            });

            if (localErrors.includes('versao')) return setInputsError({
                ...inputsError,
                versao: true
            });

            if (localErrors.includes('problema')) return setInputsError({
                ...inputsError,
                problema: true
            });
        };
        handleErrors();
    }, [errors]);

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className="customIssueForm"
        >
            <Input
                type="text"
                placeholder="Prioridade"
                autoFocus={true}
                onChange={(e) => handleData(e, "prioridade")}
                className={inputsError.prioridade ? 'error' : ''}
            />
            <Input
                type="text"
                placeholder="Descrição"
                onChange={(e) => handleData(e, "descricao")}
                className={inputsError.descricao ? 'error' : ''}
            />

            <Input
                type="text"
                placeholder="Versão"
                onChange={(e) => handleData(e, "versao")}
                className={inputsError.versao ? 'error' : ''}
            />

            <Input
                type="text"
                placeholder="Problema"
                onChange={(e) => handleData(e, "problema")}
                className={inputsError.problema ? 'error' : ''}
            />

            <select
                className='statusSelect'
                onChange={(e) => handleData(e, "status")}
            >
                <option value="">
                    Selecione Status
                </option>
                {
                    statuses.length &&
                    statuses.map((option, index) => {
                        return (
                            <option
                                value={option}
                                key={index}
                            >
                                {option}
                            </option>
                        );
                    })
                }
            </select>

            <button>
                Confirmar
            </button>
        </form>
    );
};