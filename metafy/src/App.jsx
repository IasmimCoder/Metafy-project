/* eslint-disable no-unused-vars */
import { Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Table from './components/Table';
import Form from './components/Form';
import ListPage from './pages/ListPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';

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
      <h2>Gerenciar Transações</h2>
      <Form onSubmit={handleAddOrUpdate} initialData={editingItem} />
      <Table data={items} onEdit={handleEdit} onDelete={handleDelete} />
      
      <nav style={{ padding: '10px', display: 'flex', gap: '10px' }}>
        <Link to="/">Home</Link>
        <Link to="/create">Adicionar Transação</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
