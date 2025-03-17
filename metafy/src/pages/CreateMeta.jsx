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
    const token = getToken();  // Recuperando o token
    console.log("Token recuperado:", token); // Verifique se o token é válido

    if (!token) {
      navigate('/login');  // Se não houver token, redireciona para a página de login
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Adicionando o token ao cabeçalho
        },
        body: JSON.stringify(data),  // Passando os dados da transação no corpo
      });
      console.log(response);
      navigate('/home'); // Redireciona para a lista após a criação
    } catch (error) {
      console.error('Erro ao criar transação:', error);
    }
  };

  // Função para pegar o token do localStorage e adicionar no cabeçalho da requisição
  const getToken = () => {
    return localStorage.getItem('token');  // Retorna o token armazenado no localStorage
  };


  return (
    <div className='container flex-column py-5 justify-content align-items-center vh-100'>
      <h2>Adicionar Nova Meta</h2>
      <FormMeta onSubmit={handleCreate} /> {/* Corrigido: Passando a função correta */}
      
    </div>
  );
};

export default CreateMeta;
