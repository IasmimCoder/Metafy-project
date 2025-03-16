import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormTransaction from '../components/FormTransaction';
import api from '../services/api';
import { useTheme } from '../context/ThemeContext'; // Importando o ThemeContext

const CreatePage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme(); // Pegando o tema atual

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
      console.log(data);
      const response = await fetch('http://localhost:8080/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Adicionando o token ao cabeçalho
        },
        body: JSON.stringify(data),  // Passando os dados da transação no corpo
      });
      console.log(response.status)
      navigate('/home/'); // Redireciona para a lista após a criação
    } catch (error) {
      console.error('Erro ao criar transação:', error);
    }
  };

  // Carregar categorias quando o componente for montado
  useEffect(() => {
    const fetchCategories = async () => {
      const token = getToken(); // Recupera o token dentro do useEffect

      if (!token) {
        navigate('/login');  // Se não houver token, redireciona para a página de login
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Adicionando o token ao cabeçalho
          },
        });
        const data = await response.json();
        setCategories(data); // Supondo que a resposta contenha as categorias
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    };

    fetchCategories();
  }, [navigate]);  // Dependência para garantir que a navegação esteja disponível

  return (
    <div
      className={`container d-flex flex-column py-5 justify-content-center align-items-center mt-2 ${
        theme === 'dark' ? 'dark text-light' : 'light text-dark'
      }`}
    >
    <h2 className="mb-5">Adicionar Nova Transação</h2> {/* Adicionando margem inferior */}
    {isLoading ? <p>Carregando categorias...</p> : <FormTransaction onSubmit={handleCreate} categories={categories} />}
    </div>
  );
};

export default CreatePage;
