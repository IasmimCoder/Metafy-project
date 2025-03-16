/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormTransaction from '../components/FormTransaction';
import { useTheme } from '../context/ThemeContext'; // Importando o ThemeContext

import api from '../services/api';

const EditTransactionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme(); // Pegando o tema atual
  

  // Função para pegar o token do localStorage e adicionar no cabeçalho da requisição
  const getToken = () => {
    return localStorage.getItem('token');  // Retorna o token armazenado no localStorage
  };

  useEffect(() => {
    // Aqui você faz a requisição para a API usando o id
    const fetchData = async () => {
      try {
        const token = getToken();  // Recuperando o token

        // Aqui você pode enviar os dados para a API para salvar as mudanças
        const response = await fetch(`http://localhost:8080/api/transactions/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Adicionando o token ao cabeçalho
          },
        });
        // const response = await api.get('/transactions/' + id);
        const data = await response.json();
        console.log(data)

        setInitialData(data); // Definindo os dados recebidos da API
        setLoading(false); // Definindo o estado de carregamento como falso
      } catch (err) {
        setError(err.message); // Se ocorrer um erro, armazena a mensagem de erro
        setLoading(false); // Define carregamento como falso
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (data) => {
    const token = getToken();  // Recuperando o token

    // Aqui você pode enviar os dados para a API para salvar as mudanças
    const response = await fetch(`http://localhost:8080/api/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Adicionando o token ao cabeçalho
      },
      body: JSON.stringify(data),  // Passando os dados da transação no corpo
    });
    // const response = await api.put(`/transactions/edit/${id}`, data)
    console.log(await response.json(response))
    navigate('/home');
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className={`container d-flex flex-column py-5 justify-content-center align-items-center mt-2 ${
      theme === 'dark' ? 'dark text-light' : 'light text-dark'
    }`}>
      <h2 className='mb-5'>Editar Transação</h2>
      {initialData ? (
        <FormTransaction onSubmit={handleSubmit} initialData={initialData} />
      ) : (
        <p>Item não encontrado.</p>
      )}
    </div>
  );
};

export default EditTransactionPage;
