import React, { useState } from "react";
import Layout from "../../containers/layout/index";
import "./documentation.css";

function Documentation() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "📋 Descripción General", icon: "📋" },
    { id: "architecture", title: "🏗️ Arquitectura", icon: "🏗️" },
    { id: "frontend", title: "🎨 Frontend Mejorado", icon: "🎨" },
    { id: "installation", title: "🚀 Instalación", icon: "🚀" },
    { id: "endpoints", title: "🔗 Endpoints", icon: "🔗" },
    { id: "events", title: "📡 Eventos Kafka", icon: "📡" },
    { id: "deployment", title: "🐳 Docker", icon: "🐳" },
    { id: "testing", title: "🧪 Testing", icon: "🧪" },
    { id: "monitoring", title: "📊 Monitoreo", icon: "📊" }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="doc-section">
            <h2>🍽️ Alegra Kitchen Challenge - Sistema Event-Driven Mejorado</h2>
            <p>Este proyecto implementa la solución completa para el <strong>Alegra Kitchen Challenge</strong> utilizando una arquitectura de microservicios <strong>event-driven</strong> con <strong>Event Sourcing</strong>, <strong>Apache Kafka</strong>, <strong>Redis</strong> para cacheo, e <strong>integración con Google Gemini Flash 2.5</strong> para generación automática de recetas. El frontend ha sido completamente rediseñado con animaciones modernas, filtros avanzados y una experiencia de usuario optimizada.</p>
            
            <h3>🎯 Características Principales</h3>
            <ul>
              <li><strong>Event Sourcing</strong>: Los servicios publican eventos en lugar de llamadas directas</li>
              <li><strong>Apache Kafka</strong>: Broker de mensajería para eventos asíncronos</li>
              <li><strong>Redis</strong>: Cache para mejorar performance y reducir latencia</li>
              <li><strong>Comunicación Asíncrona</strong>: Desacoplamiento completo entre servicios</li>
              <li><strong>Clean Architecture</strong>: Separación clara de capas y responsabilidades</li>
              <li><strong>Google Gemini Integration</strong>: Generación automática de recetas con IA</li>
              <li><strong>Frontend Mejorado</strong>: Interfaz moderna con animaciones y filtros avanzados</li>
              <li><strong>Responsive Design</strong>: Experiencia optimizada para todos los dispositivos</li>
              <li><strong>Sistema de Filtros</strong>: Búsqueda y filtrado inteligente en todas las tablas</li>
              <li><strong>Animaciones</strong>: Efectos visuales para mejorar la experiencia de usuario</li>
            </ul>

            <h3>🔧 Tecnologías Utilizadas</h3>
            <div className="tech-grid">
              <div className="tech-card">
                <h4>Backend</h4>
                <ul>
                  <li>Node.js + TypeScript</li>
                  <li>Express.js</li>
                  <li>MongoDB</li>
                  <li>Apache Kafka + Zookeeper</li>
                  <li>Redis</li>
                  <li>Google Gemini Flash 2.5</li>
                </ul>
              </div>
              <div className="tech-card">
                <h4>Frontend</h4>
                <ul>
                  <li>React 18</li>
                  <li>Material-UI</li>
                  <li>Axios</li>
                  <li>React Router</li>
                  <li>Bootstrap 5</li>
                  <li>CSS Animations</li>
                  <li>React Toastify</li>
                </ul>
              </div>
              <div className="tech-card">
                <h4>Infraestructura</h4>
                <ul>
                  <li>Docker + Docker Compose</li>
                  <li>Event-Driven Architecture</li>
                  <li>Hexagonal Architecture</li>
                  <li>SOLID Principles</li>
                  <li>Clean Code</li>
                  <li>Responsive Design</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case "architecture":
        return (
          <div className="doc-section">
            <h2>🏗️ Arquitectura del Sistema</h2>
            
            <h3>📊 Microservicios</h3>
            <div className="service-grid">
              <div className="service-card">
                <h4>🍳 new-kitchen (Puerto 3000)</h4>
                <ul>
                  <li><strong>Publisher</strong>: Publica eventos de cocina</li>
                  <li><strong>Topics</strong>: plate-requested, ingredient-purchased, order-completed, order-failed, ingredient-consumed</li>
                  <li><strong>Cache</strong>: Redis para ingredientes, recetas y órdenes</li>
                  <li><strong>Base de datos</strong>: MongoDB con ObjectIds automáticos</li>
                  <li><strong>IA Integration</strong>: Google Gemini Flash 2.5 para generación de recetas</li>
                </ul>
              </div>
              <div className="service-card">
                <h4>📖 new-recipes (Puerto 3001)</h4>
                <ul>
                  <li><strong>Consumer</strong>: Escucha eventos de cocina</li>
                  <li><strong>Topics</strong>: plate-requested, order-completed, order-failed</li>
                  <li><strong>Cache</strong>: Redis para eventos y métricas</li>
                  <li><strong>Base de datos</strong>: MongoDB con ObjectIds automáticos</li>
                  <li><strong>AI Recipes</strong>: Gestión de recetas generadas por IA</li>
                </ul>
              </div>
            </div>

            <h3>🎨 Frontend React</h3>
            <div className="service-grid">
              <div className="service-card">
                <h4>🎯 Páginas Principales</h4>
                <ul>
                  <li><strong>Home</strong>: Landing page con animaciones y call-to-actions</li>
                  <li><strong>Pedidos</strong>: Creación de órdenes aleatorias (máx. 5 platos)</li>
                  <li><strong>Órdenes</strong>: Gestión completa con filtros y paginación</li>
                  <li><strong>Recetas</strong>: Catálogo con tooltips y filtros avanzados</li>
                  <li><strong>Inventario</strong>: Control de stock con indicadores visuales</li>
                  <li><strong>Historial</strong>: Compras con filtros por fecha y cantidad</li>
                </ul>
              </div>
              <div className="service-card">
                <h4>🤖 Nuevas Funcionalidades</h4>
                <ul>
                  <li><strong>Integración IA</strong>: Página dedicada a Google Gemini Flash 2.5</li>
                  <li><strong>Documentación</strong>: Guía completa del sistema</li>
                  <li><strong>Animaciones</strong>: Efectos visuales en todas las páginas</li>
                  <li><strong>Responsive</strong>: Diseño adaptativo para móviles</li>
                  <li><strong>Filtros Avanzados</strong>: Búsqueda y filtrado inteligente</li>
                </ul>
              </div>
            </div>

            <h3>🔄 Flujo Event-Driven Mejorado</h3>
            <div className="flow-diagram">
              <div className="flow-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h5>Usuario crea orden</h5>
                  <p>POST /api/recipes/order/:quantity</p>
                </div>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h5>Selección aleatoria</h5>
                  <p>Recetas de IA + tradicionales</p>
                </div>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h5>Verificación ingredientes</h5>
                  <p>Cache Redis + Base de datos</p>
                </div>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h5>Compra automática</h5>
                  <p>Market API + ingredient-purchased</p>
                </div>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h5>Orden completada</h5>
                  <p>order-completed + UI feedback</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "frontend":
        return (
          <div className="doc-section">
            <h2>🎨 Frontend Mejorado</h2>
            
            <h3>🚀 Nuevas Características Implementadas</h3>
            <div className="tech-grid">
              <div className="tech-card">
                <h4>🎯 Página de Inicio</h4>
                <ul>
                  <li><strong>Hero Section</strong>: Diseño moderno con gradientes</li>
                  <li><strong>Call-to-Actions</strong>: Botones para crear órdenes y explorar IA</li>
                  <li><strong>Features Grid</strong>: Tarjetas interactivas para cada funcionalidad</li>
                  <li><strong>Animaciones</strong>: Efectos de entrada y hover</li>
                  <li><strong>Responsive</strong>: Adaptable a todos los dispositivos</li>
                </ul>
              </div>
              <div className="tech-card">
                <h4>📊 Tablas Mejoradas</h4>
                <ul>
                  <li><strong>Filtros Avanzados</strong>: Por estado, fecha, categoría, etc.</li>
                  <li><strong>Paginación</strong>: Navegación eficiente en grandes datasets</li>
                  <li><strong>Búsqueda</strong>: Filtrado en tiempo real</li>
                  <li><strong>Indicadores Visuales</strong>: Badges con colores y estados</li>
                  <li><strong>Tooltips</strong>: Información detallada al hacer hover</li>
                </ul>
              </div>
              <div className="tech-card">
                <h4>🤖 Integración de IA</h4>
                <ul>
                  <li><strong>Página Dedicada</strong>: Explicación completa de Google Gemini</li>
                  <li><strong>Tabla de Recetas IA</strong>: Muestra recetas generadas por IA</li>
                  <li><strong>Información Técnica</strong>: Prompts, estructura de datos, configuración</li>
                  <li><strong>Diseño Verde</strong>: Consistente con la marca</li>
                </ul>
              </div>
            </div>

            <h3>🎨 Sistema de Animaciones</h3>
            <div className="service-grid">
              <div className="service-card">
                <h4>✨ Efectos Visuales</h4>
                <ul>
                  <li><strong>Confetti</strong>: Celebración al crear órdenes exitosas</li>
                  <li><strong>Slide-in</strong>: Elementos que aparecen desde los bordes</li>
                  <li><strong>Fade-in</strong>: Transiciones suaves de opacidad</li>
                  <li><strong>Hover Effects</strong>: Interacciones al pasar el mouse</li>
                  <li><strong>Loading States</strong>: Indicadores de carga animados</li>
                </ul>
              </div>
              <div className="service-card">
                <h4>🎭 Animaciones por Página</h4>
                <ul>
                  <li><strong>Home</strong>: Partículas flotantes y gradientes</li>
                  <li><strong>Pedidos</strong>: Confetti y efectos de éxito</li>
                  <li><strong>Tablas</strong>: Fade-in por filas y hover effects</li>
                  <li><strong>IA Integration</strong>: Efectos futuristas y glow</li>
                  <li><strong>Documentación</strong>: Transiciones suaves entre secciones</li>
                </ul>
              </div>
            </div>

            <h3>🔧 Mejoras Técnicas</h3>
            <div className="tech-grid">
              <div className="tech-card">
                <h4>📱 Responsive Design</h4>
                <ul>
                  <li><strong>Mobile First</strong>: Diseño optimizado para móviles</li>
                  <li><strong>Breakpoints</strong>: Adaptación a tablets y desktop</li>
                  <li><strong>Touch Friendly</strong>: Botones y elementos táctiles</li>
                  <li><strong>Flexible Layouts</strong>: Grids que se adaptan al contenido</li>
                </ul>
              </div>
              <div className="tech-card">
                <h4>⚡ Performance</h4>
                <ul>
                  <li><strong>Lazy Loading</strong>: Carga bajo demanda</li>
                  <li><strong>Optimized Images</strong>: Compresión y formatos modernos</li>
                  <li><strong>CSS Animations</strong>: Hardware acceleration</li>
                  <li><strong>Efficient Rendering</strong>: React optimizations</li>
                </ul>
              </div>
              <div className="tech-card">
                <h4>🎨 UX/UI Mejorado</h4>
                <ul>
                  <li><strong>Consistent Colors</strong>: Paleta verde (#00B19C)</li>
                  <li><strong>Typography</strong>: Jerarquía clara de información</li>
                  <li><strong>Spacing</strong>: Sistema de espaciado consistente</li>
                  <li><strong>Feedback Visual</strong>: Estados claros de interacción</li>
                </ul>
              </div>
            </div>

            <h3>📋 Páginas Disponibles</h3>
            <div className="urls-grid">
              <div className="url-card">
                <h4>🏠 Páginas Principales</h4>
                <ul>
                  <li><strong>/</strong> - Home (Landing page mejorada)</li>
                  <li><strong>/pedidos</strong> - Crear órdenes aleatorias</li>
                  <li><strong>/ordenes</strong> - Gestión de órdenes del sistema</li>
                  <li><strong>/recetas</strong> - Catálogo de recetas</li>
                </ul>
              </div>
              <div className="url-card">
                <h4>📊 Páginas de Gestión</h4>
                <ul>
                  <li><strong>/inventario</strong> - Control de inventario</li>
                  <li><strong>/historial-compras</strong> - Historial de compras</li>
                  <li><strong>/ai-integration</strong> - Integración de IA</li>
                  <li><strong>/documentation</strong> - Documentación del sistema</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case "installation":
        return (
          <div className="doc-section">
            <h2>🚀 Instalación y Configuración</h2>
            
            <h3>📋 Prerrequisitos</h3>
            <ul>
              <li>Docker y Docker Compose instalados</li>
              <li>Node.js 18+ (para desarrollo local)</li>
              <li>Git</li>
            </ul>

            <h3>🐳 Despliegue con Docker Compose</h3>
            <div className="code-block">
              <h4>Despliegue Rápido</h4>
              <pre><code>{`# Clonar el repositorio
git clone <repository-url>
cd alegra_prueba_node-master

# Ejecutar el script de despliegue
chmod +x build-and-deploy.sh
./build-and-deploy.sh`}</code></pre>
            </div>

            <div className="code-block">
              <h4>Despliegue Manual</h4>
              <pre><code>{`# 1. Construir las imágenes Docker
docker build -t alegra/new-kitchen:latest ./new-kitchen
docker build -t alegra/new-recipes:latest ./new-recipes

# 2. Iniciar servicios con docker-compose
docker-compose up -d

# 3. Verificar el estado
docker-compose ps`}</code></pre>
            </div>

            <h3>🔧 Configuración de Variables de Entorno</h3>
            <div className="env-section">
              <h4>new-kitchen (.env)</h4>
              <pre><code>{`PORT=3000
MONGODB_URI=mongodb://admin:password123@mongodb:27017/alegra_kitchen?authSource=admin
SERVICE_NAME=kitchen-service
JWT_SECRET=your-super-secret-jwt-key-here
MARKET_URL=https://recruitment.alegra.com/api/farmers-market/buy
KAFKA_BROKERS=kafka:29092
REDIS_URL=redis://redis:6379`}</code></pre>
            </div>

            <div className="env-section">
              <h4>new-recipes (.env)</h4>
              <pre><code>{`PORT=3001
MONGODB_URI=mongodb://admin:password123@mongodb:27017/alegra_recipes?authSource=admin
SERVICE_NAME=recipes-service
JWT_SECRET=your-super-secret-jwt-key-here
KAFKA_BROKERS=kafka:29092
REDIS_URL=redis://redis:6379`}</code></pre>
            </div>

            <h3>🎯 URLs de los Servicios</h3>
            <div className="urls-grid">
              <div className="url-card">
                <h4>Servicios Backend</h4>
                <ul>
                  <li><strong>Kitchen Service</strong>: http://localhost:3000</li>
                  <li><strong>Recipes Service</strong>: http://localhost:3001</li>
                </ul>
              </div>
              <div className="url-card">
                <h4>Bases de Datos</h4>
                <ul>
                  <li><strong>MongoDB Kitchen</strong>: localhost:27017</li>
                  <li><strong>MongoDB Recipes</strong>: localhost:27018</li>
                </ul>
              </div>
              <div className="url-card">
                <h4>Infraestructura</h4>
                <ul>
                  <li><strong>Kafka</strong>: localhost:9092</li>
                  <li><strong>Redis</strong>: localhost:6379</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case "endpoints":
        return (
          <div className="doc-section">
            <h2>🔗 Endpoints de la API</h2>
            
            <h3>🎯 Endpoints Principales</h3>
            <div className="endpoint-card primary">
              <h4>POST /api/recipes/order/:quantity</h4>
              <p><strong>Descripción</strong>: Crea órdenes con cantidad específica de platos aleatorios (máximo 5).</p>
              <div className="endpoint-details">
                <h5>Flujo Event-Driven:</h5>
                <ol>
                  <li><strong>Request</strong> → POST /api/recipes/order/3</li>
                  <li><strong>Selection</strong> → 3 recetas aleatorias (IA + tradicionales)</li>
                  <li><strong>Processing</strong> → Verificación ingredientes + compra automática</li>
                  <li><strong>Events</strong> → ingredient-purchased, ingredient-consumed (Kafka)</li>
                  <li><strong>Event</strong> → order-completed (Kafka)</li>
                  <li><strong>Response</strong> → Órdenes completadas con detalles</li>
                </ol>
              </div>
              <div className="response-example">
                <h5>Respuesta:</h5>
                <pre><code>{`{
  "message": "Orders created successfully",
  "data": {
    "id": "order_id",
    "quantity": 3,
    "status": "COMPLETED",
    "createdAt": "2024-01-15T10:30:00Z",
    "results": [
      {
        "recipe": {
          "id": "recipe_id",
          "name": "Ensalada César",
          "description": "Ensalada clásica con lechuga, queso y cebolla",
          "ingredients": [...],
          "author": "AI Chef",
          "isAI": true
        },
        "success": true
      }
    ]
  }
}`}</code></pre>
              </div>
            </div>

            <div className="endpoint-card">
              <h4>POST /api/kitchen/request-plate</h4>
              <p><strong>Descripción</strong>: Endpoint original del reto - solicita un plato aleatorio.</p>
              <div className="response-example">
                <h5>Respuesta:</h5>
                <pre><code>{`{
  "message": "Plate requested successfully",
  "data": {
    "id": "order_id",
    "recipe": {
      "id": "recipe_id",
      "name": "Ensalada César",
      "description": "Ensalada clásica con lechuga, queso y cebolla",
      "ingredients": [...],
      "status": "COMPLETED",
      "ingredientsOk": true
    }
  }
}`}</code></pre>
              </div>
            </div>

            <h3>📊 Endpoints de Visualización</h3>
            <div className="endpoints-grid">
              <div className="endpoint-group">
                <h4>🍳 Kitchen Service (Puerto 3000)</h4>
                <div className="endpoint-list">
                  <div className="endpoint-item">
                    <span className="method get">GET</span>
                    <span className="path">/api/kitchen/ingredients</span>
                    <span className="desc">Ingredientes disponibles (con cache)</span>
                  </div>
                  <div className="endpoint-item">
                    <span className="method get">GET</span>
                    <span className="path">/api/kitchen/purchase-history</span>
                    <span className="desc">Historial de compras</span>
                  </div>
                  <div className="endpoint-item">
                    <span className="method get">GET</span>
                    <span className="path">/api/kitchen/recipes</span>
                    <span className="desc">Recetas disponibles (con cache)</span>
                  </div>
                  <div className="endpoint-item">
                    <span className="method get">GET</span>
                    <span className="path">/api/kitchen/orders/in-progress</span>
                    <span className="desc">Órdenes en preparación</span>
                  </div>
                  <div className="endpoint-item">
                    <span className="method get">GET</span>
                    <span className="path">/api/kitchen/orders/completed</span>
                    <span className="desc">Historial de pedidos</span>
                  </div>
                </div>
              </div>

              <div className="endpoint-group">
                <h4>📖 Recipes Service (Puerto 3001)</h4>
                <div className="endpoint-list">
                  <div className="endpoint-item">
                    <span className="method get">GET</span>
                    <span className="path">/api/recipes/index</span>
                    <span className="desc">Recetas disponibles</span>
                  </div>
                  <div className="endpoint-item">
                    <span className="method post">POST</span>
                    <span className="path">/api/recipes/order/:quantity</span>
                    <span className="desc">Crear órdenes múltiples</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "events":
        return (
          <div className="doc-section">
            <h2>📡 Eventos Kafka</h2>
            
            <h3>📋 Tabla de Eventos</h3>
            <div className="events-table">
              <table>
                <thead>
                  <tr>
                    <th>Evento</th>
                    <th>Topic</th>
                    <th>Publisher</th>
                    <th>Consumer</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>PLATE_REQUESTED</strong></td>
                    <td>plate-requested</td>
                    <td>Kitchen Service</td>
                    <td>Recipes Service</td>
                    <td>Se publica cuando el gerente solicita un plato</td>
                  </tr>
                  <tr>
                    <td><strong>INGREDIENT_PURCHASED</strong></td>
                    <td>ingredient-purchased</td>
                    <td>Kitchen Service</td>
                    <td>-</td>
                    <td>Se publica cuando se compra un ingrediente del mercado</td>
                  </tr>
                  <tr>
                    <td><strong>INGREDIENT_CONSUMED</strong></td>
                    <td>ingredient-consumed</td>
                    <td>Kitchen Service</td>
                    <td>-</td>
                    <td>Se publica cuando se consume un ingrediente</td>
                  </tr>
                  <tr>
                    <td><strong>ORDER_COMPLETED</strong></td>
                    <td>order-completed</td>
                    <td>Kitchen Service</td>
                    <td>Recipes Service</td>
                    <td>Se publica cuando se completa una orden exitosamente</td>
                  </tr>
                  <tr>
                    <td><strong>ORDER_FAILED</strong></td>
                    <td>order-failed</td>
                    <td>Kitchen Service</td>
                    <td>Recipes Service</td>
                    <td>Se publica cuando falla una orden</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>🎯 Propósito de cada Evento</h3>
            <div className="events-grid">
              <div className="event-card">
                <h4>🔄 PLATE_REQUESTED</h4>
                <ul>
                  <li><strong>Propósito</strong>: Notificar que se ha solicitado un nuevo plato</li>
                  <li><strong>Uso</strong>: El servicio de recetas puede actualizar métricas de popularidad</li>
                  <li><strong>Auditoría</strong>: Rastrear qué recetas son más solicitadas</li>
                </ul>
              </div>
              <div className="event-card">
                <h4>💰 INGREDIENT_PURCHASED</h4>
                <ul>
                  <li><strong>Propósito</strong>: Registrar compras de ingredientes al mercado</li>
                  <li><strong>Uso</strong>: Auditoría de gastos y análisis de costos</li>
                  <li><strong>Analytics</strong>: Seguimiento de patrones de compra</li>
                </ul>
              </div>
              <div className="event-card">
                <h4>🍽️ INGREDIENT_CONSUMED</h4>
                <ul>
                  <li><strong>Propósito</strong>: Registrar consumo de ingredientes</li>
                  <li><strong>Uso</strong>: Control de inventario y trazabilidad</li>
                  <li><strong>Analytics</strong>: Análisis de uso de ingredientes</li>
                </ul>
              </div>
              <div className="event-card">
                <h4>✅ ORDER_COMPLETED</h4>
                <ul>
                  <li><strong>Propósito</strong>: Notificar finalización exitosa de órdenes</li>
                  <li><strong>Uso</strong>: Métricas de éxito y notificaciones</li>
                  <li><strong>Analytics</strong>: Tasa de éxito por receta</li>
                </ul>
              </div>
              <div className="event-card">
                <h4>❌ ORDER_FAILED</h4>
                <ul>
                  <li><strong>Propósito</strong>: Notificar fallos en órdenes</li>
                  <li><strong>Uso</strong>: Análisis de errores y reintentos</li>
                  <li><strong>Analytics</strong>: Identificación de problemas recurrentes</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case "deployment":
        return (
          <div className="doc-section">
            <h2>🐳 Docker y Despliegue</h2>
            
            <h3>📦 Servicios Disponibles</h3>
            <div className="docker-services">
              <div className="service-list">
                <h4>Imágenes Docker</h4>
                <ul>
                  <li><code>alegra/new-kitchen:latest</code> - Servicio de cocina</li>
                  <li><code>alegra/new-recipes:latest</code> - Servicio de recetas</li>
                  <li><code>mongo:6.0</code> - Base de datos MongoDB</li>
                  <li><code>confluentinc/cp-kafka:7.4.0</code> - Apache Kafka</li>
                  <li><code>confluentinc/cp-zookeeper:7.4.0</code> - Zookeeper</li>
                  <li><code>redis:7-alpine</code> - Cache Redis</li>
                </ul>
              </div>
            </div>

            <h3>⚡ Comandos Útiles</h3>
            <div className="commands-grid">
              <div className="command-card">
                <h4>Construcción y Despliegue</h4>
                <pre><code>{`# Construir imágenes
docker-compose build

# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Ver estado
docker-compose ps`}</code></pre>
              </div>
              <div className="command-card">
                <h4>Logs y Monitoreo</h4>
                <pre><code>{`# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f new-kitchen
docker-compose logs -f new-recipes

# Ver logs de Kafka
docker-compose logs -f kafka

# Ver logs de Redis
docker-compose logs -f redis`}</code></pre>
              </div>
              <div className="command-card">
                <h4>Mantenimiento</h4>
                <pre><code>{`# Reconstruir y reiniciar
docker-compose up -d --build

# Limpiar contenedores
docker-compose down -v

# Ver uso de recursos
docker stats

# Acceder a contenedores
docker exec -it alegra-kitchen bash
docker exec -it alegra-recipes bash`}</code></pre>
              </div>
            </div>

            <h3>🔍 Verificación del Despliegue</h3>
            <div className="verification-steps">
              <div className="step">
                <h4>1. Verificar Contenedores</h4>
                <pre><code>docker-compose ps</code></pre>
                <p>Todos los servicios deben estar en estado "Up"</p>
              </div>
              <div className="step">
                <h4>2. Verificar Health Checks</h4>
                <pre><code>{`# Kitchen Service
curl http://localhost:3000/health

# Recipes Service
curl http://localhost:3001/health

# Kafka
curl http://localhost:9101/metrics

# Redis
redis-cli ping`}</code></pre>
              </div>
              <div className="step">
                <h4>3. Probar Endpoint Principal</h4>
                <pre><code>curl -X POST http://localhost:3000/api/kitchen/request-plate</code></pre>
                <p>Debería retornar una orden completada</p>
              </div>
            </div>
          </div>
        );

      case "testing":
        return (
          <div className="doc-section">
            <h2>🧪 Testing</h2>
            
            <div className="alert alert-info">
              <h4>📝 Nota Importante sobre Testing</h4>
              <p><strong>Para esta prueba técnica no se implementaron tests automatizados.</strong> El enfoque se centró en la implementación de la arquitectura event-driven, la integración de IA y el desarrollo del frontend con todas sus funcionalidades.</p>
              <p>En un entorno de producción, se recomendaría implementar:</p>
              <ul>
                <li><strong>Unit Tests</strong>: Para lógica de negocio y casos de uso</li>
                <li><strong>Integration Tests</strong>: Para APIs y comunicación entre servicios</li>
                <li><strong>E2E Tests</strong>: Para flujos completos del usuario</li>
                <li><strong>Performance Tests</strong>: Para validar escalabilidad</li>
              </ul>
            </div>

            <h3>🔬 Testing Manual y Verificación</h3>
            <div className="testing-commands">
              <div className="test-card">
                <h4>Verificación de Servicios</h4>
                <pre><code>{`# Verificar que los servicios estén ejecutándose
docker-compose ps

# Ver logs de los servicios
docker-compose logs -f new-kitchen
docker-compose logs -f new-recipes`}</code></pre>
              </div>
              <div className="test-card">
                <h4>Verificación de Infraestructura</h4>
                <pre><code>{`# Verificar Kafka
docker-compose logs -f kafka

# Verificar Redis
docker-compose logs -f redis

# Verificar MongoDB
docker-compose logs -f mongodb`}</code></pre>
              </div>
            </div>

            <h3>🏥 Health Checks</h3>
            <div className="health-checks">
              <div className="health-card">
                <h4>Servicios Backend</h4>
                <pre><code>{`# Kitchen Service
curl http://localhost:3000/health

# Recipes Service
curl http://localhost:3001/health`}</code></pre>
              </div>
              <div className="health-card">
                <h4>Infraestructura</h4>
                <pre><code>{`# Kafka
curl http://localhost:9101/metrics

# Redis
redis-cli ping`}</code></pre>
              </div>
            </div>

            <h3>🎯 Testing Manual - Casos de Prueba</h3>
            <div className="manual-tests">
              <div className="test-scenario">
                <h4>1. Endpoint Original del Reto</h4>
                <pre><code style={{color: 'black'}}>curl -X POST http://localhost:3000/api/kitchen/request-plate</code></pre>
                <p><strong>Resultado esperado</strong>: Orden completada con receta aleatoria</p>
                <p><strong>Validación</strong>: Verificar que se genere un evento Kafka y se complete la orden</p>
              </div>
              <div className="test-scenario">
                <h4>2. Endpoint Mejorado - Órdenes Múltiples</h4>
                <pre><code style={{color: 'black'}}>curl -X POST http://localhost:3001/api/recipes/order/3</code></pre>
                <p><strong>Resultado esperado</strong>: 3 órdenes completadas con recetas aleatorias</p>
                <p><strong>Validación</strong>: Verificar que se procesen múltiples recetas y se generen eventos</p>
              </div>
              <div className="test-scenario">
                <h4>3. Verificar Ingredientes</h4>
                <pre><code style={{color: 'black'}}>curl http://localhost:3000/api/kitchen/ingredients</code></pre>
                <p><strong>Resultado esperado</strong>: Lista de ingredientes disponibles</p>
                <p><strong>Validación</strong>: Verificar que se use cache Redis</p>
              </div>
              <div className="test-scenario">
                <h4>4. Verificar Recetas</h4>
                <pre><code style={{color: 'black'}}>curl http://localhost:3000/api/kitchen/recipes</code></pre>
                <p><strong>Resultado esperado</strong>: Lista de recetas disponibles</p>
                <p><strong>Validación</strong>: Verificar que incluya recetas de IA</p>
              </div>
              <div className="test-scenario">
                <h4>5. Verificar Órdenes</h4>
                <pre><code style={{color: 'black'}}>curl http://localhost:3000/api/kitchen/orders</code></pre>
                <p><strong>Resultado esperado</strong>: Lista de órdenes del sistema</p>
                <p><strong>Validación</strong>: Verificar que se muestren órdenes recientes</p>
              </div>
              <div className="test-scenario">
                <h4>6. Verificar Eventos Kafka</h4>
                <pre><code style={{color: 'black'}}>{`docker exec -it alegra-kafka kafka-console-consumer \\
  --bootstrap-server localhost:9092 \\
  --topic plate-requested \\
  --from-beginning`}</code></pre>
                <p><strong>Resultado esperado</strong>: Ver eventos publicados en tiempo real</p>
                <p><strong>Validación</strong>: Confirmar que la arquitectura event-driven funciona</p>
              </div>
            </div>

            <h3>🔍 Verificación del Frontend</h3>
            <div className="frontend-tests">
              <div className="test-scenario">
                <h4>1. Navegación</h4>
                <ul>
                  <li>Verificar que todas las páginas carguen correctamente</li>
                  <li>Probar navegación entre secciones</li>
                  <li>Verificar que los enlaces funcionen</li>
                </ul>
              </div>
              <div className="test-scenario">
                <h4>2. Funcionalidades</h4>
                <ul>
                  <li>Crear órdenes desde la página de pedidos</li>
                  <li>Verificar que aparezcan las animaciones de confetti</li>
                  <li>Probar filtros en las tablas</li>
                  <li>Verificar paginación</li>
                </ul>
              </div>
              <div className="test-scenario">
                <h4>3. Responsive Design</h4>
                <ul>
                  <li>Probar en diferentes tamaños de pantalla</li>
                  <li>Verificar que las animaciones funcionen en móviles</li>
                  <li>Probar tooltips en dispositivos táctiles</li>
                </ul>
              </div>
            </div>

            <h3>📊 Métricas de Validación</h3>
            <div className="validation-metrics">
              <div className="metric-card">
                <h4>Performance</h4>
                <ul>
                  <li>Tiempo de respuesta de APIs &lt; 2 segundos</li>
                  <li>Carga de páginas &lt; 3 segundos</li>
                  <li>Cache hit ratio &gt; 80%</li>
                </ul>
              </div>
              <div className="metric-card">
                <h4>Funcionalidad</h4>
                <ul>
                  <li>100% de órdenes procesadas exitosamente</li>
                  <li>Eventos Kafka publicados correctamente</li>
                  <li>Integración con Market API funcional</li>
                </ul>
              </div>
              <div className="metric-card">
                <h4>UX/UI</h4>
                <ul>
                  <li>Animaciones fluidas sin lag</li>
                  <li>Filtros funcionando en tiempo real</li>
                  <li>Responsive design en todos los dispositivos</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case "monitoring":
        return (
          <div className="doc-section">
            <h2>📊 Monitoreo y Observabilidad</h2>
            
            <h3>📡 Eventos Kafka</h3>
            <div className="monitoring-section">
              <h4>Ver eventos en tiempo real</h4>
              <pre><code>docker-compose logs -f kafka</code></pre>
              
              <h4>Ver eventos específicos</h4>
              <pre><code>{`docker exec -it alegra-kafka kafka-console-consumer \\
  --bootstrap-server localhost:9092 \\
  --topic plate-requested \\
  --from-beginning`}</code></pre>
            </div>

            <h3>⚡ Cache Redis</h3>
            <div className="monitoring-section">
              <h4>Conectar a Redis</h4>
              <pre><code>docker exec -it alegra-redis redis-cli</code></pre>
              
              <h4>Comandos útiles</h4>
              <pre><code>{`# Ver claves cacheadas
KEYS *

# Ver datos específicos
GET recipes
GET "order:order_id:status"

# Ver estadísticas
INFO memory
INFO stats`}</code></pre>
            </div>

            <h3>📝 Logs</h3>
            <div className="monitoring-section">
              <h4>Ver logs de todos los servicios</h4>
              <pre><code>docker-compose logs -f</code></pre>
              
              <h4>Ver logs de un servicio específico</h4>
              <pre><code>{`docker-compose logs -f new-kitchen
docker-compose logs -f new-recipes`}</code></pre>
            </div>

            <h3>📈 Métricas</h3>
            <div className="metrics-grid">
              <div className="metric-card">
                <h4>Health Checks</h4>
                <ul>
                  <li>Automáticos cada 30 segundos</li>
                  <li>Verificación de conectividad</li>
                  <li>Estado de servicios</li>
                </ul>
              </div>
              <div className="metric-card">
                <h4>Logging</h4>
                <ul>
                  <li>Logging estructurado</li>
                  <li>Timestamps automáticos</li>
                  <li>Stack traces de errores</li>
                </ul>
              </div>
              <div className="metric-card">
                <h4>Event Tracking</h4>
                <ul>
                  <li>Eventos Kafka</li>
                  <li>Métricas de eventos</li>
                  <li>Auditoría completa</li>
                </ul>
              </div>
              <div className="metric-card">
                <h4>Cache Performance</h4>
                <ul>
                  <li>Hit/miss ratios</li>
                  <li>Uso de memoria</li>
                  <li>Latencia de cache</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Sección no encontrada</div>;
    }
  };

  return (
    <Layout title="Documentación">
      <div className="documentation-container">
        <div className="doc-sidebar">
          <h3>📚 Documentación</h3>
          <nav className="doc-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`doc-nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-title">{section.title}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="doc-content">
          {renderContent()}
        </div>
      </div>
    </Layout>
  );
}

export default Documentation;
