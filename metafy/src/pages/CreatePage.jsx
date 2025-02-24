/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import api from '../services/api';

const CreatePage = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await api.post('/transactions', data);
      navigate('/'); // Redireciona para a lista após a criação
    } catch (error) {
      console.error('Erro ao criar transação:', error);
    }
  };

  return (
    <div>
      <h2>Adicionar Nova Transação</h2>
      <Form onSubmit={handleCreate} /> {/* Corrigido: Passando a função correta */}
    </div>
  );
};

export default CreatePage;
