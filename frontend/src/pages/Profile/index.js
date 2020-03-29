import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import LogoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';

export default function Profile(){

    const history = useHistory();
    const [incidents, setInsidents] = useState([])
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    
    //Dispara uma função que o segundo parâmetro é alterado.
    useEffect(() => {
        api.get('profile', { 
            headers:{
                Authorization: ongId,
            }
        }).then(response => {
            setInsidents(response.data);
        })
    }, [ongId]);


    async function handleDeleteIncident(id){

        try{
            await api.delete(`incidents/${id}`,{ 
                headers:{
                    Authorization: ongId,
                }
            }); 
            
            //fazer um refres na página para mostrar somente os não deletados.
            setInsidents(incidents.filter(incident => incident.id !== id))
        }catch(err){
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        
        <div className="profile-container">
            <header>
                <img src={LogoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incident/new"> Cadastrar novo caso </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={ 18 } color="#e02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incidents => (
                    <li key={incidents.id}>
                        <strong>CASO:</strong>
                        <p>{incidents.title}</p>
                        
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incidents.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency: 'BRL'}).format(incidents.value)}</p>

                        <button onClick={() => handleDeleteIncident(incidents.id)} type="button"> 
                            <FiTrash2 size={ 20 } color="#a8a8b3" /> 
                        </button>
                    </li>
                ))}
                
                
            </ul>
        </div>
    );
}