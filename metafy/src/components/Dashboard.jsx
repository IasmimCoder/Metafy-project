import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Dashboard = () => {
  const { tema, alternarTema } = useContext(ThemeContext); // Acessando o tema e a função de alternância

  return (
    <div style={{ background: tema === "light" ? "#fff" : "#333", color: tema === "light" ? "#000" : "#fff", padding: "20px" }}>
      <h1>Dashboard - Tema Atual: {tema}</h1>
      <button onClick={alternarTema}>Alternar Tema</button>
      {/* Aqui você pode adicionar outros conteúdos do seu site */}
    </div>
  );
};

export default Dashboard;
