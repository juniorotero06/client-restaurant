import React, { useState, useEffect } from "react";
import "./DataTable.css";

const DataTable = ({
  data = [],
  columns = [],
  title = "Tabla de Datos",
  loading = false,
  emptyMessage = "No se encontraron datos",
  showFilters = true,
  showPagination = true,
  itemsPerPage = 10,
  expandable = false,
  renderExpandedContent = null,
  filters = [],
  onFilterChange = null,
  onClearFilters = null,
  customActions = null,
  className = "",
  ...props
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const [filterValues, setFilterValues] = useState({});

  // Inicializar filtros
  useEffect(() => {
    if (filters.length > 0) {
      const initialFilters = {};
      filters.forEach(filter => {
        initialFilters[filter.key] = filter.defaultValue || '';
      });
      setFilterValues(initialFilters);
    }
  }, [filters]);

  // Calcular paginación
  useEffect(() => {
    const filteredData = getFilteredData();
    const total = filteredData.length;
    setTotalPages(Math.ceil(total / itemsPerPage));
    setCurrentPage(1);
  }, [data, filterValues, itemsPerPage]);

  // Obtener datos filtrados
  const getFilteredData = () => {
    let filtered = [...data];

    // Aplicar filtros
    Object.keys(filterValues).forEach(filterKey => {
      const filterValue = filterValues[filterKey];
      if (filterValue && filterValue !== '') {
        const filterConfig = filters.find(f => f.key === filterKey);
        if (filterConfig) {
          filtered = filtered.filter(item => {
            const itemValue = filterConfig.getValue ? filterConfig.getValue(item) : item[filterKey];
            if (filterConfig.type === 'select') {
              return itemValue?.toString().toLowerCase() === filterValue.toLowerCase();
            } else if (filterConfig.type === 'date') {
              const itemDate = new Date(itemValue);
              const filterDate = new Date(filterValue);
              if (filterConfig.dateType === 'from') {
                return itemDate >= filterDate;
              } else if (filterConfig.dateType === 'to') {
                filterDate.setHours(23, 59, 59);
                return itemDate <= filterDate;
              }
            } else {
              return itemValue?.toString().toLowerCase().includes(filterValue.toLowerCase());
            }
            return true;
          });
        }
      }
    });

    return filtered;
  };

  // Obtener datos paginados
  const getPaginatedData = () => {
    const filteredData = getFilteredData();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  // Manejar cambios en filtros
  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...filterValues, [filterKey]: value };
    setFilterValues(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  // Limpiar filtros
  const clearFilters = () => {
    const clearedFilters = {};
    filters.forEach(filter => {
      clearedFilters[filter.key] = filter.defaultValue || '';
    });
    setFilterValues(clearedFilters);
    if (onClearFilters) {
      onClearFilters();
    }
  };

  // Toggle expandir fila
  const toggleRowExpansion = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  // Renderizar filtros
  const renderFilters = () => {
    if (!showFilters || filters.length === 0) return null;

    return (
      <div className="filters-container">
        <div className="row">
          {filters.map((filter, index) => (
            <div key={filter.key} className={`col-md-${filter.width || 2} filter-group`}>
              <label className="form-label">{filter.label}:</label>
              {filter.type === 'select' ? (
                <select
                  className="form-select"
                  value={filterValues[filter.key] || ''}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                >
                  <option value="">{filter.placeholder || 'Todos'}</option>
                  {filter.options?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : filter.type === 'date' ? (
                <input
                  type="date"
                  className="form-control"
                  value={filterValues[filter.key] || ''}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  placeholder={filter.placeholder}
                />
              ) : (
                <input
                  type="text"
                  className="form-control"
                  value={filterValues[filter.key] || ''}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  placeholder={filter.placeholder}
                />
              )}
            </div>
          ))}
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <button
              className="btn btn-outline-secondary"
              onClick={clearFilters}
            >
              <i className="fas fa-broom me-2"></i>
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar paginación
  const renderPagination = () => {
    if (!showPagination) return null;

    const filteredData = getFilteredData();
    const totalItems = filteredData.length;
    
    if (totalItems <= itemsPerPage) return null;

    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination-container">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems} elementos
          </div>
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  title="Página anterior"
                >
                  Prev
                </button>
              </li>
              
              {startPage > 1 && (
                <>
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(1)}
                    >
                      1
                    </button>
                  </li>
                  {startPage > 2 && (
                    <li className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  )}
                </>
              )}
              
              {pageNumbers.map(number => (
                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
              
              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && (
                    <li className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  )}
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </button>
                  </li>
                </>
              )}
              
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  title="Página siguiente"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  };

  // Renderizar celda
  const renderCell = (item, column) => {
    if (column.render) {
      return column.render(item, column);
    }

    const value = column.key ? item[column.key] : item;
    
    if (column.type === 'badge') {
      return (
        <span 
          className="badge"
          style={{ 
            backgroundColor: column.getColor ? column.getColor(value) : '#007bff',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '600'
          }}
        >
          {column.getText ? column.getText(value) : value}
        </span>
      );
    }

    if (column.type === 'code') {
      return <code className="text-primary">{value}</code>;
    }

    if (column.type === 'date') {
      return (
        <div className="date-info">
          {new Date(value).toLocaleDateString()}
          <br />
          <small>{new Date(value).toLocaleTimeString()}</small>
        </div>
      );
    }

    return value;
  };

  // Renderizar tabla
  const renderTable = () => {
    const paginatedData = getPaginatedData();
    const totalItems = getFilteredData().length;

    return (
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              {expandable && (
                <th style={{ width: '50px' }}></th>
              )}
              {columns.map((column, index) => (
                <th key={index} style={column.headerStyle}>
                  {column.header}
                </th>
              ))}
              {customActions && (
                <th style={{ width: '100px' }}>Acciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <React.Fragment key={item.id || index}>
                  <tr style={{ textAlign: "center" }}>
                    {expandable && (
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => toggleRowExpansion(item.id || index)}
                        >
                          <i className={`fas fa-${expandedRow === (item.id || index) ? 'minus' : 'plus'}`}></i>
                        </button>
                      </td>
                    )}
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} style={column.cellStyle}>
                        {renderCell(item, column)}
                      </td>
                    ))}
                    {customActions && (
                      <td>
                        {customActions(item)}
                      </td>
                    )}
                  </tr>
                  {expandable && expandedRow === (item.id || index) && renderExpandedContent && (
                    <tr>
                      <td colSpan={columns.length + (customActions ? 2 : 1)} className="p-0">
                        <div className="row-expansion">
                          {renderExpandedContent(item)}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (expandable ? 1 : 0) + (customActions ? 1 : 0)} className="text-center empty-state">
                  <div className="py-4">
                    <i className="fas fa-search fa-2x text-muted mb-3"></i>
                    <p className="text-muted">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={`data-table-container ${className}`} {...props}>
      <h3 className="text-center mt-4 mb-4 page-title">
        {title} ({getFilteredData().length} elementos)
      </h3>
      
      {renderFilters()}
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }} className="loading-state">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Cargando datos...</p>
        </div>
      ) : (
        renderTable()
      )}
      
      {renderPagination()}
    </div>
  );
};

export default DataTable;
