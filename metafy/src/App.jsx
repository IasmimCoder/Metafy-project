/* eslint-disable no-unused-vars */
import { Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import Footer from "./components/Footer";
import Table from "./components/Table";
import Form from "./components/Form";
import ListPage from "./pages/ListPage";
import CreatePage from "./pages/CreatePage";
import CategoriaCreatePage from "./pages/CategoriaCreatePage";
import EditPage from "./pages/EditPage";
import ListCategoryPage from "./pages/ListCategoryPage";
import EditCategoryPage from "./pages/EditCategoryPage";
import "bootswatch/dist/lux/bootstrap.min.css";
import CreateMeta from "./pages/CreateMeta";
import Login from "./components/Login";
import Home from "./pages/Home";

const App = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (formData) => {
    // Aqui você pode adicionar a lógica de autenticação, se necessário.
    // Suponhamos que a autenticação tenha sido bem-sucedida:
    setIsAuthenticated(true);
  };

  const handleAddOrUpdate = (data) => {
    if (editingItem) {
      setItems(
        items.map((item) =>
          item.id === editingItem.id ? { ...item, ...data } : item
        )
      );
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
      {!isAuthenticated ? (
          <Login onSubmit={handleLogin} />
        ) : (
          <Routes>
            <Route path="/*" element={<Home />} />
          </Routes>
      )}

    </div>
  );
};

export default App;

