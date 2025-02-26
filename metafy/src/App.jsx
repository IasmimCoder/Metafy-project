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
import "bootswatch/dist/united/bootstrap.min.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

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
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Metafy - Gestão Financeira
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/createTransaction">
                  Adicionar Transação
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories">
                  Listar Categorias
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories/create">
                  Adicionar Categoria
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/createTransaction" element={<CreatePage />} />
        <Route path="/categories" element={<ListCategoryPage />} />
        <Route path="/categories/create" element={<CategoriaCreatePage />} />
        <Route path="/transactions/edit/:id" element={<EditPage />} />
        <Route path="/categories/edit/:id" element={<EditCategoryPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
