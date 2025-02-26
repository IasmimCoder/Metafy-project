/* eslint-disable no-unused-vars */
import { Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Table from './components/Table';
import Form from './components/Form';
import ListPage from './pages/ListPage';
import CreatePage from './pages/CreatePage';
import CategoriaCreatePage from './pages/CategoriaCreatePage'
import EditPage from './pages/EditPage';
import ListCategoryPage from "./pages/ListCategoryPage"
import EditCategoryPage from "./pages/EditCategoryPage"

const App = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const handleAddOrUpdate = (data) => {
    if (editingItem) {
      setItems(items.map((item) => (item.id === editingItem.id ? { ...item, ...data } : item)));
      setEditingItem(null);
    } else {
      setItems([...items, { ...data, id: Date.now() }]);
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    setEditingItem(itemToEdit);
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <Header />
      <nav style={{ padding: '10px', display: 'flex', gap: '10px' }}>
        <Link to="/">Home</Link>
        <Link to="/createTransaction">Adicionar Transação</Link>
        <Link to="/categories">Listar Categorias</Link>
        <Link to="/categories/create">Adicionar Categoria</Link>
      </nav>
      <h1>Gerenciar Transações</h1>

      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/createTransaction" element={<CreatePage />} />
        <Route path="/categories" element={<ListCategoryPage />} />
        <Route path="/categories/create" element={<CategoriaCreatePage />}/>
        <Route path="/transactions/edit/:id" element={<EditPage />} />
        <Route path="/categories/edit/:id" element={<EditCategoryPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
