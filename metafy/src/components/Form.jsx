import React, { useState, useEffect } from 'react';

const Form = ({ onSubmit, initialData, categories }) => {
  const [formData, setFormData] = useState({ title: '', value: '', category: null });
  const [categorias, setCategorias] = useState([]); // Estado para armazenar as categorias
  const [loading, setLoading] = useState(true); // Para verificar se os dados estão sendo carregados
  const [error, setError] = useState(null); // Para lidar com possíveis erros na requisição
  const [selectedCategoryId, setSelectedCategoryId] = useState(''); // Estado para armazenar o ID da categoria selecionada

  // Função para lidar com o evento de mudança na categoria
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value; // Pega o ID da categoria selecionada
    setSelectedCategoryId(selectedCategoryId); // Atualiza o ID da categoria no estado
  };

  // Carregar categorias quando o componente for montado
  useEffect(() => {
    fetch('http://localhost:8080/api/categories') // Substitua pela URL do seu backend
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategorias(data); // Supondo que a resposta seja um array de categorias
        } else if (data.categorias) {
          setCategorias(data.categorias); // Caso o array esteja dentro de uma chave "categorias"
        }
        setLoading(false); // Dados carregados
      })
      .catch((err) => {
        setError('Erro ao carregar categorias');
        setLoading(false); // Dados carregados, mas com erro
      });
  }, []);

  // Atualiza os dados do formulário quando o `initialData` for passado
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.category) {
        setSelectedCategoryId(initialData.category.id); // Sincroniza com o ID da categoria
      }
    }
  }, [initialData]);

  // Função para lidar com as mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Função para enviar os dados do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar se a categoria foi selecionada
    if (!selectedCategoryId) {
      alert('Por favor, selecione uma categoria!');
      return;
    }

    // Vamos logar para ver o que está acontecendo
    console.log('selectedCategoryId:', selectedCategoryId); // Verifique o valor de selectedCategoryId
    console.log('categorias:', categorias); // Veja as categorias disponíveis

    // Encontra o objeto completo da categoria a partir do selectedCategoryId
    const selectedCategory = categorias.find(
      (cat) => String(cat.id) === String(selectedCategoryId) // Convertendo ambos para string para garantir a correspondência
    );

    // Se não encontrou a categoria, mostra erro
    if (!selectedCategory) {
      alert('Categoria inválida!');
      console.log('Categoria não encontrada', selectedCategoryId);
      return;
    }

    // Envia os dados do formulário, incluindo o objeto completo da categoria
    onSubmit({
      ...formData,
      category: selectedCategory, // Passa o objeto completo da categoria
    });
  };

  if (loading) return <p>Carregando categorias...</p>; // Exibe "Carregando" enquanto espera os dados
  if (error) return <p>{error}</p>; // Exibe erro caso a requisição falhe

  return (
    <form onSubmit={handleSubmit}>
      <label>Título:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label>Valor:</label>
      <input
        type="number"
        name="value"
        value={formData.value}
        onChange={handleChange}
        required
      />

      <label>Categoria:</label>
      <select
        name="category"
        value={selectedCategoryId} // Agora está sincronizado com o ID da categoria
        onChange={handleCategoryChange}
        required
      >
        <option value="">Selecione uma categoria</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.name}
          </option>
        ))}
      </select>

      <button type="submit">Salvar</button>
    </form>
  );
};

export default Form;
