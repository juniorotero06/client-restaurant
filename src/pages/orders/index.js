import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Layout from "../../containers/layout/index";
import CircularIndeterminate from "../../components/spinner/spinner";
import DataTable from "../../components/DataTable";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ENDPOINTS } from "../../config/api";
import "./orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [ordersInProgress, setOrdersInProgress] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const [allOrders, inProgress, completed] = await Promise.all([
        axios.get(ENDPOINTS.KITCHEN.GET_ORDERS),
        axios.get(ENDPOINTS.KITCHEN.GET_ORDERS_IN_PROGRESS),
        axios.get(ENDPOINTS.KITCHEN.GET_ORDERS_COMPLETED)
      ]);

      setOrders(allOrders.data);
      setOrdersInProgress(inProgress.data);
      setCompletedOrders(completed.data);
    } catch (error) {
      console.error("Error al cargar las órdenes", error);
      toast.error("Error al cargar las órdenes", {
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
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return '#ff9800';
      case 'in_progress':
      case 'in-progress':
        return '#2196f3';
      case 'completed':
        return '#4caf50';
      case 'failed':
        return '#f44336';
      default:
        return '#757575';
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'Pendiente';
      case 'in_progress':
      case 'in-progress':
        return 'En Progreso';
      case 'completed':
        return 'Completado';
      case 'failed':
        return 'Fallido';
      default:
        return status || 'Desconocido';
    }
  };

  const getFirstRecipeName = (order) => {
    if (order.recipes && order.recipes.length > 0) {
      return order.recipes[0].name;
    }
    return 'Receta no disponible';
  };

  const getTotalRecipes = (order) => {
    return order.recipes ? order.recipes.length : 0;
  };

  const getSuccessfulRecipes = (order) => {
    if (!order.results) return 0;
    return order.results.filter(result => result.success).length;
  };

  // Configuración de columnas para DataTable
  const columns = [
    {
      key: 'id',
      header: 'ID',
      type: 'code',
      cellStyle: { textAlign: 'center' }
    },
    {
      key: 'recipes',
      header: 'Recetas',
      render: (item) => (
        <div className="recipe-info">
          <div className="recipe-name">{getFirstRecipeName(item)}</div>
          <div className="recipe-description">
            {getTotalRecipes(item)} receta{getTotalRecipes(item) !== 1 ? 's' : ''} en total
          </div>
        </div>
      ),
      cellStyle: { textAlign: 'left' }
    },
    {
      key: 'status',
      header: 'Estado',
      type: 'badge',
      getColor: getStatusColor,
      getText: getStatusText,
      cellStyle: { textAlign: 'center' }
    },
    {
      key: 'success',
      header: 'Éxito',
      render: (item) => (
        <div className="d-flex flex-column align-items-center">
          <span 
            className="badge"
            style={{ 
              backgroundColor: getSuccessfulRecipes(item) > 0 ? '#4caf50' : '#f44336',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '10px',
              marginBottom: '2px'
            }}
          >
            {getSuccessfulRecipes(item)}/{getTotalRecipes(item)} exitosas
          </span>
        </div>
      ),
      cellStyle: { textAlign: 'center' }
    },
    {
      key: 'createdAt',
      header: 'Fecha Creación',
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
      placeholder: 'ID o receta...',
      width: 2
    },
    {
      key: 'status',
      label: 'Estado',
      type: 'select',
      placeholder: 'Todos',
      options: [
        { value: 'pending', label: 'Pendiente' },
        { value: 'in_progress', label: 'En Progreso' },
        { value: 'completed', label: 'Completado' },
        { value: 'failed', label: 'Fallido' }
      ],
      width: 2
    },
    {
      key: 'recipe',
      label: 'Receta',
      type: 'text',
      placeholder: 'Nombre de receta...',
      width: 2
    },
    {
      key: 'success',
      label: 'Éxito',
      type: 'select',
      placeholder: 'Todos',
      options: [
        { value: 'true', label: 'Exitosos' },
        { value: 'false', label: 'Fallidos' }
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
  const renderExpandedContent = (order) => {
    if (!order.results || order.results.length === 0) {
      return (
        <div className="order-details">
          <p className="text-muted">No hay resultados disponibles para esta orden.</p>
        </div>
      );
    }

    return (
      <div className="order-details">
        <h6 className="mb-3">Resultados del Procesamiento:</h6>
        <div className="row">
          {order.results.map((result, index) => (
            <div key={index} className="col-md-6 mb-3">
              <div className={`card ${result.success ? 'border-success' : 'border-danger'}`}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="card-title mb-0">{result.recipe.name}</h6>
                    <span 
                      className={`badge ${result.success ? 'bg-success' : 'bg-danger'}`}
                      style={{ fontSize: '10px' }}
                    >
                      {result.success ? 'Exitoso' : 'Fallido'}
                    </span>
                  </div>
                  <p className="card-text small text-muted mb-2">
                    {result.recipe.description}
                  </p>
                  <div className="ingredients-list">
                    <small className="text-muted">Ingredientes:</small>
                    <div className="d-flex flex-wrap gap-1 mt-1">
                      {result.recipe.ingredients.map((ingredient, idx) => (
                        <span key={idx} className="badge bg-light text-dark" style={{ fontSize: '10px' }}>
                          {ingredient.name} ({ingredient.quantity})
                        </span>
                      ))}
                    </div>
                  </div>
                  {result.message && (
                    <div className="mt-2">
                      <small className={`text-${result.success ? 'success' : 'danger'}`}>
                        {result.message}
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Función para acciones personalizadas
  const customActions = (order) => (
    <button
      className="btn btn-sm btn-outline-info"
      title="Ver detalles"
    >
      <i className="fas fa-eye"></i>
    </button>
  );

  // Obtener datos según el tab activo
  const getCurrentData = () => {
    let data;
    switch (activeTab) {
      case 'all':
        data = orders;
        break;
      case 'in-progress':
        data = ordersInProgress;
        break;
      case 'completed':
        data = completedOrders;
        break;
      default:
        data = orders;
    }
    
    // Ordenar por fecha de creación (más recientes primero)
    return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  // Obtener título según el tab activo
  const getCurrentTitle = () => {
    switch (activeTab) {
      case 'all':
        return 'Todas las Órdenes';
      case 'in-progress':
        return 'Órdenes en Progreso';
      case 'completed':
        return 'Órdenes Completadas';
      default:
        return 'Todas las Órdenes';
    }
  };

  return (
    <Layout title="Órdenes del Sistema">
      <Paper sx={{ maxWidth: 1400, margin: "auto", overflow: "hidden" }}>
        <ToastContainer />

        <DataTable
          data={getCurrentData()}
          columns={columns}
          title={getCurrentTitle()}
          loading={isLoading}
          emptyMessage="No se encontraron órdenes con los filtros aplicados"
          showFilters={true}
          showPagination={true}
          itemsPerPage={10}
          expandable={true}
          renderExpandedContent={renderExpandedContent}
          filters={filters}
          className="orders-section"
        />
      </Paper>
    </Layout>
  );
};

export default Orders; 