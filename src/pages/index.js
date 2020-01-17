import React, { useEffect, useState } from 'react';
import './index.css';
import moment from 'moment'
import 'moment/locale/pt-br'
import { Link } from 'react-router-dom';
import api from '../services/api';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import StarIcon from '@material-ui/icons/Star';
import appFirebase from '../components/Firebase/firebase.js'


export default function Index( history ) {
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        async function loadLeads() {
            const response = await api.get('/index', {
            })
            setLeads(response.data);
        }
        loadLeads();
    });
    
    return(
        <div className="index-container">
            <AppBar>
                <Tabs value="leads-tab" className="Tab" centered>
                    <Link value="new-tab" to="/new" className="index-link"><Tab value="new-tab" label="Cadastro de lead" className="NavTabs" /></Link>
                    <Link value="leads-tab" to="/leads" className="index-link"><Tab value="leads-tab" label="Lista de leads" className="NavTabs" /></Link>
                    <Link value="main-tab" to="/main" className="index-link"><Tab value="main-tab" label="Leads novos" className="NavTabs" /></Link>
                    <a className="sign-out-button" onClick={() => appFirebase.auth().signOut()}>Sign Out</a>
                </Tabs>
            </AppBar>
            <h1>Lista de Leads</h1>
            <ul>
                {leads.map(lead => ( /* map:serve pra percorrer um array e retornar algo */
                    <li key={lead._id}>
                        <img src={lead.avatar} alt={lead.name} />
                        <footer>
                            <strong>{lead.name}</strong>
                            <p className="status-badge">{lead.status}</p>
                            { (lead.returnDate != null) 
                                    ? <p className="status-badge">{moment(lead.returnDate).calendar()}</p>
                                    : ''
                                }
                            <p>{lead.details}</p>
                        </footer>
                        <div className="buttons">
                            <button type="button" className="card-button">
                                Qualificação: <p>
                                { lead.decisionMaker 
                                    ? <StarIcon />
                                    : ''
                                }
                                { (lead.numberOfEmployees < 10)
                                    ? <StarIcon />
                                    : ''
                                }
                                { lead.knowsAboutCPE
                                    ? <StarIcon />
                                    : ''
                                }
                                </p>
                            </button>
                            <button className="card-button">
                                <Link to={`/edit/${lead._id}`} className="index-link">
                                    Editar
                                </Link>
                            </button>
                        </div>
                    </li>
                ))} 
            </ul>  
        </div>
    );
}