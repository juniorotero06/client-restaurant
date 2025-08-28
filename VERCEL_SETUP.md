# Configuración de Vercel para resolver Mixed Content

## Problema
El navegador bloquea las peticiones HTTPS → HTTP por seguridad (Mixed Content). Para solucionarlo, usamos un proxy en Vercel.

## Solución implementada

### 1. Archivo vercel.json
- Configura rewrites para redirigir peticiones del frontend a los servicios backend
- Usa variables de entorno para las URLs del backend
- Incluye headers CORS para permitir las peticiones

### 2. Configuración de API
- En desarrollo: URLs completas (http://localhost:3000/api)
- En producción: Rutas relativas (/api/kitchen, /api/recipes)
- En staging: URLs completas HTTPS (https://alegra-kitchen.onrender.com/api)

## Configuración de variables de entorno en Vercel

### Paso 1: Ir al Dashboard de Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Selecciona tu proyecto
3. Ve a la pestaña "Settings"

### Paso 2: Configurar Environment Variables
En la sección "Environment Variables", agrega:

```
KITCHEN_SERVICE_URL=http://ip172-18-0-50-d2o6s3s69qi0008n5h9g-3000.direct.labs.play-with-docker.com/api
RECIPES_SERVICE_URL=http://ip172-18-0-50-d2o6s3s69qi0008n5h9g-3001.direct.labs.play-with-docker.com/api
KITCHEN_SERVICE_BASE_URL=http://ip172-18-0-50-d2o6s3s69qi0008n5h9g-3000.direct.labs.play-with-docker.com
RECIPES_SERVICE_BASE_URL=http://ip172-18-0-50-d2o6s3s69qi0008n5h9g-3001.direct.labs.play-with-docker.com
```

**Nota:** 
- Las URLs con `/api` se usan para los endpoints de la aplicación
- Las URLs sin `/api` se usan para los health checks

### Paso 3: Aplicar a todos los entornos
- Marca "Production", "Preview" y "Development"
- Haz clic en "Save"

### Paso 4: Redesplegar
1. Ve a la pestaña "Deployments"
2. Haz clic en "Redeploy" en el último deployment

## Cómo funciona

### En desarrollo local:
```
Frontend (http://localhost:3000) → Backend (http://localhost:3000/api)
```

### En producción (Vercel):
```
Frontend (https://tu-app.vercel.app) → Proxy Vercel → Backend (http://play-with-docker.com)
```

### Flujo de peticiones:
1. Frontend hace petición a `/api/kitchen/recipes`
2. Vercel intercepta la petición
3. Vercel reenvía a `${KITCHEN_SERVICE_URL}/kitchen/recipes`
4. Backend responde
5. Vercel devuelve la respuesta al frontend

## Actualización de URLs

Cuando cambies de instancia en Play with Docker:

1. Obtén las nuevas URLs
2. Ve al dashboard de Vercel
3. Actualiza las variables de entorno:
   - `KITCHEN_SERVICE_URL`
   - `RECIPES_SERVICE_URL`
4. Redesplega la aplicación

**No necesitas cambiar el código, solo las variables de entorno.**

## Verificación

Para verificar que todo funciona:

1. Abre las herramientas de desarrollador (F12)
2. Ve a la pestaña "Network"
3. Haz una petición desde tu aplicación
4. Verifica que las peticiones van a `/api/kitchen/...` y no a URLs HTTP directas
5. Confirma que no hay errores de Mixed Content en la consola

### Verificación específica para tu configuración:

**URLs esperadas en el navegador:**
- Frontend hace petición a: `https://tu-app.vercel.app/api/kitchen/recipes`
- Frontend hace petición a: `https://tu-app.vercel.app/api/recipes/index`

**URLs a las que Vercel redirige:**
- Vercel redirige a: `http://ip172-18-0-50-d2o6s3s69qi0008n5h9g-3000.direct.labs.play-with-docker.com/api/kitchen/recipes`
- Vercel redirige a: `http://ip172-18-0-50-d2o6s3s69qi0008n5h9g-3001.direct.labs.play-with-docker.com/api/recipes/index`

**Health checks:**
- Frontend hace petición a: `https://tu-app.vercel.app/health/kitchen`
- Vercel redirige a: `http://ip172-18-0-50-d2o6s3s69qi0008n5h9g-3000.direct.labs.play-with-docker.com/health`
- Frontend hace petición a: `https://tu-app.vercel.app/health/recipes`
- Vercel redirige a: `http://ip172-18-0-50-d2o6s3s69qi0008n5h9g-3001.direct.labs.play-with-docker.com/health`

## Troubleshooting

### Error: "Mixed Content"
- Verifica que las variables de entorno estén configuradas correctamente
- Asegúrate de que el deployment se haya completado después de cambiar las variables

### Error: "CORS"
- El archivo vercel.json incluye headers CORS
- Si persiste, verifica que el backend permita peticiones desde tu dominio de Vercel

### Error: "404 Not Found"
- Verifica que las URLs del backend sean correctas
- Confirma que los servicios estén funcionando en Play with Docker
