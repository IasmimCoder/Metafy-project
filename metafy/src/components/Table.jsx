import React from "react";
import { useTheme } from "../context/ThemeContext"; // Importando o useTheme

const Table = ({ data, onEdit, onDelete }) => {
  const { theme } = useTheme(); // Pegando o tema atual e a função de alternância

  return (
    <table className={`table table-hover ${theme === 'dark' ? 'table-dark' : 'table-light'}`}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Tipo</th>
          <th>Categoria</th>
          <th>Data</th>
          <th>Valor</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.type}</td>
              <td>{item.categoryName}</td>
              <td>{item.date}</td>
              <td>R$ {item.value}</td>
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
            <td colSpan="7">Nenhum registro encontrado</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
