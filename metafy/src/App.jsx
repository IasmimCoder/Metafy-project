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
import UserRegistration from "./pages/UserRegistration";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (formData) => {
    // Aqui você pode adicionar a lógica de autenticação, se necessário.
    // Suponhamos que a autenticação tenha sido bem-sucedida:
    setIsAuthenticated(true);
  };

  return (
    <div>
      <Routes>
        {/* Rota de Cadastro sempre acessível */}
        <Route path="/cadastro" element={<UserRegistration />} />

        {/* Se não estiver autenticado, exibe Login */}
        {!isAuthenticated ? (
          <Route path="/*" element={<Login onSubmit={handleLogin} />} />
        ) : (
          <>
            <Route path="/*" element={<Home />} />
          </>
        )}
      </Routes>
    </div>
  );
};
<h1 className="text-3xl font-bold text-blue-500">Olá, Tailwind!</h1>

export default App;
