// Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext"; // Importando o ThemeContext
import { FaSun, FaMoon } from "react-icons/fa"; // Importando ícones do Font Awesome

import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme(); // Pegando o tema atual e a função de alternância
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={`navbar navbar-expand-lg ${theme === "dark" ? "bg-dark" : "bg-light"}`} data-bs-theme={theme}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
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
              <Link className="nav-link" to="/home/createTransaction">
                Adicionar Transação
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/home/categories">
                Listar Categorias
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/home/categories/create">
                Adicionar Categoria
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/home/goals">
                Listar Metas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/home/goals/create">
                Adicionar Meta
              </Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <button className="nav-link btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
          {/* Botão de alternância de tema */}
          <button className="btn theme-toggle-btn ms-2" onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />} {/* Ícones de Lua e Sol */}
            {theme === "light" ? " Dark Mode" : " Light Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
