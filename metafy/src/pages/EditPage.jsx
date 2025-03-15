/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormTransaction from '../components/FormTransaction';
import api from '../services/api';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Aqui você faz a requisição para a API usando o id
    const fetchData = async () => {
      try {
        const response = await api.get('/transactions/' + id);
        const data = response;
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
    // Aqui você pode enviar os dados para a API para salvar as mudanças
    const response = await api.put(`/transactions/edit/${id}`, data)
    navigate('/home');
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className='container d-flex flex-column py-5 justify-content align-items-center vh-100'>
      <h2>Editar Transação</h2>
      {initialData ? (
        <FormTransaction onSubmit={handleSubmit} initialData={initialData} />
      ) : (
        <p>Item não encontrado.</p>
      )}
    </div>
  );
};

export default EditPage;
