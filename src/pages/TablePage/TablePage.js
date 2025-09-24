import React from 'react';
import './TablePage.css';

const TablePage = () => {
  // Создаем простую таблицу 4x4
  const rows = 4;
  const cols = 4;

  return (
    <div className="table-page">
      <h1>Таблица</h1>
      
      <table>
        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: cols }, (_, colIndex) => (
                <td key={colIndex}>
                  {rowIndex + 1}-{colIndex + 1}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePage;
