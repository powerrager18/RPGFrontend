import { useContext } from 'react'
import UtilizaContext from './UtilizaContext';
import Alerta from '../../Alerta';

function Tabela() {

    const { setObjeto, alerta, setAlerta, listaObjetos, remover, setEditar, recuperar } = useContext(UtilizaContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Personagens e suas armas</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
                            onClick={() => {
                                setObjeto({
                                    cod_personagem: 0, cod_arma: 0
                                });
                                setEditar(false);
                                setAlerta({ status: "", message: "" });
                            }}>
                            Novo <i className="bi bi-file-earmark-plus"></i>
                        </button>
            {listaObjetos.length === 0 && <h1>Nenhuma relação encontrada</h1>}
            {listaObjetos.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                            <th scope="col">Personagem</th>
                            <th scope="col"> cod Personagem</th>
                            <th scope="col">Arma</th>

                            <th scope="col">cod Arma</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.cod_personagem}>
                                <td align="center">
                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objeto); }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                                <td>{objeto.nome_personagem}</td>
                                <td>{objeto.cod_personagem}</td>
                                <td>{objeto.nome_arma}</td>
                                <td>{objeto.cod_arma}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Tabela;