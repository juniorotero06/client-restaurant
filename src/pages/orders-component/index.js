import React, { useState } from "react";
import Layout from "../../containers/layout/index";
import Paper from "@mui/material/Paper";
import CircularIndeterminate from "../../components/spinner/spinner";
import DataTable from "../../components/DataTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ENDPOINTS } from "../../config/api";
import "./orders-component.css";

function OrdersComponent() {
  const [ordersQuantity, setOrdersQuantity] = useState(1);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const toastProps = {
    autoClose: 4000,
    hideProgressBar: false,
    position: "top-right",
    pauseOnHover: true,
    icon: "🚀",
  };

  const toastPropsSuccess = {
    ...toastProps,
    position: "top-center",
  };

  const toastPropsError = {
    ...toastProps,
    position: "bottom-right",
  };

  // Función para crear confeti
  const createConfetti = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * window.innerWidth}px;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        z-index: 10000;
        pointer-events: none;
        animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
      `;
      
      document.body.appendChild(confetti);
      
      // Remover confeti después de la animación
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti);
        }
      }, 5000);
    }
  };

  // Función para animación de éxito
  const showSuccessAnimation = () => {
    // Crear confeti
    createConfetti();
    
    // Agregar clase de animación al botón
    const button = document.querySelector('.create-order-btn');
    if (button) {
      button.classList.add('success-pulse');
      setTimeout(() => {
        button.classList.remove('success-pulse');
      }, 1000);
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    
    if (ordersQuantity < 1 || ordersQuantity > 5) {
      toast.error("La cantidad debe estar entre 1 y 5 platos", toastPropsError);
      return;
    }

    setIsSubmitButtonDisabled(true);
    
    // Animación de carga en el botón
    const button = event.target.querySelector('button');
    if (button) {
      button.classList.add('loading-pulse');
    }
    
    try {
      // Usar el endpoint CREATE_ORDER para crear una orden con cantidad específica
      const response = await axios.post(`${ENDPOINTS.RECIPES.CREATE_ORDER}/${ordersQuantity}`);
      console.log("Orden creada:", response.data);
      
      toast.info(`Creando orden de ${ordersQuantity} platos...`, toastProps);
      
      // Simular el tiempo de procesamiento
      setTimeout(() => {
        setIsSubmitButtonDisabled(false);
        
        // Remover animación de carga
        if (button) {
          button.classList.remove('loading-pulse');
        }
        
        // Mostrar animación de éxito
        showSuccessAnimation();
        
        toast.success(`Orden de ${ordersQuantity} platos creada exitosamente`, toastPropsSuccess);
        
        // Guardar la orden actual con los datos reales del backend
        setCurrentOrder(response.data.data);
      }, 4000);
      
    } catch (error) {
      console.error("Error:", error);
      
      // Remover animación de carga en caso de error
      if (button) {
        button.classList.remove('loading-pulse');
      }
      
      toast.error("No se pudo crear la orden de múltiples platos", toastPropsError);
      setIsSubmitButtonDisabled(false);
    }
  };

  const clearOrder = () => {
    // Animación de salida
    const orderCard = document.querySelector('.order-completed-card');
    if (orderCard) {
      orderCard.classList.add('fade-out');
      setTimeout(() => {
        setCurrentOrder(null);
      }, 300);
    } else {
      setCurrentOrder(null);
    }
  };

  // Función para obtener solo las recetas exitosas
  const getSuccessfulRecipes = () => {
    if (!currentOrder || !currentOrder.results) return [];
    
    // Filtrar solo las recetas exitosas
    const successfulResults = currentOrder.results.filter(result => result.success);
    
    // Obtener las recetas únicas exitosas (evitar duplicados)
    const uniqueSuccessfulRecipes = successfulResults.reduce((acc, result) => {
      const recipeId = result.recipe.id;
      if (!acc.find(recipe => recipe.id === recipeId)) {
        acc.push(result.recipe);
      }
      return acc;
    }, []);
    
    return uniqueSuccessfulRecipes;
  };

  // Función para obtener estadísticas de la orden
  const getOrderStats = () => {
    if (!currentOrder || !currentOrder.results) return { total: 0, successful: 0, failed: 0 };
    
    const total = currentOrder.results.length;
    const successful = currentOrder.results.filter(result => result.success).length;
    const failed = total - successful;
    
    return { total, successful, failed };
  };

  // Configuración de columnas para DataTable
  const columns = [
    {
      key: 'name',
      header: 'Nombre',
      render: (item) => <strong>{item.name}</strong>,
      cellStyle: { textAlign: 'left' }
    },
    {
      key: 'description',
      header: 'Descripción',
      render: (item) => (
        <div style={{ maxWidth: '200px' }}>
          {item.description}
        </div>
      ),
      cellStyle: { textAlign: 'left' }
    },
    {
      key: 'ingredients',
      header: 'Ingredientes',
      render: (item) => (
        item.ingredients && item.ingredients.length > 0 ? (
          <div>
            {item.ingredients.slice(0, 3).map((ingredient, ingIndex) => (
              <span key={ingIndex} className="badge bg-info me-1 mb-1">
                {ingredient.name} ({ingredient.quantity})
              </span>
            ))}
            {item.ingredients.length > 3 && (
              <span className="badge bg-light text-dark">
                +{item.ingredients.length - 3} más
              </span>
            )}
          </div>
        ) : (
          <span className="text-muted">Sin ingredientes</span>
        )
      ),
      cellStyle: { textAlign: 'left' }
    }
  ];

  // Configuración de filtros para DataTable
  const filters = [
    {
      key: 'searchTerm',
      label: 'Buscar',
      type: 'text',
      placeholder: 'Nombre o descripción...',
      width: 6
    },
    {
      key: 'difficulty',
      label: 'Dificultad',
      type: 'select',
      placeholder: 'Todas',
      options: [
        { value: 'Fácil', label: 'Fácil' },
        { value: 'Media', label: 'Media' },
        { value: 'Difícil', label: 'Difícil' }
      ],
      width: 6
    }
  ];

  // Función para renderizar contenido expandido
  const renderExpandedContent = (recipe) => {
    return (
      <div className="recipe-details">
        <div className="row">
          <div className="col-md-6">
            <h6 className="mb-3">Información Detallada:</h6>
            <div className="detail-item">
              <strong>Nombre:</strong> {recipe.name}
            </div>
            <div className="detail-item">
              <strong>Categoría:</strong> {recipe.category || 'Sin categoría'}
            </div>
            <div className="detail-item">
              <strong>Dificultad:</strong> {recipe.difficulty || 'No especificada'}
            </div>
            <div className="detail-item">
              <strong>Descripción:</strong> {recipe.description}
            </div>
          </div>
          <div className="col-md-6">
            <h6 className="mb-3">Ingredientes ({recipe.ingredients?.length || 0}):</h6>
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              <div className="ingredients-grid">
                {recipe.ingredients.map((ingredient, idx) => (
                  <div key={idx} className="ingredient-item">
                    <span className="badge bg-info">
                      {ingredient.name} ({ingredient.quantity})
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No hay ingredientes especificados</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const successfulRecipes = getSuccessfulRecipes();
  const orderStats = getOrderStats();

  return (
    <Layout title="Crear Órdenes">
      <Paper sx={{ maxWidth: 1200, margin: "auto", overflow: "hidden" }}>
        <ToastContainer />
        <div style={{ padding: '20px' }}>
          <div className="order-form-container">
            <h2 className="page-title">Crear Nueva Orden</h2>
            <form
              onSubmit={(event) => submitForm(event)}
              className="form-container"
            >
              {/* Cantidad de platos */}
              <div className="form-group mb-3">
                <label htmlFor="ordersQuantity" className="form-label">
                  Cantidad de Platos:
                </label>
                <input
                  type="number"
                  id="ordersQuantity"
                  className="form-control quantity-input"
                  min="1"
                  max="5"
                  value={ordersQuantity}
                  onChange={(e) => setOrdersQuantity(parseInt(e.target.value) || 1)}
                  required
                />
                <div className="form-text">
                  Se crearán {ordersQuantity} platos con recetas aleatorias seleccionadas automáticamente
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary create-order-btn"
                disabled={isSubmitButtonDisabled}
              >
                {isSubmitButtonDisabled ? (
                  <CircularIndeterminate />
                ) : (
                  <span>
                    <i className="fas fa-magic me-2"></i>
                    Crear Orden
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Orden en proceso */}
          {isSubmitButtonDisabled && (
            <div className="container mb-4">
              <div className="row">
                <div className="col-12">
                  <div className="card processing-card">
                    <div className="card-header bg-warning text-dark">
                      <h4 className="card-title mb-0">
                        <i className="fas fa-clock me-2"></i>
                        Orden en Proceso
                      </h4>
                    </div>
                    <div className="card-body text-center">
                      <img
                        src="https://11cosasque.files.wordpress.com/2016/04/giphy-7.gif"
                        alt="Procesando"
                        className="img-fluid processing-gif"
                        style={{ maxHeight: '150px' }}
                      />
                      <p className="mt-3">
                        <strong>Creando orden de {ordersQuantity} platos...</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resultado de la orden actual */}
          {currentOrder && !isSubmitButtonDisabled && (
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="card order-completed-card">
                    <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                      <h4 className="card-title mb-0">
                        <i className="fas fa-check me-2"></i>
                        Orden Completada
                      </h4>
                      <button 
                        className="btn btn-outline-light btn-sm close-btn"
                        onClick={clearOrder}
                      >
                        <i className="fas fa-times me-1"></i>
                        Cerrar
                      </button>
                    </div>
                    <div className="card-body">
                      {/* Información de la orden */}
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <h5>Información de la Orden</h5>
                          <p><strong>ID de Orden:</strong> {currentOrder.id}</p>
                          <p><strong>Cantidad Solicitada:</strong> {currentOrder.quantity} platos</p>
                          <p><strong>Estado:</strong> 
                            <span className="badge bg-success ms-2">{currentOrder.status}</span>
                          </p>
                          <p><strong>Creada:</strong> {new Date(currentOrder.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="col-md-6">
                          <div className="text-center">
                            <i className="fas fa-utensils fa-3x text-success mb-2 success-icon"></i>
                            <p className="text-muted">Recetas Preparadas</p>
                            <div className="alert alert-success success-alert">
                              <strong>{successfulRecipes.length}</strong> recetas completadas exitosamente
                            </div>
                            {orderStats.failed > 0 && (
                              <div className="alert alert-info">
                                <small>
                                  <i className="fas fa-info-circle me-1"></i>
                                  El sistema manejó automáticamente {orderStats.failed} recetas que no pudieron prepararse inicialmente
                                </small>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Tabla de recetas exitosas usando DataTable */}
                      {successfulRecipes.length > 0 && (
                        <div className="mt-3">
                          <DataTable
                            data={successfulRecipes}
                            columns={columns}
                            title={`Recetas Completadas (${successfulRecipes.length})`}
                            loading={false}
                            emptyMessage="No hay recetas completadas para mostrar"
                            showFilters={true}
                            showPagination={true}
                            itemsPerPage={5}
                            expandable={true}
                            renderExpandedContent={renderExpandedContent}
                            filters={filters}
                            className="recipes-section"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Paper>
    </Layout>
  );
}

export default OrdersComponent;
