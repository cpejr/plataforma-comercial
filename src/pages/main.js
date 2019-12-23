import React, { useEffect, useState } from 'react';
import './main.css';
import { Link } from 'react-router-dom';
import api from '../services/api';
import moment from 'moment'
import 'moment/locale/pt-br'
import StarIcon from '@material-ui/icons/Star';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


export default function Main( history ) {
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        async function loadLeads() {
            const response = await api.get('/attentionLeads', {
            })
            setLeads(response.data);
        }
        loadLeads();
    }); 
    
    return(
        <div className="main-container">
            <AppBar>
                <Tabs value="main-tab" className="Tab" centered>
                    <Link value="new-tab" to="/new" className="main-link"><Tab value="new-tab" label="Cadastro de lead" className="NavTabs" /></Link>
                    <Link value="leads-tab" to="/leads" className="main-link"><Tab value="leads-tab" label="Lista de leads" className="NavTabs" /></Link>
                    <Link value="main-tab" to="/main" className="main-link"><Tab value="main-tab" label="Leads novos" className="NavTabs" /></Link>
                </Tabs>
            </AppBar>
            <h1>Leads saindo do forno</h1>
            <ul>
                {leads.map(lead => (
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
                            <button type="button" className="card-button">
                                <Link to={`/edit/${lead._id}`} className="main-link">
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