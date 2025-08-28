import { ENDPOINTS, checkServicesHealth } from '../config/api';

/**
 * Función para verificar el estado de las APIs
 * Útil para debugging y verificación de configuración
 */
export const testApiEndpoints = async () => {
  console.log('🔍 Verificando endpoints de API...');
  
  const results = {
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    endpoints: {},
    health: null,
    errors: []
  };

  try {
    // Verificar health de servicios
    console.log('📊 Verificando health de servicios...');
    const health = await checkServicesHealth();
    results.health = health;
    
    if (health.kitchen) {
      console.log('✅ Kitchen Service: OK');
    } else {
      console.log('❌ Kitchen Service: ERROR');
      results.errors.push('Kitchen Service no responde');
    }
    
    if (health.recipes) {
      console.log('✅ Recipes Service: OK');
    } else {
      console.log('❌ Recipes Service: ERROR');
      results.errors.push('Recipes Service no responde');
    }

    // Probar endpoints específicos
    console.log('🧪 Probando endpoints específicos...');
    
    // Test Kitchen endpoints
    for (const [name, url] of Object.entries(ENDPOINTS.KITCHEN)) {
      if (name === 'HEALTH') continue; // Ya probado arriba
      
      try {
        const response = await fetch(url, { 
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        results.endpoints[`kitchen_${name.toLowerCase()}`] = {
          url,
          status: response.status,
          ok: response.ok
        };
        
        if (response.ok) {
          console.log(`✅ Kitchen ${name}: ${response.status}`);
        } else {
          console.log(`⚠️ Kitchen ${name}: ${response.status}`);
        }
      } catch (error) {
        console.log(`❌ Kitchen ${name}: ERROR - ${error.message}`);
        results.endpoints[`kitchen_${name.toLowerCase()}`] = {
          url,
          error: error.message
        };
        results.errors.push(`Kitchen ${name}: ${error.message}`);
      }
    }

    // Test Recipes endpoints
    for (const [name, url] of Object.entries(ENDPOINTS.RECIPES)) {
      if (name === 'HEALTH') continue; // Ya probado arriba
      
      try {
        const response = await fetch(url, { 
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        results.endpoints[`recipes_${name.toLowerCase()}`] = {
          url,
          status: response.status,
          ok: response.ok
        };
        
        if (response.ok) {
          console.log(`✅ Recipes ${name}: ${response.status}`);
        } else {
          console.log(`⚠️ Recipes ${name}: ${response.status}`);
        }
      } catch (error) {
        console.log(`❌ Recipes ${name}: ERROR - ${error.message}`);
        results.endpoints[`recipes_${name.toLowerCase()}`] = {
          url,
          error: error.message
        };
        results.errors.push(`Recipes ${name}: ${error.message}`);
      }
    }

  } catch (error) {
    console.error('💥 Error general en test de APIs:', error);
    results.errors.push(`Error general: ${error.message}`);
  }

  // Mostrar resumen
  console.log('\n📋 RESUMEN:');
  console.log(`Entorno: ${results.environment}`);
  console.log(`Timestamp: ${results.timestamp}`);
  console.log(`Errores: ${results.errors.length}`);
  
  if (results.errors.length > 0) {
    console.log('❌ Errores encontrados:');
    results.errors.forEach(error => console.log(`  - ${error}`));
  } else {
    console.log('✅ Todos los endpoints funcionan correctamente');
  }

  return results;
};

/**
 * Función para verificar si hay problemas de Mixed Content
 */
export const checkMixedContent = () => {
  const currentUrl = window.location.href;
  const isHttps = currentUrl.startsWith('https://');
  
  console.log(`🔒 Verificando Mixed Content...`);
  console.log(`URL actual: ${currentUrl}`);
  console.log(`Es HTTPS: ${isHttps}`);
  
  if (isHttps) {
    console.log('✅ Aplicación ejecutándose en HTTPS');
    console.log('ℹ️ Las peticiones HTTP serán bloqueadas por el navegador');
    console.log('ℹ️ Usa el proxy de Vercel para evitar Mixed Content');
  } else {
    console.log('ℹ️ Aplicación ejecutándose en HTTP');
    console.log('ℹ️ No hay restricciones de Mixed Content');
  }
  
  return {
    isHttps,
    currentUrl,
    hasMixedContentRisk: isHttps
  };
};

/**
 * Función para mostrar información de configuración actual
 */
export const showApiConfig = () => {
  console.log('⚙️ Configuración actual de API:');
  console.log(`Entorno: ${process.env.NODE_ENV}`);
  console.log(`REACT_APP_ENV: ${process.env.REACT_APP_ENV}`);
  console.log(`REACT_APP_KITCHEN_SERVICE_URL: ${process.env.REACT_APP_KITCHEN_SERVICE_URL || 'No configurado'}`);
  console.log(`REACT_APP_RECIPES_SERVICE_URL: ${process.env.REACT_APP_RECIPES_SERVICE_URL || 'No configurado'}`);
  
  console.log('\n🔗 URLs configuradas:');
  console.log('Kitchen Service:', ENDPOINTS.KITCHEN.GET_RECIPES.replace('/recipes', ''));
  console.log('Recipes Service:', ENDPOINTS.RECIPES.GET_RECIPES.replace('/index', ''));
};

// Exportar funciones para uso en consola del navegador
if (typeof window !== 'undefined') {
  window.apiTest = {
    testEndpoints: testApiEndpoints,
    checkMixedContent,
    showConfig: showApiConfig
  };
  
  console.log('🔧 API Test utilities disponibles en window.apiTest');
  console.log('Uso:');
  console.log('  - window.apiTest.testEndpoints()');
  console.log('  - window.apiTest.checkMixedContent()');
  console.log('  - window.apiTest.showConfig()');
}
