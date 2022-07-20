import { useContext } from 'react'
import Alerta from '../../Alerta';
import UtilizaContext from './UtilizaContext';



function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaPersonagens, listaArmas } = useContext(UtilizaContext);

    (function () {
        'use strict'

        var forms = document.querySelectorAll('.needs-validation')

        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
    })()

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Relação</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="form-group">
                            <label htmlFor="selectPersonagem" className="form-label">
                                    Personagem
                                </label>
                            <select
                                    className="form-control"
                                    id="selectPersonagem"
                                    name="cod_personagem"
                                    value={objeto.cod_personagem}
                                    onChange={handleChange}
                                    required>
                                    <option disable="true" value="">
                                        (Selecione o personagem)
                                    </option>
                                    {listaPersonagens.map((personagem) => (
                                        <option key={personagem.cod_personagem}
                                            value={personagem.cod_personagem}>
                                            {personagem.cod_personagem} - {personagem.nome_personagem}
                                        </option>
                                    ))}
                                </select>
                                <div class="invalid-feedback">
                                    preenxa esse campo!
                                </div>
                            </div>
                            <div className="form-group">
                            <label htmlFor="selectArma" className="form-label">
                                    Arma
                                </label>
                            <select
                                    className="form-control"
                                    id="selectArma"
                                    name="cod_arma"
                                    value={objeto.cod_arma}
                                    onChange={handleChange}
                                    required>
                                    <option disable="true" value="">
                                        (Selecione a arma)
                                    </option>
                                    {listaArmas.map((armas) => (
                                        <option key={armas.cod_arma}
                                            value={armas.cod_arma}>
                                            {armas.cod_arma} - {armas.nome_arma}
                                        </option>
                                    ))}
                                </select>
                                <div class="invalid-feedback">
                                    preenxa esse campo!
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success" >
                                Salvar  <i className="bi bi-save"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Form;