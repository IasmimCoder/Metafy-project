/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useTheme } from "../context/ThemeContext"; // Importando o ThemeContext

const FormTransaction = ({ onSubmit, initialData }) => {
  const { theme } = useTheme(); // Pegando o tema atual
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
      });
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
    <form
      onSubmit={handleSubmit}
      className={`p-4 rounded ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`} // Classe dinâmica para o formulário
    >
      <div className="mb-3">
        <label>Nome:</label>
        <input
          className={`form-control ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`} // Aplicando classes dinâmicas aos inputs
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Descrição:</label>
        <input
          className={`form-control ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`} // Aplicando classes dinâmicas aos inputs
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <button
        className={`btn ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`} // Botão também mudando de acordo com o tema
        type="submit"
      >
        Salvar
      </button>
    </form>
  );
};

export default FormTransaction;
