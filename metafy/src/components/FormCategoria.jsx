
import React, { useState, useEffect } from 'react';

const Form = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({name :'', description:''});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nome:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />

      <label>Descrição:</label>
      <input type='text' name="description" value={formData.description} onChange={handleChange} required />

      <button type="submit">Salvar</button>
    </form>
  );
};

export default Form;