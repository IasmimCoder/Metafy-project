import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Footer from "../components/Footer";  // Importando corretamente o Footer
import ListPage from "../pages/ListPage";
import ListGoalsPage from "./ListGoalsPAge";
import CreatePage from "./CreateTransactionPage";
import CategoriaCreatePage from "../pages/CategoriaCreatePage";
import EditTransactionPage from "./EditTransactionPage";
import ListCategoryPage from "../pages/ListCategoryPage";
import EditCategoryPage from "../pages/EditCategoryPage";
import EditGoalPage from "./EditGoalPage";
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
    <div className="d-flex flex-column min-vh-100">
      <Navbar />  {/* Usando o Navbar como componente separado */}
      
      <div className="flex-grow-1 pb-5">  {/* Aumentando o padding inferior */}
        <Routes>
          <Route path="/home/" element={<ListPage />} />
          <Route path="/home/createTransaction" element={<CreatePage />} />
          <Route path="/home/categories" element={<ListCategoryPage />} />
          <Route path="/home/categories/create" element={<CategoriaCreatePage />} />
          <Route path="/home/transactions/edit/:id" element={<EditTransactionPage />} />
          <Route path="/home/categories/edit/:id" element={<EditCategoryPage />} />
          <Route path="/home/goals/edit/:id" element={<EditGoalPage />} />
          <Route path="/home/goals/create" element={<CreateMeta />} />
          <Route path="/home/goals" element={<ListGoalsPage />} />
        </Routes>
      </div>

      {/* O Footer aqui */}
      <Footer />
    </div>
  );
};

export default Home;
