import React, {useState,useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css';

import api from '../../services/api';

export default function Profile(){
    const [incients, setIncients] = useState([]);
    const history = useHistory();
    const ongName = localStorage.getItem('ongName');  
    const ongId = localStorage.getItem('ongId');  

    useEffect(() => {
        api.get('profile', {
            headers:{
                Authorization: ongId,
            }
        }).then(response =>{
            setIncients(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers:{
                    Authorization: ongId,
                }
            });
        } catch (err) {
            alert('Erro ao deletar caso, tente novament.');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidentes/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incients.map(incient =>(
                    <li key={incient.id}>
                        <strong>CASO:</strong>
                        <p>{incient.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incient.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(incient.value)}</p>

                        <button onClick={() => handleDeleteIncident(incient.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                        </button>
                    </li>
                ))}
            </ul>

        </div>
        )
}