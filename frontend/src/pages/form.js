import React, { useState } from 'react';
import './form.css';
import api from '../services/api';
import logo from './logo.png';

export default function Form({ history }) {
    const [values, setValues] = useState({});

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

      const portfolio = [
        { id: 1, name: 'APP' },
        { id: 2, name: 'ELT' },
        { id: 3, name: 'FV' },
        { id: 4, name: 'PE' },
        { id: 5, name: 'WEB' },
      ];

      const boolean = [
        { id: true, name: 'Sim' },
        { id: false, name: 'Não' },
      ];

    async function handleSubmit(event){
        try {
            event.preventDefault();
            const response = await api.post('/', { lead: values });
            history.push(`/leads`);
        }
        catch(error){
            console.log('erro ao carregar a proxima pagina');
            console.log(error)
        }
    }

    function handleInputChange(event) {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    }

    return(
        <div className="form-container">
            <h1>Cadastro de Leads/Clientes</h1>
            <form onSubmit={ handleSubmit }>
                <main className="row">
                    <div className="column">
                        <input
                            placeholder="Nome"
                            value={ values.name }
                            name="name"
                            onChange = {handleInputChange}
                            required
                        />
                        <input
                            placeholder="E-mail"
                            value={ values.email }
                            name="email"
                            onChange = {handleInputChange}
                            required
                        />
                            {/* <p>{values.email}</p> */}
                        <input
                            placeholder="Telefone"
                            value={ values.phone }
                            name="phone"
                            onChange = {handleInputChange}
                            required
                        />
                        {/* <p>{values.phone}</p> */}
                        <input
                            placeholder="Link pra foto"
                            value={ values.avatar }
                            name="avatar"
                            onChange = {handleInputChange}
                        />
                        {/* <img src={values.avatar} alt={values.name} /> */}
                        <input
                            placeholder="Responsável pelo lead"
                            value={ values.responsible }
                            name="responsible"
                            onChange = {handleInputChange}
                        />
                        <select
                            value= { values.projectArea }
                            name="projectArea"
                            onChange = {handleInputChange}
                            required
                        >

                            <option value="" disabled selected>-- Área do portfólio --</option>
                            {portfolio.map(portfolio => (
                                <option key={portfolio.id} value={portfolio.name}>
                                    {portfolio.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className="column">
                        <input
                            placeholder="Número de funcionários"
                            value={ values.numberOfEmployees }
                            name="numberOfEmployees"
                            onChange = {handleInputChange}
                            />
                        <input
                            placeholder="Segmento"
                            value={ values.segment }
                            name="segment"
                            onChange = {handleInputChange}
                            />

                        <select
                            placeholder="Como chegou"
                            value= { values.howItArrived }
                            name="howItArrived"
                            onChange = {handleInputChange}
                            required
                        >
                        <option value="" disabled selected>-- Como chegou --</option>
                            {demandChannels.map(demandChannels => (
                                <option key={demandChannels.id} value={demandChannels.name}>
                                    {demandChannels.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value= { values.decisionMaker }
                            name="decisionMaker"
                            onChange = {handleInputChange}
                        >
                            <option value="" disabled selected>-- Tomador de decisão? --</option>
                            {boolean.map(boolean => (
                                <option key={boolean.id} value={boolean.id}>
                                    {boolean.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value= { values.knowsAboutCPE }
                            name="knowsAboutCPE"
                            onChange = {handleInputChange}
                        >
                            <option value="" disabled selected>-- Conhece o MEJ, como a CPE funciona, etc? --</option>
                            {boolean.map(boolean => (
                                <option key={boolean.id} value={boolean.id}>
                                    {boolean.name}
                                </option>
                            ))}
                        </select>
                        <textarea
                            placeholder="Detalhes"
                            value={ values.details }
                            name="details"
                            onChange = {handleInputChange}
                        />
                    </div>
                </main>
                <button type="submit">Enviar</button>
            </form>
          <img src={logo} class="logo"/>
        </div>
    );
}
