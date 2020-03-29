import React, { useState } from 'react';
import LogoImg from '../../assets/logo.svg'
import {FiArrowLeft} from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import './style.css'

export default function NewIncident(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    
    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value,
        }

        try{
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId, 
                }
            });   

            console.log(data);
            history.push('/profile');

        }catch(err){
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Be The Hero"/>                 
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                
                    <Link className="black-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>
                
                <form onSubmit= {handleNewIncident}> 
                    <input 
                        placeholder="Titulo do Caso" 
                        value={ title }
                        onChange={ e => setTitle(e.target.value)}
                    />
                    <textarea  
                        placeholder="Descricão" 
                        value={ description }
                        onChange={ e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reias" 
                        value={ value }
                        onChange={ e => setValue(e.target.value)}
                    />
        
                    <button className="button" type="submit">Cadastrar</button>
                </form>

            </div>
        </div>    
    );
}