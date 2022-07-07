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
                <div>
                    <span>Item ID: </span>
                    <span>{item}</span>
                </div>
                <div>
                    <span>Problema:  </span>
                    <span>{problema}</span>
                </div>
                <div>
                    <span>Versão: </span>
                    <span>{versao}</span>
                </div>
                <div>
                    <span>Prioridade: </span>
                    <span>{prioridade}</span>
                </div>
                <div>
                    Status:
                    <select
                        onChange={(e) => {
                        setModalInfoData({
                            ...modalInfoData,
                            status: e.target.value
                        });
                    }}>
                        {
                            possibleStatuses.length &&
                            possibleStatuses.map((item, index) => {
                                return (
                                    <option
                                        value={item}
                                        selected={item === modalInfoData.status ? true : false}
                                        key={index}
                                    >
                                        {item}
                                    </option>
                                );
                            })
                        }
                    </select>
                </div>
                <div>
                    <span>Criada em: </span>
                    <span>{data}</span>
                </div>
                <div>
                    <span>Autor: </span>
                    <span>{autor}</span>
                </div>
                <div>
                    <span>Atribuido à: </span>
                    <span>{atribuido}</span>
                </div>
            </div>

            <button onClick={handleCloseModal}>
                Fechar
            </button>
        </div>
    );
};

