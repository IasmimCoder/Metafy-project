/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormMeta from '../components/FormMeta';
import api from '../services/api';



const CreateMeta = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCreate = async (data) => {
    try {
      await api.post('/goals', data);
      navigate('/'); // Redireciona para a lista após a criação
    } catch (error) {
      console.error('Erro ao criar transação:', error);
    }
  };


  return (
    <div className='container flex-column py-5 justify-content align-items-center vh-100'>
      <h2>Adicionar Nova Meta</h2>
      <FormMeta onSubmit={handleCreate} /> {/* Corrigido: Passando a função correta */}
      
    </div>
  );
};

export default CreateMeta;
