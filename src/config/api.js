// Configuración centralizada de APIs usando variables de entorno
const API_CONFIG = {
  // URLs de desarrollo local
  development: {
    KITCHEN_SERVICE: process.env.REACT_APP_KITCHEN_SERVICE_URL || 'http://localhost:3000/api',
    RECIPES_SERVICE: process.env.REACT_APP_RECIPES_SERVICE_URL || 'http://localhost:3001/api'
  },
  
  // URLs de producción (Vercel con proxy)
  production: {
    KITCHEN_SERVICE: '/api/kitchen',
    RECIPES_SERVICE: '/api/recipes'
  },
  
  // URLs de staging (Render)
  staging: {
    KITCHEN_SERVICE: process.env.REACT_APP_KITCHEN_SERVICE_URL || 'https://alegra-kitchen.onrender.com/api',
    RECIPES_SERVICE: process.env.REACT_APP_RECIPES_SERVICE_URL || 'https://alegra-recipes.onrender.com/api'
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

// URLs de los servicios
export const API_URLS = {
  KITCHEN_SERVICE: config.KITCHEN_SERVICE,
  RECIPES_SERVICE: config.RECIPES_SERVICE
};

// Endpoints específicos
export const ENDPOINTS = {
  // Kitchen Service Endpoints
  KITCHEN: {
    REQUEST_PLATE: `${API_URLS.KITCHEN_SERVICE}/request-plate`,
    GET_RECIPES: `${API_URLS.KITCHEN_SERVICE}/recipes`,
    GET_INGREDIENTS: `${API_URLS.KITCHEN_SERVICE}/ingredients`,
    GET_ORDERS: `${API_URLS.KITCHEN_SERVICE}/orders`,
    GET_ORDERS_IN_PROGRESS: `${API_URLS.KITCHEN_SERVICE}/orders/in-progress`,
    GET_ORDERS_COMPLETED: `${API_URLS.KITCHEN_SERVICE}/orders/completed`,
    GET_PURCHASE_HISTORY: `${API_URLS.KITCHEN_SERVICE}/purchase-history`,
    HEALTH: currentEnv === 'production' ? '/health/kitchen' : `${API_URLS.KITCHEN_SERVICE.replace('/api', '')}/health`
  },
  
  // Recipes Service Endpoints
  RECIPES: {
    GET_RECIPES: `${API_URLS.RECIPES_SERVICE}/index`,
    CREATE_ORDER: `${API_URLS.RECIPES_SERVICE}/order`,
    HEALTH: currentEnv === 'production' ? '/health/recipes' : `${API_URLS.RECIPES_SERVICE.replace('/api', '')}/health`
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

// Función para verificar si los servicios están disponibles
export const checkServicesHealth = async () => {
  try {
    const [kitchenHealth, recipesHealth] = await Promise.all([
      fetch(ENDPOINTS.KITCHEN.HEALTH),
      fetch(ENDPOINTS.RECIPES.HEALTH)
    ]);
    
    return {
      kitchen: kitchenHealth.ok,
      recipes: recipesHealth.ok,
      environment: currentEnv
    };
  } catch (error) {
    console.error('Error checking services health:', error);
    return {
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
  checkServicesHealth,
  environment: currentEnv
}; 