// Configuración centralizada del API Gateway
const API_CONFIG = {
  // URL de desarrollo local (API Gateway)
  development: {
    API_GATEWAY: process.env.REACT_APP_API_GATEWAY_URL || 'http://localhost:8080'
  },
  
  // URL de producción (API Gateway)
  production: {
    API_GATEWAY: process.env.REACT_APP_API_GATEWAY_URL || 'https://tu-api-gateway-url'
  },
  
  // URL de staging (API Gateway)
  staging: {
    API_GATEWAY: process.env.REACT_APP_API_GATEWAY_URL || 'https://tu-api-gateway-url'
  }
};

// Determinar el entorno
const getEnvironment = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'production';
  }
  if (process.env.REACT_APP_ENV === 'staging') {
    return 'staging';
  }
  return 'development';
};

// Obtener configuración del entorno actual
const currentEnv = getEnvironment();
const config = API_CONFIG[currentEnv];

// URL del API Gateway
export const API_URLS = {
  API_GATEWAY: config.API_GATEWAY
};

// Endpoints del API Gateway
export const ENDPOINTS = {
  // Kitchen Service Endpoints
  KITCHEN: {
    REQUEST_PLATE: `${API_URLS.API_GATEWAY}/api/kitchen/request-plate`,
    GET_RECIPES: `${API_URLS.API_GATEWAY}/api/kitchen/recipes`,
    GET_INGREDIENTS: `${API_URLS.API_GATEWAY}/api/kitchen/ingredients`,
    GET_ORDERS: `${API_URLS.API_GATEWAY}/api/kitchen/orders`,
    GET_ORDERS_IN_PROGRESS: `${API_URLS.API_GATEWAY}/api/kitchen/orders/in-progress`,
    GET_ORDERS_COMPLETED: `${API_URLS.API_GATEWAY}/api/kitchen/orders/completed`,
    GET_PURCHASE_HISTORY: `${API_URLS.API_GATEWAY}/api/kitchen/purchase-history`,
    HEALTH: `${API_URLS.API_GATEWAY}/health/kitchen`
  },
  
  // Recipes Service Endpoints
  RECIPES: {
    GET_RECIPES: `${API_URLS.API_GATEWAY}/api/recipes/index`,
    CREATE_ORDER: `${API_URLS.API_GATEWAY}/api/recipes/order`,
    HEALTH: `${API_URLS.API_GATEWAY}/health/recipes`
  },
  
  // API Gateway Health Check
  GATEWAY: {
    HEALTH: `${API_URLS.API_GATEWAY}/health`,
    STATUS: `${API_URLS.API_GATEWAY}/status`
  }
};

// Configuración de axios
export const axiosConfig = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Función para obtener URL completa de un endpoint
export const getApiUrl = (endpoint) => {
  return endpoint;
};

// Función helper para construir URLs del API Gateway
export const buildGatewayUrl = (path) => {
  return `${API_URLS.API_GATEWAY}${path}`;
};

// Función para verificar si el API Gateway está disponible
export const checkServicesHealth = async () => {
  try {
    const [gatewayHealth, kitchenHealth, recipesHealth] = await Promise.all([
      fetch(ENDPOINTS.GATEWAY.HEALTH),
      fetch(ENDPOINTS.KITCHEN.HEALTH),
      fetch(ENDPOINTS.RECIPES.HEALTH)
    ]);
    
    return {
      gateway: gatewayHealth.ok,
      kitchen: kitchenHealth.ok,
      recipes: recipesHealth.ok,
      environment: currentEnv
    };
  } catch (error) {
    console.error('Error checking API Gateway health:', error);
    return {
      gateway: false,
      kitchen: false,
      recipes: false,
      environment: currentEnv,
      error: error.message
    };
  }
};

export default {
  API_URLS,
  ENDPOINTS,
  axiosConfig,
  getApiUrl,
  buildGatewayUrl,
  checkServicesHealth,
  environment: currentEnv
}; 