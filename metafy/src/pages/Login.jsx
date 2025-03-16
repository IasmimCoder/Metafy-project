import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // Importando o hook do contexto
import { useTheme } from '../context/ThemeContext'; // Importando o ThemeContext

const Login = ({ onSubmit, initialData }) => {
  const { login } = useAuth();  // Obtendo a função login do contexto
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");  // Estado para armazenar erros de login
  const navigate = useNavigate();
  const { theme } = useTheme(); // Pegando o tema atual

  useEffect(() => {
    // Verificando se já existe um token no localStorage
    if (localStorage.getItem("token")) {
      navigate("/home"); // Redirecionando para a home se já estiver logado
    }
  }, [navigate]);
  
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
      });
      // Verificando a resposta da API
      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const data = await response.json();
      // Armazenando o token JWT no localStorage
      const { token, user } = data;  // Supondo que a API retorne o token e dados do usuário
      localStorage.setItem("token", token);  // Armazenando o token no localStorage
      login(token, user);  // Atualizando o estado global com o login

      // Redirecionando para a página de home após o login bem-sucedido
      navigate("/home");
    } catch (error) {
      setError(error.message);  // Exibindo mensagem de erro caso a autenticação falhe
    }
  };

  const handleCreate = async (data) => {
    try {
      navigate('/cadastro'); // Redireciona para a lista após a criação
    } catch (error) {
      console.error('Erro ao criar transação:', error);
    }
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
        </div>
      </nav>
      <div
        className={`container d-flex flex-column py-5 justify-content-center align-items-center mt-2 ${
          theme === 'dark' ? 'dark text-light' : 'light text-dark'
        }`}
      >
      <h1 className="mb-5">Login</h1>
        <form
          onSubmit={handleSubmit}
        >
          <label>Email:</label>
          <input
            className="form-control mb-3"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password:</label>
          <input
            className="form-control mb-3"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button className="btn btn-info w-100" type="submit">
            Login
          </button>
        </form>
        <form>
          <button className="btn btn-primary" onClick={handleCreate}>
            Cadastrar
          </button>
        </form>
        {error && <div className="text-danger">{error}</div>}  {/* Exibindo erro, caso exista */}
      </div>
    </div>
  );
};

export default Login;
