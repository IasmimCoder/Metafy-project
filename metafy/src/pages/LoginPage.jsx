/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      navigate('/'); // Redireciona para a lista após a criação
    } catch (error) {
      console.error('Erro ao criar transação:', error);
    }
  };

  return (
    <div className='container flex-column py-5 justify-content align-items-center vh-100'>
      <h2>Login</h2>
      <Login onSubmit={handleCreate} />
    </div>
  );
};

export default CreatePage;
