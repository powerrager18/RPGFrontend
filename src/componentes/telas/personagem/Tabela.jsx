import { useContext } from 'react'
import PersonagemContext from './PersonagemContext';
import Alerta from '../../Alerta';

function Tabela() {

    const { setObjeto, alerta, setAlerta, listaObjetos, remover, setEditar, recuperar } = useContext(PersonagemContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Personagens</h1>
            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 && <h1>Nenhum personagem encontrada</h1>}
            {listaObjetos.length > 0 && (
                <table className="table">
                    <thead>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
                            onClick={() => {
                                setObjeto({
                                    cod_personagem: 0, nome_personagem: "",
                                    vida_maxima: "", sanidade_maxima: "", 
                                    historia: ""
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
                            <th scope="col">vida</th>
                            <th scope="col">sanidade</th>
                            <th scope="col">história</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.cod_personagem}>
                                <td align="center">
                                <button className="btn btn-info"
                                        data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                        onClick={() => {
                                            recuperar(objeto.cod_personagem);
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
                                <td>{objeto.cod_personagem}</td>
                                <td>{objeto.nome_personagem}</td>
                                <td>{objeto.vida_maxima}</td>
                                <td>{objeto.sanidade_maxima}</td>
                                <td>{objeto.historia}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Tabela;