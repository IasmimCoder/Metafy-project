import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const UserRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    email: "",
    password: "",
    sexo: "",
    creationDate: "",
  });

  const handleChange = (e) => {
    console.log(
      "Campo alterado:",
      e.target.name,
      "Novo valor:",
      e.target.value
    ); // 🔍 Verificando valores
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Dados sendo enviados:", formData); // 🔍 Log antes de enviar

    try {
      await api.post(
        "http://localhost:8080/api/users/cadastrarUsuario",
        formData
      );
      alert("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar. Tente novamente.");
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
      <div className="container mt-5">
        <div className="card p-4 shadow">
          <h2 className="text-center">Cadastro de Usuário</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">CPF</label>
              <input
                type="text"
                className="form-control"
                name="cpf"
                value={formData.cpf || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Sexo</label>
              <select
                className="form-select"
                name="sexo"
                value={formData.sexo || ""}
                onChange={handleChange}
                required
              >
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Data de Criação</label>
              <input
                type="date"
                className="form-control"
                name="creationDate"
                value={formData.creationDate || ""}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
