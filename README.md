# GestorFPQRS — Sistema de Gestión de Casos Financieros

Solución web desarrollada como prueba técnica para el cargo de **Maquetador Web** en Estrategia Segura S.A.S.

El sistema permite gestionar casos FPQRS (Felicitaciones, Peticiones, Quejas, Reclamos y Sugerencias) de una cooperativa financiera, incluyendo radicación pública, bandeja de gestión interna y seguimiento detallado de cada caso.

---

## Tecnologías utilizadas

- **HTML5** → Estructura semántica de todas las vistas.
- **CSS3** → Estilos personalizados y diseño visual.
- **Bootstrap 5.3.3** → Sistema de grillas, componentes y utilidades responsive.
- **JavaScript (ES6+)** → Lógica funcional de la aplicación.
- **jQuery 3.7.1** → Manipulación del DOM, eventos y carga dinámica de componentes.
- **Lucide Icons** → Iconografía principal del sistema.
- **Bootstrap Icons** → Iconografía complementaria.

> Todos los recursos externos se cargan mediante CDN. No se requiere instalación de dependencias.

---

## Estructura del proyecto

```text
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

1. Descomprimir el archivo `.zip` en cualquier carpeta.
2. Abrir el archivo `index.html` con cualquier navegador moderno (Chrome, Firefox o Edge).

### Opción B — Servidor local recomendado (Visual Studio Code)

1. Instalar la extensión **Live Server**.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Hacer clic derecho sobre `index.html`.
4. Seleccionar **Open with Live Server**.
5. El proyecto se abrirá automáticamente en `http://127.0.0.1:5500`.

---

## Cuentas de demostración

### Administrador

- **Correo:** `admin@coopfinanzas.com.co`
- **Contraseña:** `Admin@2026!`

### Operador

- **Correo:** `operador@coopfinanzas.com.co`
- **Contraseña:** `Oper@2026!`

### Supervisor

- **Correo:** `supervisor@coopfinanzas.com.co`
- **Contraseña:** `Super@2026!`

---

## Vistas implementadas

### Inicio de sesión (`index.html`)

Autenticación mediante cuentas de demostración y autocompletado de credenciales.

### Bandeja de casos (`bandeja.html`)

Vista principal para la gestión de casos con búsqueda, filtros, ordenamiento y paginación.

### Detalle del caso (`detalle.html`)

Visualización completa del caso seleccionado, historial de movimientos, comentarios y acciones operativas.

### Formulario FPQRS (`formulario.html`)

Radicación pública de solicitudes mediante formulario dinámico con validaciones y selects dependientes.

### Confirmación (`confirmacion.html`)

Resumen de la radicación realizada, mostrando el número de caso generado.

---

## Consideraciones relevantes

### Simulación funcional sin backend

La solución no requiere base de datos ni servicios externos. La persistencia se implementa mediante:

- **localStorage:** almacena los casos. Se inicializa con datos semilla al primer acceso y persiste entre sesiones.
- **sessionStorage:** mantiene el caso seleccionado entre páginas.

### Componente compartido (Sidebar)

El sidebar se implementó como un archivo HTML independiente (`components/sidebar.html`) cargado dinámicamente mediante `$.load()` en cada vista. Esto evita duplicación de código y centraliza la navegación del sistema.

### Selects en cascada

El formulario de radicación implementa tres niveles de selección dependiente:

**Servicio → Categoría → Subcategoría**

Cada nivel se habilita y se carga dinámicamente según la selección anterior, utilizando un catálogo definido en `data-catalogo.js` con más de 120 subcategorías.

### Validación de formularios

La validación del formulario FPQRS utiliza las clases `is-invalid` e `invalid-feedback` de Bootstrap para mostrar mensajes de error contextuales bajo cada campo, incluyendo desplazamiento automático hacia el primer error detectado.

### Flujo completo de un caso

1. Un ciudadano radica un caso desde `formulario.html`.
2. El caso se almacena en `localStorage`.
3. El registro aparece automáticamente en `bandeja.html`.
4. Un operador puede consultar el caso en `detalle.html`.
5. Desde el detalle puede actualizar estado, prioridad, responsable, observaciones o cerrar/anular el caso.
6. Todos los cambios quedan registrados en el historial del caso.

### Responsive Design

Todas las vistas se adaptan a dispositivos móviles, tabletas y escritorio utilizando:

- Grid System de Bootstrap (`col-12`, `col-md-*`, `col-lg-*`).
- Componentes responsive de Bootstrap.
- Media queries personalizadas cuando fue necesario.

---

## Autor

**Santiago Tonguino**  
Desarrollador Full Stack  
Medellín, Colombia — 2026
