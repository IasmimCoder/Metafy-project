import React from 'react';

const Table = ({ data, onEdit, onDelete }) => {
  return (
    <table className="table table-hover">
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
            <tr key={item.id} className="table-default">
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.type}</td>
              <td>{item.category.name}</td>
              <td>{item.date}</td>
              <td>R$ {item.value}</td>
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
