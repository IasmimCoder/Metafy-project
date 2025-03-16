/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormCategoria from '../components/FormCategoria';
import api from '../services/api';

const EditCategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para pegar o token do localStorage e adicionar no cabeçalho da requisição
  const getToken = () => {
    return localStorage.getItem('token');  // Retorna o token armazenado no localStorage
  };
  
  useEffect(() => {
    const token = getToken();  // Recuperando o token

    if (!token) {
      navigate('/login');  // Se não houver token, redireciona para a página de login
      return;
    }
    // Aqui você faz a requisição para a API usando o id
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/categories/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Adicionando o token ao cabeçalho
          },
        });
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
    const response = await fetch(`http://localhost:8080/api/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Adicionando o token ao cabeçalho
      },
      body: JSON.stringify(data),  // Passando os dados da transação no corpo
    });
    console.log(await response.json())
    // const response = await api.put(`/categories/edit/${id}`, data)
    navigate('/home/categories');
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className='container  flex-column py-5 justify-content align-items-center vh-100'>
      <h2>Editar Categoria</h2>
      {initialData ? (
        <FormCategoria onSubmit={handleSubmit} initialData={initialData} />
      ) : (
        <p>Item não encontrado.</p>
      )}
    </div>
  );
};

export default EditCategoryPage;
