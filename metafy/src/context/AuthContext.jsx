import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";  // Importe o hook de autenticação

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const { login } = useAuth();  // Obtenha a função de login
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verifique as credenciais (por exemplo, chamando uma API)
    if (credentials.username === "admin" && credentials.password === "admin") {
      login(); // Chama a função login
    } else {
      setError("Credenciais inválidas");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button type="submit">Login</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
