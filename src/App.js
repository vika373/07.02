import React, { useEffect, useState, useMemo } from 'react';
import './styles.css';  // Подключение стилей

const PageSize = 20;  // Количество элементов на одной странице

const DataTableWithPagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://dummyjson.com/products?limit=10000');
      const result = await response.json();
      setData(result.products);
    };

    fetchData();
  }, []);

  // Определяем данные для текущей страницы с использованием useMemo для оптимизации
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * PageSize;
    const endIndex = startIndex + PageSize;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage]);

  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / PageSize)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(data.length / PageSize); // Общее количество страниц

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Цена</th>
            <th>Категория</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Предыдущая
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Следующая
        </button>
      </div>
    </div>
  );
};

export default DataTableWithPagination;