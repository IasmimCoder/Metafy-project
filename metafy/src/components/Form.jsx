import React, { useState } from 'react';

const Form = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || { nome: '', valor: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={formData.nome}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="valor"
        placeholder="Valor"
        value={formData.valor}
        onChange={handleChange}
        required
      />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default Form;
