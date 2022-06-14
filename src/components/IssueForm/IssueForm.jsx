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
    errors: PropTypes.string
};
IssueForm.defaultProps = {
    handleSubmit: () => null,
    handleData: () => null
};

export default function IssueForm({
    handleSubmit, handleData, errors
}) {

    const [inputsError, setInputsError] = useState({
        prioridade: false,
        descricao: false,
        versao: false,
        problema: false,
        status: false
    });

    const status = [
        'Aprovado',
        'Reprovado',
        'Novo',
        'Não será removido',
        'Duplicado',
        'Não é erro',
        'Resolvido'
    ];

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

            if (localErrors.includes('status')) return setInputsError({
                ...inputsError,
                status: true
            });
        };
        handleErrors();
    }, [errors]);

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
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
                className={`statusSelection ${inputsError.status ? 'error' : ''}`}
                onChange={(e) => handleData(e, "status")}
            >
                <option value="">
                    Selecione o Status
                </option>
                {
                    status.length &&
                    status.map((option, index) => {
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