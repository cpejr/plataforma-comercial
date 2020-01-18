import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './edit.css';
import moment from 'moment'
import 'moment/locale/pt-br'

export default function Edit( { match, history } ) {
    const [values, setValues] = useState({});
    const id = match.params.id;

    const portfolio = [
        { id: 1, name: 'APP' },
        { id: 2, name: 'ELT' },
        { id: 3, name: 'FV' },
        { id: 4, name: 'PE' },
        { id: 5, name: 'WEB' },
      ];

    const status = [
        { id: 1, name: 'Não iniciado' },
        { id: 2, name: 'Retornar' },
        { id: 3, name: 'Contato inicial' },
        { id: 3, name: 'Elaboração de escopo' },
        { id: 3, name: 'Proposta Aceita' },
        { id: 4, name: 'Assinado' },
        { id: 5, name: 'Cancelado' },
    ];

    const demandChannels = [
        { id: 1, name: 'Desconhecido' },
        { id: 2, name: 'Google' },
        { id: 3, name: 'Instagram' },
        { id: 4, name: 'UFMG' },
        { id: 5, name: 'Cliente Antigo' },
        { id: 6, name: 'Indicação' },
        { id: 7, name: 'Prospecção ativa' },
        { id: 8, name: 'LinkedIn' },
        { id: 9, name: 'WhatsApp' },
        { id: 10, name: 'Facebook' },
    ];

    const boolean = [
        { id: true, name: 'Sim' },
        { id: false, name: 'Não' },
      ];

    useEffect(() => {
        async function loadLead() {
            const response = await api.get(`/user/${id}`);
            setValues(response.data);
        }
        loadLead();
    }, [match.params._id]); 

    function handleInputChange(event) {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
            // console.log(values.name);
            // console.log(event.target.name);
            // console.log(event.target);
            // console.log(values);
    }

    async function handleSubmit(event){
        try {
            event.preventDefault();
            
            const response = await api.put(`/update/${id}`, { user: values });
            console.log(values);
            console.log('clique')
            // console.log(response);
            history.push(`/leads`);
        }
        catch(error){
            console.log('erro ao carregar a proxima pagina');
            console.log(error)
        }
    }

    return(
        <div className="edit-container">
            <h1>Editar Lead</h1>
            <form onSubmit={ handleSubmit }>
                <section className="avatar-box">
                    <img src= { values.avatar } alt="avatar" />
                    <input 
                            type="text" 
                            name="avatar"
                            value={ values.avatar } 
                            onChange = { handleInputChange }   
                        />
                </section>
                <section className="box">
                    <p>Nome</p>
                    <input 
                        id="name" 
                        type="text" 
                        name="name"
                        value={ values.name } 
                        onChange = { handleInputChange }   
                    />

                    <p>E-mail</p>
                    <input 
                        id="email" 
                        name="email"
                        type="text" 
                        value={values.email} 
                        onChange = {handleInputChange}  
                    />
                    <p>Telefone</p>
                    <input 
                        id="phone" 
                        name="phone"
                        type="text"
                        value={values.phone} 
                        onChange = {handleInputChange} />
                    <p>Área do Portfólio</p>
                    <select 
                        value= { values.projectArea }
                        name="projectArea"
                        onChange = {handleInputChange}
                    >
                        {portfolio.map(portfolio => (
                            <option 
                            key={ portfolio.id }
                            value={ portfolio.name }>
                                { portfolio.name }
                            </option>
                        ))}
                    </select>
                    <p>Como chegou</p>
                    <select 
                        value= { values.howItArrived }
                        name="howItArrived"
                        onChange = {handleInputChange}
                    >
                        {demandChannels.map(demandChannels => (
                            <option 
                            key={ demandChannels.id }
                            value={ demandChannels.name }>
                                { demandChannels.name }
                            </option>
                        ))}
                    </select>
                </section>
                <section className="box">
                    <p>Tomador de decisão?</p>
                    <select 
                        value= { values.decisionMaker }
                        name="decisionMaker"
                        onChange = { handleInputChange }
                    >
                        {boolean.map(boolean => (
                            <option 
                            key={ boolean.id }
                            value={ boolean.id }>
                                { boolean.name }
                            </option>
                        ))}
                    </select>
                    <p>Conhece MEJ, EJ...?</p>
                    <select 
                        value= { values.knowsAboutCPE }
                        name="knowsAboutCPE"
                        onChange = { handleInputChange }
                    >
                        {boolean.map(boolean => (
                            <option 
                            key={ boolean.id }
                            value={ boolean.id }>
                                { boolean.name }
                            </option>
                        ))}
                    </select>
                    <p>Segmento</p>
                    <input 
                        name="segment" 
                        type="text" 
                        value={ values.segment } 
                        onChange = { handleInputChange }
                    />
                    <p>Responsável pelo Lead</p>
                    <input 
                        name="responsible" 
                        type="text" 
                        value={ values.responsible } 
                        onChange = { handleInputChange }
                    />
                    <p>Detalhes</p>
                    <textarea 
                        name="details" 
                        type="text" 
                        value={ values.details } 
                        onChange = { handleInputChange }
                    />
                </section>
                <section className="box">
                    <p>Data de retorno</p>
                    <input 
                        name="returnDate" 
                        type="date" 
                        value={values.returnDate}
                        onChange = { handleInputChange }
                    />
                    <p>Número de pessoas na empresa</p>
                    <input 
                        name="numberOfEmployees" 
                        type="text" 
                        value={ values.numberOfEmployees } 
                        onChange = { handleInputChange }
                    />
                    <p>Status</p>
                    <select 
                        value= { values.status }
                        name="status"
                        onChange = { handleInputChange }
                    >
                        {status.map(status => (
                            <option 
                            key={ status.id }
                            value={ status.name }>
                                { status.name }
                            </option>
                        ))}
                    </select>
                    <button type="submit">Enviar</button>
                </section>
            </form>
        </div>
        );
}