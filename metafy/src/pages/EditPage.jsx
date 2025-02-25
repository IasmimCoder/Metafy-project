/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from '../components/Form';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fakeData = [
      { id: 1, nome: 'Salário', valor: 5000 },
      { id: 2, nome: 'Aluguel', valor: -1500 },
    ];
    const item = fakeData.find((t) => t.id === parseInt(id));
    setInitialData(item || { nome: '', valor: '' });
  }, [id]);

  const handleSubmit = (data) => {
    console.log('Editado:', data);
    navigate('/');
  };

  return (
    <div>
      <h2>Editar Transação</h2>
      {initialData ? <Form onSubmit={handleSubmit} initialData={initialData} /> : <p>Carregando...</p>}
    </div>
  );
};

export default EditPage;
