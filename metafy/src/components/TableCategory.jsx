import React from 'react';

const Table = ({ data, onEdit, onDelete }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr key={item.id} className="table-default">
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <button className="btn btn-info" onClick={() => onEdit(item.id)}>Editar</button>
                <button className="btn btn-info" onClick={() => onDelete(item.id)}>Excluir</button>
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
