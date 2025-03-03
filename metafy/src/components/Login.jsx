import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui, você pode chamar uma função onSubmit se precisar validar o login antes de redirecionar.
    // Supondo que a autenticação seja bem-sucedida:
    onSubmit(formData);
    // Navega para a página de listagem após o login
    navigate("/home");
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
      <div className="container flex-column py-5 justify-content align-items-center vh-100">
      <h1>Login</h1>
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

        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
      </div>
    </div>
  );
};

export default Login;
