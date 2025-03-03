/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormCategoria from '../components/FormCategoria';
import api from '../services/api';

const CreatePage = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await api.post('/categories', data);
      navigate('/home/'); // Redireciona para a lista após a criação
    } catch (error) {
      console.error('Erro ao criar transação:', error);
    }
  };

  return (
    <div className='container flex-column py-5 justify-content align-items-center vh-100'>
      <h2>Adicionar Nova Categoria</h2>
      <FormCategoria onSubmit={handleCreate} /> {/* Corrigido: Passando a função correta */}
    </div>
  );
};

export default CreatePage;
