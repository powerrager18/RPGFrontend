import { useContext } from 'react'
import Alerta from '../../Alerta';
import UtilizaContext from './UtilizaContext';



function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(UtilizaContext);

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
                                <label htmlFor="txtCodigo" className="form-label">
                                    Codigo do personagem
                                </label>
                                <input
                                    type="text"
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
                                <label htmlFor="txtCodigo2" className="form-label">
                                    Codigo da arma
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtCodigo2"
                                    name="cod_arma"
                                    value={objeto.cod_arma}
                                    onChange={handleChange}
                                />
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