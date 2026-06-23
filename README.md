# GestorFPQRS — Sistema de Gestión de Casos Financieros

Solución web desarrollada como prueba técnica para el cargo de **Maquetador Web** en Estrategia Segura S.A.S.

El sistema permite gestionar casos FPQRS (Felicitaciones, Peticiones, Quejas, Reclamos y Sugerencias) de una cooperativa financiera, incluyendo radicación pública, bandeja de gestión interna y seguimiento detallado de cada caso.

---

## Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| HTML5 | — | Estructura semántica de todas las vistas |
| CSS3 | — | Estilos personalizados por vista |
| Bootstrap | 5.3.3 | Grid, componentes y utilidades responsive |
| Bootstrap Icons | 1.11.3 | Íconos del sistema |
| Lucide Icons | Latest | Íconos complementarios |
| JavaScript (ES6+) | — | Lógica funcional de la aplicación |
| jQuery | 3.7.1 | Manipulación del DOM, eventos y carga de componentes |

> Todos los recursos externos se cargan mediante CDN. No se requiere instalación de dependencias.

---

## Estructura del proyecto

```
gestor-fpqrs/
│
├── index.html              ← Inicio de sesión
├── bandeja.html            ← Bandeja de casos (vista principal)
├── detalle.html            ← Detalle del caso seleccionado
├── formulario.html         ← Formulario público de radicación FPQRS
├── confirmacion.html       ← Confirmación de caso radicado
│
├── components/
│   └── sidebar.html        ← Sidebar compartido (cargado con jQuery)
│
├── assets/
│   ├── css/
│   │   ├── main.css        ← Variables globales, reset y clases compartidas
│   │   ├── login.css       ← Estilos del login
│   │   ├── bandeja.css     ← Estilos de la bandeja
│   │   ├── detalle.css     ← Estilos del detalle del caso
│   │   ├── formulario.css  ← Estilos del formulario FPQRS
│   │   ├── confirmacion.css← Estilos de la vista de confirmación
│   │   └── sidebar.css     ← Estilos del sidebar compartido
│   │
│   ├── js/
│   │   ├── data.js         ← Datos semilla, catálogos y credenciales
│   │   ├── data-catalogo.js← Catálogo extendido de servicios y subcategorías
│   │   ├── auth.js         ← Autenticación, sesión y funciones globales
│   │   ├── bandeja.js      ← Lógica de bandeja, filtros y paginación
│   │   ├── detalle.js      ← Lógica del detalle, tabs y acciones
│   │   ├── formulario.js   ← Validación y radicación del formulario
│   │   └── confirmacion.js ← Carga dinámica de la confirmación
│   │
│   └── img/
│       └── logo.webp       ← Logo del sistema
│
└── README.md
```

---

## Instrucciones para ejecutar la solución

### Opción A — Abrir directamente en el navegador

1. Descomprimir el archivo `.zip` en cualquier carpeta
2. Abrir el archivo `index.html` con cualquier navegador moderno (Chrome, Firefox, Edge)

> **Nota:** La carga del sidebar usa `$.load()` de jQuery, que requiere un servidor local para funcionar correctamente en algunos navegadores por restricciones de CORS.

### Opción B — Servidor local recomendado (VS Code)

1. Instalar la extensión **Live Server** en Visual Studio Code
2. Abrir la carpeta del proyecto en VS Code
3. Clic derecho sobre `index.html` → **Open with Live Server**
4. El proyecto se abrirá automáticamente en `http://127.0.0.1:5500`

### Cuentas de demostración

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@coopfinanzas.com.co | Admin@2026! |
| Operador | operador@coopfinanzas.com.co | Oper@2026! |
| Supervisor | supervisor@coopfinanzas.com.co | Super@2026! |

---

## Vistas implementadas

| Vista | Ruta | Descripción |
|---|---|---|
| Inicio de sesión | `index.html` | Autenticación con tabla de cuentas demo y autocompletado |
| Bandeja de casos | `bandeja.html` | Tabla con filtros, búsqueda, ordenamiento y paginación |
| Detalle del caso | `detalle.html` | Información completa, tabs y panel de acciones |
| Formulario FPQRS | `formulario.html` | Radicación pública con selects en cascada y validación |
| Confirmación | `confirmacion.html` | Resultado de la radicación con número de radicado |

---

## Consideraciones relevantes

### Simulación funcional sin backend

La solución no requiere base de datos ni servicios externos. La persistencia se implementa mediante:

- **`localStorage`**: almacena los casos. Se inicializa con datos semilla al primer acceso y persiste entre sesiones.
- **`sessionStorage`**: mantiene la sesión del usuario autenticado y el caso seleccionado entre páginas.

### Componente compartido (sidebar)

El sidebar se implementó como un archivo HTML independiente (`components/sidebar.html`) cargado dinámicamente con `$.load()` en cada vista. Esto evita duplicación de código y centraliza la navegación.

### Selects en cascada

El formulario de radicación implementa tres niveles de selects dependientes: **Servicio → Categoría → Subcategoría**. Cada nivel se habilita y llena dinámicamente según la selección anterior, usando un catálogo definido en `data-catalogo.js` con más de 120 subcategorías.

### Validación de formularios

La validación del formulario FPQRS usa las clases `is-invalid` e `invalid-feedback` de Bootstrap para mostrar mensajes de error contextuales bajo cada campo, con scroll automático al primer error detectado.

### Flujo completo de un caso

1. Un ciudadano radica su caso en `formulario.html`
2. El caso se guarda en `localStorage` y aparece en `bandeja.html`
3. Un operador puede consultarlo en `detalle.html`
4. Desde el detalle puede cambiar estado, prioridad, reasignar, registrar observaciones o cerrar/anular el caso
5. Todos los cambios quedan registrados en el historial del caso

### Responsive

Todas las vistas se adaptan a dispositivos móviles, tabletas y escritorio usando el sistema de grillas de Bootstrap (`col-12`, `col-md-*`, `col-lg-*`) y media queries personalizadas donde fue necesario.

---

## Autor

**Santiago Tonguino**  
Desarrollador Fullstack  
Medellín, Colombia — 2026