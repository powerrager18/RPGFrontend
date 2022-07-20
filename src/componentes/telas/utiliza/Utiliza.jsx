import { useState, useEffect } from 'react';
import UtilizaContext from './UtilizaContext';
import Tabela from './Tabela';
import Form from './Form';

function FunUtiliza() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        cod_personagem: "", cod_arma: ""
    });
    const [listaPersonagens, setListaPersonagens] = useState([]);
    const [listaArmas, setListaArmas] = useState([]);


    const recuperaPersonagem = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/personagem`)
            .then(response => response.json())
            .then(data => setListaPersonagens(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const recuperaArma = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/arma`)
            .then(response => response.json())
            .then(data => setListaArmas(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const recuperaUtiliza = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/utiliza`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }


    const recuperar = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/utiliza`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objeto)
        })
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => console.log(err))
    }

    const remover = async (objeto) => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/utiliza`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(objeto)
                    })
                        .then(response => response.json())
                        .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaUtiliza();
            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    useEffect(() => {
        recuperaUtiliza();
        recuperaArma();
        recuperaPersonagem();
    }, []);


    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/utiliza`, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(objeto)
            }).then(response => {
                if (response.ok) return response.json()
                throw Error("Erro ao inserir")
            })
                .then(json => {
                    setAlerta({ status: json.status, message: json.message });
                    setObjeto(json.objeto);
                    if (!editar) {
                        setEditar(true);
                    }
                });
        } catch (err) {

            setAlerta({ status: "error", message: err.message });
        }
        recuperaUtiliza();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    return (
        <UtilizaContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaPersonagem,
                remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar,
                handleChange,
                recuperaArma, recuperaUtiliza,
                listaArmas, listaPersonagens, setListaArmas, setListaPersonagens
            }
        }>
            <Tabela />
            <Form />
        </UtilizaContext.Provider>
    );
}

export default FunUtiliza;