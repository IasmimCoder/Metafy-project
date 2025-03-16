import { Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserRegistration from "./pages/UserRegistration";

import { AuthProvider, useAuth } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <RoutesWrapper />
    </AuthProvider>
  );
};

const RoutesWrapper = () => {
  const { isAuthenticated } = useAuth(); // Agora, usando o hook do contexto para verificar a autenticação.

  return (
    <div>
      <Routes>
        {/* Rota de Cadastro sempre acessível */}
        <Route path="/cadastro" element={<UserRegistration />} />

        {/* Se não estiver autenticado, exibe Login */}
        {!isAuthenticated ? (
          <Route path="/*" element={<Login />} />
        ) : (
          <>
            <Route path="/*" element={<Home />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;