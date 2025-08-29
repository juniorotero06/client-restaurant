import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Layout from "../../containers/layout/index";
import CircularIndeterminate from "../../components/spinner/spinner";
import DataTable from "../../components/DataTable";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./recipes.css";
import { ENDPOINTS, axiosConfig } from "../../config/api";

const Recipes = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRecipesData = () => {
      setIsLoading(true);
      axios
        .get(ENDPOINTS.RECIPES.GET_RECIPES, axiosConfig)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error al cargar las recetas", error);
          toast.error("Error al cargar las recetas", {
            position: "top-right",
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
    getRecipesData();
  }, []);

  // Obtener categorías únicas
  const getUniqueCategories = () => {
    const categories = [...new Set(data.map(item => item.category))];
    return categories.sort();
  };

  // Obtener autores únicos
  const getUniqueAuthors = () => {
    const authors = [...new Set(data.map(item => item.author))];
    return authors.sort();
  };

  // Configuración de columnas para DataTable
  const columns = [
    {
      key: 'name',
      header: 'Nombre',
      render: (item) => (
        <strong className="recipe-name">{item.name}</strong>
      ),
      cellStyle: { textAlign: 'left' }
    },
    {
      key: 'description',
      header: 'Descripción',
      render: (item) => (
        <div className="recipe-description">
          {item.description.length > 100 
            ? `${item.description.substring(0, 100)}...` 
            : item.description
          }
        </div>
      ),
      cellStyle: { textAlign: 'left' }
    },
    {
      key: 'ingredients',
      header: 'Ingredientes',
      render: (item) => (
        <div className="ingredients-list">
          {item.ingredients && item.ingredients.length > 0 ? (
            <div>
              {item.ingredients.slice(0, 3).map((ingredient, index) => (
                <span key={ingredient.name} className="badge bg-info me-1 mb-1">
                  {ingredient.name}: {ingredient.quantity}
                </span>
              ))}
              {item.ingredients.length > 3 && (
                <span 
                  className="badge bg-secondary ingredient-expandable" 
                  title={`Ver todos los ingredientes (${item.ingredients.length} total)`}
                >
                  +{item.ingredients.length - 3} más
                </span>
              )}
            </div>
          ) : (
            <span className="text-muted">Sin ingredientes</span>
          )}
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
      key: 'author',
      header: 'Autor',
      render: (item) => (
        <div className="author-info">
          <i className="fas fa-user me-1"></i>
          {item.author || 'Sin autor'}
        </div>
      ),
      cellStyle: { textAlign: 'center' }
    },
    {
      key: 'ingredients',
      header: 'Detalles',
      render: (item) => (
        <div className="recipe-details">
          <span className="badge bg-success">
            {item.ingredients ? item.ingredients.length : 0} ingredientes
          </span>
        </div>
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
      key: 'author',
      label: 'Autor',
      type: 'select',
      placeholder: 'Todos',
      options: getUniqueAuthors().map(author => ({
        value: author,
        label: author
      })),
      width: 2
    },
    {
      key: 'hasIngredients',
      label: 'Filtros',
      type: 'select',
      placeholder: 'Todos',
      options: [
        { value: 'true', label: 'Con ingredientes' },
        { value: 'false', label: 'Sin ingredientes' }
      ],
      width: 2
    }
  ];

  // Función para renderizar contenido expandido
  const renderExpandedContent = (recipe) => {
    return (
      <div className="recipe-details-expanded">
        <div className="row">
          <div className="col-md-6">
            <h6 className="mb-3">Información de la Receta:</h6>
            <div className="detail-item">
              <strong>Nombre:</strong> {recipe.name}
            </div>
            <div className="detail-item">
              <strong>Categoría:</strong> {recipe.category || 'Sin categoría'}
            </div>
            <div className="detail-item">
              <strong>Autor:</strong> {recipe.author || 'Sin autor'}
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

  return (
    <Layout title="Recetas">
      <Paper sx={{ maxWidth: 1400, margin: "auto", overflow: "hidden" }}>
        <ToastContainer />
        <div className="recipes-container">
          <DataTable
            data={data}
            columns={columns}
            title="Recetas"
            loading={isLoading}
            emptyMessage="No se encontraron recetas con los filtros aplicados"
            showFilters={true}
            showPagination={true}
            itemsPerPage={8}
            expandable={true}
            renderExpandedContent={renderExpandedContent}
            filters={filters}
            className="recipes-section"
          />
        </div>
      </Paper>
    </Layout>
  );
};

export default Recipes;
