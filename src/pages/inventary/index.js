import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Layout from "../../containers/layout/index";
import CircularIndeterminate from "../../components/spinner/spinner";
import DataTable from "../../components/DataTable";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./inventary.css";
import { ENDPOINTS, axiosConfig } from "../../config/api";

const Inventary = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getStoreData = () => {
      setIsLoading(true);
      axios
        .get(ENDPOINTS.KITCHEN.GET_INGREDIENTS, axiosConfig)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error al cargar el Inventario", error);
          toast.error("Error al cargar el Inventario", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    getStoreData();
  }, []);

  // Obtener categorías únicas
  const getUniqueCategories = () => {
    const categories = [...new Set(data.map(item => item.category))];
    return categories.sort();
  };

  // Obtener color para el nivel de stock
  const getStockColor = (quantity) => {
    if (quantity <= 1) return '#f44336'; // Rojo para stock crítico (1 o menos)
    if (quantity <= 2) return '#ff9800'; // Naranja para stock bajo (2)
    return '#4caf50'; // Verde para stock normal (3 o más)
  };

  // Obtener texto para el estado de stock
  const getStockText = (quantity) => {
    if (quantity <= 1) return 'Crítico';
    if (quantity <= 2) return 'Bajo';
    return 'Normal';
  };

  // Configuración de columnas para DataTable
  const columns = [
    {
      key: 'name',
      header: 'Nombre',
      render: (item) => (
        <strong className="ingredient-name">{item.name}</strong>
      ),
      cellStyle: { textAlign: 'left' }
    },
    {
      key: 'description',
      header: 'Descripción',
      render: (item) => (
        <div className="ingredient-description">
          {item.description}
        </div>
      ),
      cellStyle: { textAlign: 'left' }
    },
    {
      key: 'category',
      header: 'Categoría',
      type: 'badge',
      getColor: () => '#6c757d',
      getText: (value) => value || 'Sin categoría',
      cellStyle: { textAlign: 'center' }
    },
    {
      key: 'quantity',
      header: 'Cantidad',
      render: (item) => (
        <span 
          style={{ 
            color: 'white', 
            backgroundColor: getStockColor(item.quantity),
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          {item.quantity}
        </span>
      ),
      cellStyle: { textAlign: 'center' }
    },
    {
      key: 'unitOfMeasure',
      header: 'Unidad de Medida',
      render: (item) => (
        <span className="unit-badge">
          {item.unitOfMeasure || 'Unidad'}
        </span>
      ),
      cellStyle: { textAlign: 'center' }
    },
    {
      key: 'quantity',
      header: 'Estado',
      render: (item) => (
        <span 
          style={{ 
            color: 'white', 
            backgroundColor: getStockColor(item.quantity),
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500'
          }}
        >
          {getStockText(item.quantity)}
        </span>
      ),
      cellStyle: { textAlign: 'center' }
    }
  ];

  // Configuración de filtros para DataTable
  const filters = [
    {
      key: 'searchTerm',
      label: 'Buscar',
      type: 'text',
      placeholder: 'Nombre, descripción...',
      width: 2
    },
    {
      key: 'name',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Nombre específico...',
      width: 2
    },
    {
      key: 'category',
      label: 'Categoría',
      type: 'select',
      placeholder: 'Todas',
      options: getUniqueCategories().map(category => ({
        value: category,
        label: category
      })),
      width: 2
    },
    {
      key: 'stock',
      label: 'Stock',
      type: 'select',
      placeholder: 'Todos',
      options: [
        { value: 'critical', label: 'Crítico (≤1)' },
        { value: 'low', label: 'Bajo (≤2)' },
        { value: 'normal', label: 'Normal (>2)' }
      ],
      width: 2
    }
  ];

  // Función para renderizar contenido expandido
  const renderExpandedContent = (ingredient) => {
    return (
      <div className="ingredient-details-expanded">
        <div className="row">
          <div className="col-md-6">
            <h6 className="mb-3">Información del Ingrediente:</h6>
            <div className="detail-item">
              <strong>Nombre:</strong> {ingredient.name}
            </div>
            <div className="detail-item">
              <strong>Categoría:</strong> {ingredient.category || 'Sin categoría'}
            </div>
            <div className="detail-item">
              <strong>Cantidad:</strong> {ingredient.quantity} {ingredient.unitOfMeasure || 'unidades'}
            </div>
            <div className="detail-item">
              <strong>Estado:</strong> {getStockText(ingredient.quantity)}
            </div>
          </div>
          <div className="col-md-6">
            <h6 className="mb-3">Información Adicional:</h6>
            <div className="detail-item">
              <strong>Descripción:</strong> {ingredient.description}
            </div>
            <div className="detail-item">
              <strong>Unidad de Medida:</strong> {ingredient.unitOfMeasure || 'No especificada'}
            </div>
            {ingredient.origin && (
              <div className="detail-item">
                <strong>Origen:</strong> {ingredient.origin}
              </div>
            )}
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
    <Layout title="Inventario">
      <Paper sx={{ maxWidth: 1400, margin: "auto", overflow: "hidden" }}>
        <ToastContainer />
        <div className="inventary-container">
          <DataTable
            data={data}
            columns={columns}
            title="Inventario"
            loading={isLoading}
            emptyMessage="No se encontraron ingredientes con los filtros aplicados"
            showFilters={true}
            showPagination={true}
            itemsPerPage={10}
            expandable={true}
            renderExpandedContent={renderExpandedContent}
            filters={filters}
            className="inventory-section"
          />
        </div>
      </Paper>
    </Layout>
  );
};

export default Inventary;
