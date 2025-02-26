/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/TableCategory';
import api from '../services/api';

const ListPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get('/categories');
        setItems(response.data);
      } catch (error) {
        console.error('Erro ao buscar transações:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleEdit = (id) => {
    navigate(`/categories/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Erro ao deletar transação:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Categorias</h2>
      <Table data={items} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ListPage;
