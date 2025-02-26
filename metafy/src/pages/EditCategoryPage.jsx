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

  useEffect(() => {
    // Aqui você faz a requisição para a API usando o id
    const fetchData = async () => {
      try {
        const response = await api.get('/categories/' + id);
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
    const response = await api.put(`/categories/edit/${id}`, data)
    navigate('/');
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div>
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
