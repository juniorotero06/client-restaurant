import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Layout from "../../containers/layout/index";
import CircularIndeterminate from "../../components/spinner/spinner";
import DataTable from "../../components/DataTable";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./purchase.css";
import { ENDPOINTS } from "../../config/api";

const PurchaseHistory = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPurchaseHistoryData = () => {
      setIsLoading(true);
      axios
        .get(ENDPOINTS.KITCHEN.GET_PURCHASE_HISTORY)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error al cargar el historial de compras", error);
          toast.error("Error al cargar el historial de compras", {
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

    getPurchaseHistoryData();
  }, []);

  // Obtener ingredientes únicos
  const getUniqueIngredients = () => {
    const ingredients = [...new Set(data.map(item => item.ingredientName))];
    return ingredients.sort();
  };

  // Obtener color para el rango de cantidad
  const getQuantityColor = (quantity) => {
    const qty = parseFloat(quantity);
    if (qty < 10) return '#dc3545'; // Rojo para cantidades bajas
    if (qty < 50) return '#ffc107'; // Amarillo para cantidades medias
    return '#198754'; // Verde para cantidades altas
  };

  // Configuración de columnas para DataTable
  const columns = [
    {
      key: 'invoiceNumber',
      header: 'Factura',
      render: (item) => (
        <strong className="invoice-number">{item.invoiceNumber}</strong>
      ),
      cellStyle: { textAlign: 'center' }
    },
    {
      key: 'ingredientName',
      header: 'Ingrediente',
      render: (item) => (
        <div className="ingredient-info">
          <span className="ingredient-name">{item.ingredientName}</span>
        </div>
      ),
      cellStyle: { textAlign: 'center' }
    },
    {
      key: 'quantity',
      header: 'Cantidad Comprada',
      render: (item) => (
        <span 
          style={{ 
            color: 'white', 
            backgroundColor: getQuantityColor(item.quantity),
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
      key: 'purchaseDate',
      header: 'Fecha de Compra',
      type: 'date',
      cellStyle: { textAlign: 'center' }
    },
    {
      key: 'status',
      header: 'Estado',
      type: 'badge',
      getColor: () => '#198754',
      getText: () => 'Completada',
      cellStyle: { textAlign: 'center' }
    }
  ];

  // Configuración de filtros para DataTable
  const filters = [
    {
      key: 'searchTerm',
      label: 'Buscar',
      type: 'text',
      placeholder: 'Factura o ingrediente...',
      width: 2
    },
    {
      key: 'invoiceNumber',
      label: 'Factura',
      type: 'text',
      placeholder: 'Número de factura...',
      width: 2
    },
    {
      key: 'ingredientName',
      label: 'Ingrediente',
      type: 'select',
      placeholder: 'Todos',
      options: getUniqueIngredients().map(ingredient => ({
        value: ingredient,
        label: ingredient
      })),
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
    },
    {
      key: 'quantityRange',
      label: 'Cantidad',
      type: 'select',
      placeholder: 'Todas',
      options: [
        { value: 'low', label: 'Baja (< 10)' },
        { value: 'medium', label: 'Media (10-50)' },
        { value: 'high', label: 'Alta (> 50)' }
      ],
      width: 2
    }
  ];

  // Función para renderizar contenido expandido
  const renderExpandedContent = (purchase) => {
    return (
      <div className="purchase-details">
        <div className="row">
          <div className="col-md-6">
            <h6 className="mb-3">Información de la Compra:</h6>
            <div className="detail-item">
              <strong>Número de Factura:</strong> {purchase.invoiceNumber}
            </div>
            <div className="detail-item">
              <strong>Ingrediente:</strong> {purchase.ingredientName}
            </div>
            <div className="detail-item">
              <strong>Cantidad:</strong> {purchase.quantity}
            </div>
            <div className="detail-item">
              <strong>Estado:</strong> Completada
            </div>
          </div>
          <div className="col-md-6">
            <h6 className="mb-3">Fechas:</h6>
            <div className="detail-item">
              <strong>Fecha de Compra:</strong> {new Date(purchase.purchaseDate).toLocaleDateString()}
            </div>
            <div className="detail-item">
              <strong>Hora:</strong> {new Date(purchase.purchaseDate).toLocaleTimeString()}
            </div>
            {purchase.notes && (
              <div className="detail-item">
                <strong>Notas:</strong> {purchase.notes}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout title="Historial de Compras">
      <Paper sx={{ maxWidth: 1400, margin: "auto", overflow: "hidden" }}>
        <ToastContainer />
        <div className="purchase-history-container">
          <DataTable
            data={data}
            columns={columns}
            title="Historial de Compras"
            loading={isLoading}
            emptyMessage="No se encontraron compras con los filtros aplicados"
            showFilters={true}
            showPagination={true}
            itemsPerPage={10}
            expandable={true}
            renderExpandedContent={renderExpandedContent}
            filters={filters}
            className="purchase-section"
          />
        </div>
      </Paper>
    </Layout>
  );
};

export default PurchaseHistory;
