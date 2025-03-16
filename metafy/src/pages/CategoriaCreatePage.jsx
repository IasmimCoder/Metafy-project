/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormCategoria from '../components/FormCategoria';
import api from '../services/api';

const CreatePage = () => {
  const navigate = useNavigate();

  // Função para pegar o token do localStorage e adicionar no cabeçalho da requisição
  const getToken = () => {
    return localStorage.getItem('token');  // Retorna o token armazenado no localStorage
  };
  
  const handleCreate = async (data) => {
    const token = getToken();  // Recuperando o token

    if (!token) {
      navigate('/login');  // Se não houver token, redireciona para a página de login
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Adicionando o token ao cabeçalho
        },
        body: JSON.stringify(data),  // Passando os dados da transação no corpo
      });
      console.log(response);
      navigate('/home/categories'); // Redireciona para a lista após a criação
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
