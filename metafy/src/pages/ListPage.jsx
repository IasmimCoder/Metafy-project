/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';

const ListPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  // Função para pegar o token do localStorage e adicionar no cabeçalho da requisição
  const getToken = () => {
    return localStorage.getItem('token');  // Retorna o token armazenado no localStorage
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = getToken();  // Recuperando o token

        if (!token) {
          navigate('/login');  // Se não houver token, redireciona para a página de login
          return;
        }
        const response = await fetch('http://localhost:8080/api/transactions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', // Adiciona o cabeçalho se necessário
            'Authorization': `Bearer ${token}`,  // Adicionando o token ao cabeçalho
          },
        });

        // if (!response.ok) {
        //   throw new Error('Erro ao buscar transações');
        // }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        // Aqui você pode verificar o erro do JWT e logá-lo
        if (error.response && error.response.status === 401) {
          console.error('Erro de autenticação: o JWT é inválido ou expirado.');
          alert('Sessão expirada ou token inválido. Faça login novamente.');
        } else if (error.response && error.response.status === 403) {
          console.error('Erro de permissão: acesso proibido.');
        } else {
          console.error('Erro ao buscar transações:', error);
        }
      }
    };

    fetchTransactions();
  }, []);

  const handleEdit = (id) => {
    navigate(`/home/transactions/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/transactions/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar transação');
      }

      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Erro ao deletar transação:', error);
    }
  };

  return (
    <div className='container d-flex flex-column py-5 justify-content align-items-center vh-100'>
      <h2 className='mb-5'>Lista de Transações</h2>
      <Table data={items} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ListPage;
