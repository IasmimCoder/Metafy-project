/* eslint-disable no-unused-vars */
import { Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import Footer from "../components/Footer";
import ListPage from "../pages/ListPage";
import CreatePage from "../pages/CreatePage";
import CategoriaCreatePage from "../pages/CategoriaCreatePage";
import EditPage from "../pages/EditPage";
import ListCategoryPage from "../pages/ListCategoryPage";
import EditCategoryPage from "../pages/EditCategoryPage";
import "bootswatch/dist/lux/bootstrap.min.css";
import CreateMeta from "../pages/CreateMeta";
import Navbar from "../components/Navbar";

const Home = () => {
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
      <Navbar />  {/* Usando o Navbar como componente separado */}
      <Routes>
        <Route path="/home/" element={<ListPage />} />
        <Route path="/home/createTransaction" element={<CreatePage />} />
        <Route path="/home/categories" element={<ListCategoryPage />} />
        <Route path="/home/categories/create" element={<CategoriaCreatePage />} />
        <Route path="/home/transactions/edit/:id" element={<EditPage />} />
        <Route path="/home/categories/edit/:id" element={<EditCategoryPage />} />
        <Route path="/home/goals/create" element={<CreateMeta />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Home;
