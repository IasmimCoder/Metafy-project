/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import api from '../services/api';



const CreatePage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCreate = async (data) => {
    try {
      await api.post('/transactions', data);
      navigate('/home/'); // Redireciona para a lista após a criação
    } catch (error) {
      console.error('Erro ao criar transação:', error);
    }
  };

  // Carregar categorias quando o componente for montado
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    };

    fetchCategories();
  }, []);


  return (
    <div className='container flex-column py-5 justify-content align-items-center vh-100'>
      <h2>Adicionar Nova Transação</h2>
      <Form onSubmit={handleCreate} categories={categories} /> {/* Corrigido: Passando a função correta */}
      
    </div>
  );
};

export default CreatePage;
