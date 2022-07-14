import { useState, useEffect } from 'react';
import PersonagemContext from './PersonagemContext';
import Tabela from './Tabela';
import Form from './Form';

function FunPersonagem() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        cod_personagem: "", nome_personagem: "", vida_maxima: "", sanidade_maxima: "", historia: ""
    })
	

    const recuperaPersonagem = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/personagem`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }

    
    const recuperar = async cod_personagem => {    
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/personagem/${cod_personagem}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => console.log(err))
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este personagem?')) {
            try {
                await 
                fetch(`${process.env.REACT_APP_ENDERECO_API}/personagem/${objeto.cod_personagem}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaPersonagem();
            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    useEffect(() => {
        recuperaPersonagem();
    }, []);


    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/personagem`, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(objeto),
            }).then(response => response.json())
                .then(json => {
                    setAlerta({ status: json.status, message: json.message });
                    setObjeto(json.objeto);
                    if (!editar) {
                        setEditar(true);
                    }
                });
        } catch (err) {
            console.error(err.message);
        }       
        recuperaPersonagem();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }	    

    return (
        <PersonagemContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,               
                recuperaPersonagem,
                remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar,
                handleChange
            }
        }>
            <Tabela />
            <Form />
        </PersonagemContext.Provider>
    );
}

export default FunPersonagem;