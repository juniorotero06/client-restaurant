import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Layout from "../../containers/layout/index";
import DataTable from "../../components/DataTable";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ENDPOINTS, axiosConfig } from "../../config/api";
import "./ingredients.css";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(ENDPOINTS.KITCHEN.GET_INGREDIENTS, axiosConfig);
      setIngredients(response.data);
    } catch (error) {
      console.error("Error al cargar los ingredientes", error);
      toast.error("Error al cargar los ingredientes", {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Funciones auxiliares para el procesamiento de datos
  const getQuantityColor = (quantity) => {
    if (quantity <= 0) return '#f44336';
    if (quantity <= 5) return '#ff9800';
    return '#4caf50';
  };

  const getQuantityText = (quantity) => {
    if (quantity <= 0) return 'Sin Stock';
    if (quantity <= 5) return 'Bajo Stock';
    return 'Disponible';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Verduras': '#4caf50',
      'Frutas': '#ff9800',
      'Carnes': '#f44336',
      'Lácteos': '#2196f3',
      'Granos': '#9c27b0',
      'Especias': '#795548',
      'Otros': '#607d8b'
    };
    return colors[category] || '#607d8b';
  };

  // Configuración de columnas para DataTable
  const columns = [
    {
      key: 'name',
      header: 'Nombre',
      render: (item) => (
        <div className="ingredient-info">
          <div className="ingredient-name">{item.name}</div>
          <div className="ingredient-description">{item.description}</div>
        </div>
      ),
      cellStyle: { textAlign: 'left' }
    },
    {
      key: 'quantity',
      header: 'Cantidad',
      render: (item) => (
        <div className="d-flex flex-column align-items-center">
          <span className="quantity-number">{item.quantity}</span>
          <span 
            className="badge"
            style={{ 
              backgroundColor: getQuantityColor(item.quantity),
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '10px',
              marginTop: '2px'
            }}
          >
            {getQuantityText(item.quantity)}
          </span>
        </div>
      ),
      cellStyle: { textAlign: 'center' }
    },
    {
      key: 'category',
      header: 'Categoría',
      type: 'badge',
      getColor: getCategoryColor,
      getText: (value) => value || 'Sin categoría',
      cellStyle: { textAlign: 'center' }
    },
    {
      key: 'unitOfMeasure',
      header: 'Unidad',
      render: (item) => (
        <span className="unit-badge">
          {item.unitOfMeasure || 'Unidad'}
        </span>
      ),
      cellStyle: { textAlign: 'center' }
    },
    {
      key: 'origin',
      header: 'Origen',
      render: (item) => (
        <div className="origin-info">
          <i className="fas fa-map-marker-alt me-1"></i>
          {item.origin || 'No especificado'}
        </div>
      ),
      cellStyle: { textAlign: 'center' }
    },
    {
      key: 'acquisitionDate',
      header: 'Fecha Adquisición',
      type: 'date',
      cellStyle: { textAlign: 'center' }
    }
  ];

  // Configuración de filtros para DataTable
  const filters = [
    {
      key: 'searchTerm',
      label: 'Buscar',
      type: 'text',
      placeholder: 'Nombre o descripción...',
      width: 3
    },
    {
      key: 'category',
      label: 'Categoría',
      type: 'select',
      placeholder: 'Todas',
      options: [
        { value: 'Verduras', label: 'Verduras' },
        { value: 'Frutas', label: 'Frutas' },
        { value: 'Carnes', label: 'Carnes' },
        { value: 'Lácteos', label: 'Lácteos' },
        { value: 'Granos', label: 'Granos' },
        { value: 'Especias', label: 'Especias' },
        { value: 'Otros', label: 'Otros' }
      ],
      width: 2
    },
    {
      key: 'stock',
      label: 'Stock',
      type: 'select',
      placeholder: 'Todos',
      options: [
        { value: 'available', label: 'Disponible' },
        { value: 'low', label: 'Bajo Stock' },
        { value: 'out', label: 'Sin Stock' }
      ],
      width: 2
    },
    {
      key: 'dateFrom',
      label: 'Desde',
      type: 'date',
      dateType: 'from',
      width: 2
    },
    {
      key: 'dateTo',
      label: 'Hasta',
      type: 'date',
      dateType: 'to',
      width: 2
    }
  ];

  // Función para renderizar contenido expandido
  const renderExpandedContent = (ingredient) => {
    return (
      <div className="ingredient-details">
        <div className="row">
          <div className="col-md-6">
            <h6 className="mb-3">Información Detallada:</h6>
            <div className="detail-item">
              <strong>Descripción:</strong> {ingredient.description}
            </div>
            <div className="detail-item">
              <strong>Cantidad:</strong> {ingredient.quantity} {ingredient.unitOfMeasure || 'unidades'}
            </div>
            <div className="detail-item">
              <strong>Categoría:</strong> {ingredient.category || 'Sin categoría'}
            </div>
            <div className="detail-item">
              <strong>Origen:</strong> {ingredient.origin || 'No especificado'}
            </div>
          </div>
          <div className="col-md-6">
            <h6 className="mb-3">Fechas:</h6>
            <div className="detail-item">
              <strong>Adquisición:</strong> {ingredient.acquisitionDate ? new Date(ingredient.acquisitionDate).toLocaleDateString() : 'No especificada'}
            </div>
            <div className="detail-item">
              <strong>Vencimiento:</strong> {ingredient.expirationDate ? new Date(ingredient.expirationDate).toLocaleDateString() : 'No especificada'}
            </div>
            {ingredient.notes && (
              <div className="detail-item">
                <strong>Notas:</strong> {ingredient.notes}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout title="Inventario de Ingredientes">
      <Paper sx={{ maxWidth: 1400, margin: "auto", overflow: "hidden" }}>
        <ToastContainer />
        
        {/* Header con botones de acción */}
        <div className="ingredients-header" style={{ padding: '20px', borderBottom: '1px solid #e0e0e0' }}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-0">
                <i className="fas fa-carrot me-2"></i>
                Inventario de Ingredientes
              </h4>
              <p className="text-muted mb-0">Gestiona el inventario de ingredientes de la cocina</p>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={loadIngredients}
                disabled={isLoading}
              >
                <i className="fas fa-sync-alt me-2"></i>
                Actualizar
              </button>
              <button className="btn btn-success">
                <i className="fas fa-plus me-2"></i>
                Agregar Ingrediente
              </button>
            </div>
          </div>
        </div>

        <DataTable
          data={ingredients}
          columns={columns}
          title="Ingredientes Disponibles"
          loading={isLoading}
          emptyMessage="No se encontraron ingredientes con los filtros aplicados"
          showFilters={true}
          showPagination={true}
          itemsPerPage={15}
          expandable={true}
          renderExpandedContent={renderExpandedContent}
          filters={filters}
          className="ingredients-section"
        />
      </Paper>
    </Layout>
  );
};

export default Ingredients;
