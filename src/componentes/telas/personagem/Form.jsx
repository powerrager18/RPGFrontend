import { useContext } from 'react'
import Alerta from '../../Alerta';
import PersonagemContext from './PersonagemContext';



function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(PersonagemContext);

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
                        <h5 className="modal-title" id="exampleModalLabel">Personagem</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="form-group">
                                <label htmlFor="txtCodigo" className="form-label">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control"
                                    id="txtCodigo"
                                    name="cod_personagem"
                                    value={objeto.cod_personagem}
                                    onChange={handleChange}
                                />
                                <div class="invalid-feedback">
                                    preenxa esse campo!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtNome" className="form-label">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtNome"
                                    name="nome_personagem"
                                    value={objeto.nome_personagem}
                                    onChange={handleChange}
                                    required
                                />
                                <div class="invalid-feedback">
                                    preenxa esse campo!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtVida" className="form-label">
                                    vida maxima
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="txtVida"
                                    name="vida_maxima"
                                    value={objeto.vida_maxima}
                                    onChange={handleChange}
                                    required
                                />
                                <div class="invalid-feedback">
                                    preenxa esse campo!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtSanidade" className="form-label">
                                    sanidade maxima
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="txtSanidade"
                                    name="sanidade_maxima"
                                    value={objeto.sanidade_maxima}
                                    onChange={handleChange}
                                    required
                                />                                
                                <div class="invalid-feedback">
                                    preenxa esse campo!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtHistoria" className="form-label">
                                    história
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtHistoria"
                                    name="historia"
                                    value={objeto.historia}
                                    onChange={handleChange}
                                />                                
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