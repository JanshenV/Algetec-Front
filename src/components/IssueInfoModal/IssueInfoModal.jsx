//Styles
import './IssueInfoModal.css';

//Components
import Input from '../Input';

//Global Variables
import useGlobal from '../../hooks/useGlobal';

//Props
import PropTypes from 'prop-types';
IssueInfoModal.propTypes = {
    modalInfoData: PropTypes.object,
    setIsssueInfoModal: PropTypes.func,
    setModalInfoData: PropTypes.func,
};

IssueInfoModal.defaultProps = {
    setIsssueInfoModal: () => null,
    setModalInfoData: () => null
};

export default function IssueInfoModal({
    modalInfoData, handleCloseModal, setModalInfoData
}) {
    const {
        userData, useEffect,
        useState
    } = useGlobal();

    const [possibleStatuses, setPossibleStatuses] = useState([]);

    const {
        item,
        problema,
        versao,
        prioridade,
        status,
        data,
        autor,
        atribuido
    } = modalInfoData;

    useEffect(() => {
        function handlePossibleStatuses() {
            let localStatuses = [
                'aprovado',
                'reprovado',
                'não será removido',
                'duplicado',
                'não é erro',
                'resolvido'
            ]

            if (userData.nickname === autor) {
                return setPossibleStatuses(localStatuses);
            };

            if (userData.nickname !== autor) {
                if (userData.nivel === 'qa teste' || userData.nivel === 'scrum master') {
                    return setPossibleStatuses(localStatuses);
                };
                localStatuses = [
                    'não será removido',
                    'duplicado',
                    'não é erro',
                    'resolvido'
                ];
                return setPossibleStatuses(localStatuses);
            };
        };
        handlePossibleStatuses();
    }, [userData]);

    return (
        <div className="IssueInfoModalMainContainer">
            <div className="issueInfoContainer">
                <span>Item ID: {item}</span>
                <span>Problema: {problema}</span>
                <span>Versão: {versao}</span>
                <span>Prioridade{prioridade}</span>
                <span>
                    Status:
                    <select onChange={(e) => {
                        setModalInfoData({
                            ...modalInfoData,
                            status: e.target.value
                        });
                    }}>
                        <option value="">
                            {status}
                        </option>
                        {
                            possibleStatuses.length &&
                            possibleStatuses.map((item, index) => {
                                return (
                                    <option
                                        value={item}
                                        key={index}
                                    >
                                        {item}
                                    </option>
                                );
                            })
                        }
                    </select>
                </span>
                <span>Criada em:{data}</span>
                <span>Autor: {autor}</span>
                <span>Atribuido à: {atribuido}</span>
            </div>

            <button onClick={handleCloseModal}>
                Fechar
            </button>
        </div>
    );
};

