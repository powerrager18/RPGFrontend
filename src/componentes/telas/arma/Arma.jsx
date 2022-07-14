import { useState, useEffect } from 'react';
import ArmaContext from './ArmaContext';
import Tabela from './Tabela';
import Form from './Form';

function FunArma() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        cod_arma: "",
        nome_arma: "",
        descricao_arma: ""
    })
	

    const recuperaArma = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/arma`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }

    
    const recuperar = async cod_arma => {    
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/arma/${cod_arma}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => console.log(err))
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover esta arma?')) {
            try {
                await 
                fetch(`${process.env.REACT_APP_ENDERECO_API}/arma/${objeto.cod_arma}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaArma();
            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    useEffect(() => {
        recuperaArma();
    }, []);


    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/arma`, {
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
        recuperaArma();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }	    

    return (
        <ArmaContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,               
                recuperaArma,
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
        </ArmaContext.Provider>
    );
}

export default FunArma;