import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext"; // Importando o ThemeContext

const FormTransaction = ({ onSubmit, initialData, categories }) => {
  const { theme, toggleTheme } = useTheme(); // Pegando o tema atual e a função de alternância
  
  const [formData, setFormData] = useState({
    title: "",
    value: "",
    description: "",
    type: "",
    date: "",
    category: "",
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
    const token = localStorage.getItem("token"); // Pegando o token do localStorage

    fetch("http://localhost:8080/api/categories", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // Adicionando o token ao cabeçalho
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar categorias");
        }
        return response.json();
      })
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

    const selectedCategory = categorias.find(
      (cat) => String(cat.id) === String(selectedCategoryId)
    );

    if (!selectedCategory) {
      alert("Categoria inválida!");
      return;
    }

        // Criando o transactionData com os dados do formulário e a categoria selecionada
    const transactionData = {
      ...formData,
      category: selectedCategory, // Adicionando a categoria selecionada
    };

    console.log("Dados que serão enviados:", transactionData);

    onSubmit(transactionData);

    // onSubmit({
    //   ...formData,
    //   category: selectedCategory,
    // });
  };

  if (loading) return <p>Carregando categorias...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  // Definindo classes baseadas no tema
  const formClasses = theme === 'dark' ? 'text-light' : 'text-dark'; // Alterei para bg-dark no modo escuro
  const buttonClasses = theme === 'dark' ? 'btn btn-outline-light w-50' : 'btn btn-primary w-50';
  const inputClasses = theme === 'dark' ? 'form-control bg-dark text-light border-light' : 'form-control bg-light text-dark border-dark';
  const selectClasses = theme === 'dark' ? 'form-select bg-dark text-light border-light' : 'form-select bg-light text-dark border-dark';

  return (
    <div className={`container d-flex flex-column justify-content-center align-items-center min-vh-100 ${formClasses} mt-4`}>
      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descrição:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Tipo:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Data:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="value" className="form-label">Valor:</label>
          <input
            type="number"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Categoria:</label>
          <select
            id="category"
            name="category"
            value={selectedCategoryId}
            onChange={handleCategoryChange}
            className={selectClasses}
            required
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.name}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <button type="submit" className={buttonClasses}>Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default FormTransaction;
