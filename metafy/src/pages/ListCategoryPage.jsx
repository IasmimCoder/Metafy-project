import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TableCategory from '../components/TableCategory';
import { useTheme } from "../context/ThemeContext"; // Importando o ThemeContext

const ListPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const { theme, toggleTheme } = useTheme(); // Pegando o tema atual e a função de alternância

  // Função para pegar o token do localStorage e adicionar no cabeçalho da requisição
  const getToken = () => {
    return localStorage.getItem('token');  // Retorna o token armazenado no localStorage
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const token = getToken();  // Recuperando o token

      if (!token) {
        navigate('/login');  // Se não houver token, redireciona para a página de login
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/categories', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Adicione isso caso o seu backend exija
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar categorias');
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        if (error.message === 'Erro ao buscar categorias') {
          // Pode verificar aqui a resposta do erro para redirecionar para o login
          navigate('/login');
        }
      }
    };

    fetchCategories();
  }, [navigate]);

  const handleEdit = (id) => {
    navigate(`/home/categories/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const token = getToken();

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar categoria');
      }

      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
    }
  };

  return (
    <div
      className={`container d-flex flex-column py-5 justify-content align-items-center vh-100 ${
        theme === 'dark' ? 'dark text-light' : 'light text-dark'
      }`}
    >
      <h2>Lista de Categorias</h2>
      <TableCategory data={items} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ListPage;