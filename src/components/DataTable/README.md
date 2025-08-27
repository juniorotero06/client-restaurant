# DataTable Component

Un componente de tabla de datos reutilizable y altamente configurable para React, con soporte para filtros, paginación, expansión de filas y animaciones.

## Características

- ✅ **Filtros avanzados** (texto, select, fecha)
- ✅ **Paginación inteligente** con navegación
- ✅ **Expansión de filas** para mostrar detalles
- ✅ **Acciones personalizadas** por fila
- ✅ **Animaciones fluidas** y efectos visuales
- ✅ **Responsive design** para móviles
- ✅ **Tipos de columnas** predefinidos (badge, code, date)
- ✅ **Renderizado personalizado** de celdas
- ✅ **Estados de carga** y vacío
- ✅ **Temas y estilos** consistentes

## Uso Básico

```jsx
import DataTable from '../../components/DataTable';

const MyComponent = () => {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' }
  ];

  const columns = [
    { key: 'id', header: 'ID', type: 'code' },
    { key: 'name', header: 'Nombre' },
    { key: 'email', header: 'Email' },
    { 
      key: 'status', 
      header: 'Estado', 
      type: 'badge',
      getColor: (value) => value === 'active' ? '#4caf50' : '#f44336',
      getText: (value) => value === 'active' ? 'Activo' : 'Inactivo'
    }
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      title="Usuarios"
      loading={false}
    />
  );
};
```

## Props

### Props Principales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `data` | Array | `[]` | Array de objetos con los datos a mostrar |
| `columns` | Array | `[]` | Configuración de las columnas |
| `title` | String | `"Tabla de Datos"` | Título de la tabla |
| `loading` | Boolean | `false` | Estado de carga |
| `emptyMessage` | String | `"No se encontraron datos"` | Mensaje cuando no hay datos |

### Props de Configuración

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `showFilters` | Boolean | `true` | Mostrar/ocultar filtros |
| `showPagination` | Boolean | `true` | Mostrar/ocultar paginación |
| `itemsPerPage` | Number | `10` | Elementos por página |
| `expandable` | Boolean | `false` | Habilitar expansión de filas |
| `className` | String | `""` | Clases CSS adicionales |

### Props de Funcionalidad

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `filters` | Array | `[]` | Configuración de filtros |
| `renderExpandedContent` | Function | `null` | Función para renderizar contenido expandido |
| `customActions` | Function | `null` | Función para renderizar acciones personalizadas |
| `onFilterChange` | Function | `null` | Callback cuando cambian los filtros |
| `onClearFilters` | Function | `null` | Callback cuando se limpian los filtros |

## Configuración de Columnas

### Estructura Básica

```jsx
const columns = [
  {
    key: 'propertyName',        // Propiedad del objeto de datos
    header: 'Título Columna',   // Título de la columna
    type: 'text',              // Tipo de columna (opcional)
    cellStyle: {},             // Estilos CSS para la celda
    headerStyle: {},           // Estilos CSS para el header
    render: (item) => {},      // Función de renderizado personalizado
    getColor: (value) => {},   // Función para color (badge)
    getText: (value) => {}     // Función para texto (badge)
  }
];
```

### Tipos de Columna Predefinidos

#### `badge`
Renderiza un badge con color y texto personalizables:

```jsx
{
  key: 'status',
  header: 'Estado',
  type: 'badge',
  getColor: (value) => value === 'active' ? '#4caf50' : '#f44336',
  getText: (value) => value === 'active' ? 'Activo' : 'Inactivo'
}
```

#### `code`
Renderiza el valor como código:

```jsx
{
  key: 'id',
  header: 'ID',
  type: 'code'
}
```

#### `date`
Renderiza fechas con formato:

```jsx
{
  key: 'createdAt',
  header: 'Fecha Creación',
  type: 'date'
}
```

### Renderizado Personalizado

```jsx
{
  key: 'name',
  header: 'Usuario',
  render: (item) => (
    <div className="user-info">
      <div className="user-name">{item.name}</div>
      <div className="user-email">{item.email}</div>
    </div>
  )
}
```

## Configuración de Filtros

### Estructura de Filtro

```jsx
const filters = [
  {
    key: 'filterName',           // Identificador único del filtro
    label: 'Etiqueta',          // Etiqueta del filtro
    type: 'text',               // Tipo: 'text', 'select', 'date'
    placeholder: 'Placeholder', // Placeholder del input
    width: 2,                   // Ancho en columnas Bootstrap (1-12)
    options: [],                // Opciones para select
    defaultValue: '',           // Valor por defecto
    dateType: 'from',           // Para fechas: 'from', 'to'
    getValue: (item) => {}      // Función para obtener valor del item
  }
];
```

### Tipos de Filtro

#### Filtro de Texto
```jsx
{
  key: 'searchTerm',
  label: 'Buscar',
  type: 'text',
  placeholder: 'Buscar...',
  width: 3
}
```

#### Filtro Select
```jsx
{
  key: 'category',
  label: 'Categoría',
  type: 'select',
  placeholder: 'Todas',
  options: [
    { value: 'tech', label: 'Tecnología' },
    { value: 'food', label: 'Alimentos' }
  ],
  width: 2
}
```

#### Filtro de Fecha
```jsx
{
  key: 'dateFrom',
  label: 'Desde',
  type: 'date',
  dateType: 'from',
  width: 2
}
```

## Expansión de Filas

Para habilitar la expansión de filas:

```jsx
<DataTable
  data={data}
  columns={columns}
  expandable={true}
  renderExpandedContent={(item) => (
    <div className="expanded-content">
      <h6>Detalles de {item.name}</h6>
      <p>{item.description}</p>
    </div>
  )}
/>
```

## Acciones Personalizadas

Para agregar botones de acción por fila:

```jsx
<DataTable
  data={data}
  columns={columns}
  customActions={(item) => (
    <div className="d-flex gap-1">
      <button className="btn btn-sm btn-outline-primary" title="Editar">
        <i className="fas fa-edit"></i>
      </button>
      <button className="btn btn-sm btn-outline-danger" title="Eliminar">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  )}
/>
```

## Callbacks

### onFilterChange
```jsx
<DataTable
  data={data}
  columns={columns}
  filters={filters}
  onFilterChange={(filterValues) => {
    console.log('Filtros cambiados:', filterValues);
    // Realizar acciones adicionales
  }}
/>
```

### onClearFilters
```jsx
<DataTable
  data={data}
  columns={columns}
  filters={filters}
  onClearFilters={() => {
    console.log('Filtros limpiados');
    // Realizar acciones adicionales
  }}
/>
```

## Ejemplos Completos

### Tabla de Usuarios
```jsx
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { key: 'id', header: 'ID', type: 'code' },
    { key: 'name', header: 'Nombre' },
    { key: 'email', header: 'Email' },
    { 
      key: 'status', 
      header: 'Estado', 
      type: 'badge',
      getColor: (value) => value === 'active' ? '#4caf50' : '#f44336',
      getText: (value) => value === 'active' ? 'Activo' : 'Inactivo'
    },
    { key: 'createdAt', header: 'Fecha Creación', type: 'date' }
  ];

  const filters = [
    {
      key: 'searchTerm',
      label: 'Buscar',
      type: 'text',
      placeholder: 'Nombre o email...',
      width: 3
    },
    {
      key: 'status',
      label: 'Estado',
      type: 'select',
      options: [
        { value: 'active', label: 'Activo' },
        { value: 'inactive', label: 'Inactivo' }
      ],
      width: 2
    }
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      title="Usuarios del Sistema"
      loading={loading}
      filters={filters}
      expandable={true}
      renderExpandedContent={(user) => (
        <div>
          <h6>Detalles del Usuario</h6>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.role}</p>
        </div>
      )}
      customActions={(user) => (
        <button className="btn btn-sm btn-outline-primary">
          <i className="fas fa-eye"></i>
        </button>
      )}
    />
  );
};
```

### Tabla de Productos
```jsx
const ProductTable = () => {
  const columns = [
    { key: 'name', header: 'Producto' },
    { 
      key: 'price', 
      header: 'Precio',
      render: (item) => `$${item.price.toFixed(2)}`
    },
    { 
      key: 'stock', 
      header: 'Stock',
      type: 'badge',
      getColor: (value) => value > 10 ? '#4caf50' : value > 0 ? '#ff9800' : '#f44336',
      getText: (value) => value > 10 ? 'Disponible' : value > 0 ? 'Bajo Stock' : 'Sin Stock'
    }
  ];

  return (
    <DataTable
      data={products}
      columns={columns}
      title="Inventario de Productos"
      itemsPerPage={20}
    />
  );
};
```

## Estilos y Temas

El componente incluye estilos CSS completos con:

- Animaciones de entrada y salida
- Efectos hover en filas y botones
- Gradientes y sombras
- Responsive design
- Estados de carga y vacío
- Efectos de partículas flotantes

Los estilos se pueden personalizar sobrescribiendo las clases CSS del componente.

## Responsive

El componente es completamente responsive y se adapta a diferentes tamaños de pantalla:

- **Desktop**: Vista completa con todos los filtros visibles
- **Tablet**: Filtros reorganizados en filas
- **Mobile**: Filtros apilados verticalmente, botones redimensionados

## Dependencias

- React 16.8+
- Bootstrap 5 (para estilos base)
- FontAwesome (para iconos)

## Notas

- El componente maneja automáticamente la paginación y filtrado
- Los filtros se aplican en tiempo real
- La expansión de filas es opcional y personalizable
- Todas las animaciones son CSS puras para mejor rendimiento
- El componente es completamente reutilizable y configurable
