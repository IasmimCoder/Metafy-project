// src/pages/CadastroPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CadastroPage = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação simples
    if (senha !== confirmacaoSenha) {
      setError('As senhas não coincidem');
      return;
    }

    if (!nome || !email || !senha) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    // Aqui você pode fazer a lógica de cadastro (salvar no backend, por exemplo)
    // Neste caso, vamos apenas redirecionar para a página de login após o cadastro
    setError('');
    navigate('/login'); // Redireciona para a página de login após o cadastro
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Cadastro de Usuário</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmacaoSenha">Confirmar Senha</label>
          <input
            type="password"
            id="confirmacaoSenha"
            name="confirmacaoSenha"
            value={confirmacaoSenha}
            onChange={(e) => setConfirmacaoSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroPage;
