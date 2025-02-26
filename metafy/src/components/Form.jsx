import React, { useState, useEffect } from "react";

const Form = ({ onSubmit, initialData, categories }) => {
  const [formData, setFormData] = useState({
    title: "",
    value: "",
    description: "",
    type: "",
    date: null,
    category: null,
  });
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategoryId(selectedCategoryId);
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/categories")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategorias(data);
        } else if (data.categorias) {
          setCategorias(data.categorias);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Erro ao carregar categorias");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.category) {
        setSelectedCategoryId(initialData.category.id);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCategoryId) {
      alert("Por favor, selecione uma categoria!");
      return;
    }

    console.log("selectedCategoryId:", selectedCategoryId);
    console.log("categorias:", categorias);

    const selectedCategory = categorias.find(
      (cat) => String(cat.id) === String(selectedCategoryId)
    );

    if (!selectedCategory) {
      alert("Categoria inválida!");
      console.log("Categoria não encontrada", selectedCategoryId);
      return;
    }

    onSubmit({
      ...formData,
      category: selectedCategory,
    });
  };

  if (loading) return <p>Carregando categorias...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container flex-column mb-3 justify-content align-items-center vh-100">
      <form onSubmit={handleSubmit}>
        <label>Título:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />
        <label>Descrição:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />
        <label>Tipo:</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />
        <label>Data:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />

        <label>Valor:</label>
        <input
          type="number"
          name="value"
          value={formData.value}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />

        <label className="form-label">Categoria:</label>
        <select
          name="category"
          value={selectedCategoryId}
          onChange={handleCategoryChange}
          className="form-select mb-3"
          required
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.name}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
      </form>
    </div>
  );
};

export default Form;
