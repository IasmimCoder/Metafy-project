/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const FormMeta = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goalValue: 0,
    completed : false
  });

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
      <label>Título:</label>
      <input
        className="form-control mb-3"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label>Descrição:</label>
      <input
        className="form-control mb-3"
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <label>Valor da Meta:</label>
      <input
        type="number"
        name="goalValue"
        value={formData.goalValue}
        onChange={handleChange}
        className="form-control mb-3"
        required
      />

      <label>Data Início:</label>
      <input
        type="date"
        name="startDate" // Corrigido para refletir o nome do backend
        value={formData.startDate}
        onChange={handleChange}
        className="form-control mb-3"
        required
      />

      <label>Data final:</label>
      <input
        type="date"
        name="deadline" // Corrigido para refletir o nome do backend
        value={formData.deadline}
        onChange={handleChange}
        className="form-control mb-3"
        required
      />

      <button className="btn btn-primary " type="submit">
        Salvar
      </button>
    </form>
  );
};

export default FormMeta;
