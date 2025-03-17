import React from 'react';
import { useTheme } from "../context/ThemeContext"; // Importando o ThemeContext

const Table = ({ data, onEdit, onDelete }) => {
  const { theme } = useTheme(); // Pegando o tema atual e a função de alternância

  return (
    <table className={`table table-hover ${theme === 'dark' ? 'table-dark' : 'table-light'}`}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Descrição</th>
          <th>Valor da Meta</th>
          <th>Valor acumulado</th>
          <th>Data de Inicio</th>
          <th>Data Final</th>
          <th>Completo?</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr key={item.id} className="table-default">
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.goalValue}</td>
              <td>{item.accumulatedValue}</td>
              <td>{item.startDate}</td>
              <td>{item.deadline}</td>
              <td>{item.completed ? 'Sim' : 'Não'}</td>
              <td>
                <div className="d-flex gap-2">  {/* Usando flexbox para alinhar os botões */}
                  <button className="btn btn-primary btn-sm me-2" onClick={() => onEdit(item.id)}>
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => onDelete(item.id)}>
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">Nenhum registro encontrado</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
