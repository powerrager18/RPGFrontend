import { useContext } from 'react'
import ArmaContext from './ArmaContext';
import Alerta from '../../Alerta';

function Tabela() {

    const { setObjeto, alerta, setAlerta, listaObjetos, remover, setEditar, recuperar } = useContext(ArmaContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Armas</h1>
            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 && <h1>Nenhuma arma encontrada</h1>}
            {listaObjetos.length > 0 && (
                <table className="table">
                    <thead>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
                            onClick={() => {
                                setObjeto({
                                    cod_arma: 0, nome_arma: "",
                                    descricao_arma: ""
                                });
                                setEditar(false);
                                setAlerta({ status: "", message: "" });
                            }}>
                            Novo <i className="bi bi-file-earmark-plus"></i>
                        </button>
                        <tr>
                            <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                            <th scope="col">Código</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.cod_arma}>
                                <td align="center">
                                <button className="btn btn-info"
                                        data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                        onClick={() => {
                                            recuperar(objeto.cod_arma);
                                            setEditar(true);
                                            setAlerta({ status: "", message: "" });
                                        }}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objeto); }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                                <td>{objeto.cod_arma}</td>
                                <td>{objeto.nome_arma}</td>
                                <td>{objeto.descricao_arma}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Tabela;