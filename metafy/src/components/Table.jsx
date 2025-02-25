import React from 'react';

const Table = ({ data, onEdit, onDelete }) => {
  return (
    <table border="1" width="100%" style={{ marginTop: '20px', textAlign: 'left' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
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
              <td>R$ {item.value}</td>
              <td>
                <button onClick={() => onEdit(item.id)}>Editar</button>
                <button onClick={() => onDelete(item.id)}>Excluir</button>
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
