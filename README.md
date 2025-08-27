# 🍽️ Cliente - Alegra Kitchen Challenge Mejorado

## 📋 Descripción

Cliente React moderno para el sistema de cocina de Alegra, completamente rediseñado con animaciones, filtros avanzados, integración de IA y una experiencia de usuario excepcional. Conectado a los servicios microservicios con arquitectura hexagonal y event-driven.

## 🚀 Nuevas Características Implementadas

### **🎨 Frontend Completamente Rediseñado**
- **Página de Inicio Moderna**: Hero section con gradientes y call-to-actions
- **Sistema de Animaciones**: Confetti, transiciones suaves, efectos hover
- **Filtros Avanzados**: Búsqueda en tiempo real en todas las tablas
- **Paginación Inteligente**: Navegación eficiente en grandes datasets
- **Responsive Design**: Experiencia optimizada para móviles y tablets
- **Tooltips Interactivos**: Información detallada al hacer hover

### **🤖 Integración de Inteligencia Artificial**
- **Página Dedicada**: Explicación completa de Google Gemini Flash 2.5
- **Tabla de Recetas IA**: Muestra recetas generadas por IA
- **Información Técnica**: Prompts, estructura de datos, configuración
- **Diseño Verde**: Consistente con la marca

### **📊 Mejoras en la Gestión de Datos**
- **Órdenes Múltiples**: Creación de hasta 5 platos por orden
- **Indicadores Visuales**: Badges con colores y estados
- **Gestión de Inventario**: Control de stock con alertas visuales
- **Historial Detallado**: Compras con filtros por fecha y cantidad

### **📚 Documentación Completa**
- **Página de Documentación**: Guía completa del sistema
- **Navegación por Secciones**: Información organizada y accesible
- **Información Técnica**: Detalles de arquitectura y despliegue

## 🛠️ Tecnologías Utilizadas

- **React 18** con TypeScript
- **Material-UI** para la interfaz
- **Bootstrap 5** para componentes adicionales
- **Axios** para comunicación con APIs
- **React Router** para navegación
- **React Toastify** para notificaciones
- **CSS Animations** para efectos visuales
- **Configuración centralizada** de APIs

## 🔗 Conexión a Servicios

### **Servicios Conectados:**

1. **Kitchen Service** (`new-kitchen`)
   - Endpoint principal: `POST /api/kitchen/request-plate`
   - Endpoint mejorado: `POST /api/recipes/order/:quantity`
   - Gestión de ingredientes
   - Historial de compras
   - Órdenes del sistema

2. **Recipes Service** (`new-recipes`)
   - Listado de recetas
   - Gestión de recetas
   - Integración con Google Gemini Flash 2.5

### **Configuración Automática:**

El cliente se conecta automáticamente según el entorno:

- **Desarrollo**: `http://localhost:3000/api` y `http://localhost:3001/api`
- **Producción**: URLs de Railway
- **Staging**: URLs de Render

## 📱 Páginas Disponibles

### **🏠 Páginas Principales**
1. **Home** (`/`) - Landing page moderna con animaciones
2. **Pedidos** (`/pedidos`) - Crear órdenes aleatorias (máx. 5 platos)
3. **Órdenes del Sistema** (`/ordenes`) - Gestión completa con filtros
4. **Recetas** (`/recetas`) - Catálogo con tooltips y filtros avanzados

### **📊 Páginas de Gestión**
5. **Inventario** (`/inventario`) - Control de stock con indicadores visuales
6. **Historial de Compras** (`/historial-compras`) - Compras con filtros por fecha

### **🤖 Nuevas Funcionalidades**
7. **Integración de IA** (`/ai-integration`) - Explicación de Google Gemini
8. **Documentación** (`/documentation`) - Guía completa del sistema

## 🎨 Sistema de Animaciones

### **✨ Efectos Visuales Implementados**
- **Confetti**: Celebración al crear órdenes exitosas
- **Slide-in**: Elementos que aparecen desde los bordes
- **Fade-in**: Transiciones suaves de opacidad
- **Hover Effects**: Interacciones al pasar el mouse
- **Loading States**: Indicadores de carga animados
- **Pulse Effects**: Elementos que llaman la atención
- **Gradient Animations**: Textos con gradientes animados

### **🎭 Animaciones por Página**
- **Home**: Partículas flotantes y gradientes
- **Pedidos**: Confetti y efectos de éxito
- **Tablas**: Fade-in por filas y hover effects
- **IA Integration**: Efectos futuristas y glow
- **Documentación**: Transiciones suaves entre secciones

## 🛠️ Instalación y Uso

### **Prerrequisitos:**
- Node.js 16+
- Servicios backend ejecutándose

### **Instalación:**
```bash
cd client
npm install
```

### **Desarrollo:**
```bash
npm start
```

### **Producción:**
```bash
npm run build
```

## 🔧 Configuración

### **Variables de Entorno:**

El cliente detecta automáticamente el entorno:

```bash
# Desarrollo (por defecto)
NODE_ENV=development

# Staging
REACT_APP_ENV=staging

# Producción
NODE_ENV=production
```

### **Configuración de APIs:**

Las URLs se configuran automáticamente en `src/config/api.js`:

```javascript
// Desarrollo
KITCHEN_SERVICE: 'http://localhost:3000/api'
RECIPES_SERVICE: 'http://localhost:3001/api'

// Producción (Railway)
KITCHEN_SERVICE: 'https://alegra-kitchen-production.up.railway.app/api'
RECIPES_SERVICE: 'https://alegra-recipes-production.up.railway.app/api'
```

## 📊 Endpoints Utilizados

### **Kitchen Service:**
- `POST /api/kitchen/request-plate` - Solicitar plato aleatorio (original)
- `GET /api/kitchen/recipes` - Obtener recetas
- `GET /api/kitchen/ingredients` - Obtener ingredientes
- `GET /api/kitchen/orders` - Obtener todas las órdenes
- `GET /api/kitchen/orders/in-progress` - Órdenes en progreso
- `GET /api/kitchen/orders/completed` - Órdenes completadas
- `GET /api/kitchen/purchase-history` - Historial de compras

### **Recipes Service:**
- `GET /api/recipes/index` - Listar todas las recetas
- `POST /api/recipes/order/:quantity` - Crear órdenes múltiples (mejorado)

## 🎯 Funcionalidades Principales

### **1. Crear Órdenes Múltiples**
- Selección de cantidad (1-5 platos)
- Recetas aleatorias (IA + tradicionales)
- Procesamiento de ingredientes
- Integración con Market API
- Event-driven con Kafka
- **Confetti animation** al completar

### **2. Gestión de Órdenes Mejorada**
- Vista de todas las órdenes con filtros avanzados
- Filtrado por estado, fecha, categoría
- Paginación inteligente
- Búsqueda en tiempo real
- Actualización en tiempo real

### **3. Inventario Avanzado**
- Visualización de ingredientes con indicadores visuales
- Control de stock con alertas
- Historial de compras con filtros
- Badges con colores para estados

### **4. Recetas con Tooltips**
- Catálogo completo de recetas
- Tooltips interactivos para ingredientes
- Filtros por categoría y dificultad
- Información detallada al hover

### **5. Integración de IA**
- Página dedicada a Google Gemini Flash 2.5
- Tabla de recetas generadas por IA
- Información técnica completa
- Diseño futurista con efectos glow

### **6. Documentación del Sistema**
- Guía completa organizada por secciones
- Información de arquitectura y despliegue
- Navegación intuitiva
- Contenido técnico detallado

## 🎨 Características de UX/UI

### **Responsive Design**
- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: Adaptación a tablets y desktop
- **Touch Friendly**: Botones y elementos táctiles
- **Flexible Layouts**: Grids que se adaptan al contenido

### **Performance**
- **Lazy Loading**: Carga bajo demanda
- **Optimized Images**: Compresión y formatos modernos
- **CSS Animations**: Hardware acceleration
- **Efficient Rendering**: React optimizations

### **Consistencia Visual**
- **Paleta Verde**: Color principal (#00B19C)
- **Typography**: Jerarquía clara de información
- **Spacing**: Sistema de espaciado consistente
- **Feedback Visual**: Estados claros de interacción

## 🔄 Event-Driven Architecture

El cliente está preparado para trabajar con la arquitectura event-driven:

- **Kafka**: Comunicación asíncrona entre servicios
- **Redis**: Caché para mejorar rendimiento
- **Eventos**: Notificaciones en tiempo real
- **Google Gemini**: Generación automática de recetas

## 🚨 Troubleshooting

### **Problemas Comunes:**

1. **Error de conexión a servicios**
   - Verificar que los servicios estén ejecutándose
   - Revisar URLs en `src/config/api.js`

2. **CORS errors**
   - Verificar configuración de CORS en servicios backend

3. **Variables de entorno**
   - Verificar configuración según entorno

4. **Animaciones no funcionan**
   - Verificar que CSS esté cargado correctamente
   - Revisar compatibilidad del navegador

### **Logs de Debug:**
```javascript
// Verificar estado de servicios
import { checkServicesHealth } from './src/config/api';
checkServicesHealth().then(console.log);
```

## 📝 Notas de Desarrollo

- El cliente usa **configuración centralizada** para APIs
- **Detección automática** de entorno
- **Manejo de errores** con toast notifications
- **Responsive design** con Material-UI y Bootstrap 5
- **Animaciones CSS** para mejor UX
- **Filtros avanzados** en todas las tablas
- **Tooltips dinámicos** para información detallada

## 🎉 ¡Listo para Usar!

El cliente está completamente rediseñado y conectado a los nuevos servicios, ofreciendo una experiencia de usuario moderna y funcional con todas las mejoras implementadas:

- 🤖 **Integración de IA** con Google Gemini Flash 2.5
- 🎨 **Frontend moderno** con animaciones y efectos visuales
- 📊 **Filtros avanzados** y paginación inteligente
- 📱 **Diseño responsive** para todos los dispositivos
- 📚 **Documentación completa** del sistema
- ✨ **Efectos visuales** y confetti para mejor UX

**URLs de acceso:**
- **Desarrollo**: http://localhost:3002
- **Home**: http://localhost:3002/
- **Pedidos**: http://localhost:3002/pedidos
- **IA Integration**: http://localhost:3002/ai-integration
- **Documentación**: http://localhost:3002/documentation
