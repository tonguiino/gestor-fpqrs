const USUARIOS = [
  {
    id: 1,
    nombre: "Administrador",
    email: "admin@coopfinanzas.com.co",
    password: "Admin@2026!",
    rol: "Administrador",
  },
  {
    id: 2,
    nombre: "Carlos Operador",
    email: "operador@coopfinanzas.com.co",
    password: "Oper@2026!",
    rol: "Operador",
  },
  {
    id: 3,
    nombre: "Laura Supervisora",
    email: "supervisor@coopfinanzas.com.co",
    password: "Super@2026!",
    rol: "Supervisor",
  },
];

const CASOS_INICIALES = [
  {
    id: "FPQRS-2026-001",
    asociado: "Maria Garcia Lopez",
    tipoDocumento: "CC",
    documento: "1023456789",
    correo: "maria.garcia@email.com",
    celular: "3001234567",
    tipo: "Queja",
    servicio: "Créditos",
    categoria: "Cuota",
    descripcion: "El valor de mi cuota cambió sin previo aviso.",
    prioridad: "Alta",
    estado: "Abierto",
    sla: "vencido",
    responsable: "Carlos Operador",
    fechaCreacion: "2026-06-01",
    fechaLimite: "2026-06-08",
    comentarios: [],
    adjuntos: [],
    historial: [
      {
        fecha: "2026-06-01",
        usuario: "Sistema",
        accion: "Caso creado",
      },
    ],
  },
  {
    id: "FPQRS-2026-002",
    asociado: "Juan Carlos Pérez",
    tipoDocumento: "CC",
    documento: "987654321",
    correo: "juan.perez@email.com",
    celular: "3109876543",
    tipo: "Petición",
    servicio: "Ahorros",
    categoria: "Extracto",
    descripcion: "Solicito extracto de cuenta de los últimos 6 meses.",
    prioridad: "Media",
    estado: "En proceso",
    sla: "proximo",
    responsable: "Laura Supervisora",
    fechaCreacion: "2026-06-05",
    fechaLimite: "2026-06-15",
    comentarios: [],
    adjuntos: [],
    historial: [
      {
        fecha: "2026-06-05",
        usuario: "Sistema",
        accion: "Caso creado",
      },
      {
        fecha: "2026-06-06",
        usuario: "Laura Supervisora",
        accion: "Caso asignado y en proceso",
      },
    ],
  },
  {
    id: "FPQRS-2026-003",
    asociado: "Ana Sofía Ramírez",
    tipoDocumento: "CC",
    documento: "112233445",
    correo: "ana.ramirez@email.com",
    celular: "3154567890",
    tipo: "Reclamo",
    servicio: "Seguros",
    categoria: "Cobro",
    descripcion: "Me cobraron un seguro que no autoricé.",
    prioridad: "Alta",
    estado: "Abierto",
    sla: "vencido",
    responsable: "Carlos Operador",
    fechaCreacion: "2026-06-03",
    fechaLimite: "2026-06-10",
    comentarios: [],
    adjuntos: [],
    historial: [
      {
        fecha: "2026-06-03",
        usuario: "Sistema",
        accion: "Caso creado",
      },
    ],
  },
  {
    id: "FPQRS-2026-004",
    asociado: "Roberto Mendoza",
    tipoDocumento: "CC",
    documento: "556677889",
    correo: "roberto.mendoza@email.com",
    celular: "3001112233",
    tipo: "Solicitud",
    servicio: "Créditos",
    categoria: "Refinanciación",
    descripcion: "Solicito refinanciación de mi crédito vigente.",
    prioridad: "Baja",
    estado: "Cerrado",
    sla: "ok",
    responsable: "Laura Supervisora",
    fechaCreacion: "2026-06-02",
    fechaLimite: "2026-06-12",
    comentarios: [],
    adjuntos: [],
    historial: [
      {
        fecha: "2026-06-02",
        usuario: "Sistema",
        accion: "Caso creado",
      },
      {
        fecha: "2026-06-09",
        usuario: "Laura Supervisora",
        accion: "Caso cerrado satisfactoriamente",
      },
    ],
  },
  {
    id: "FPQRS-2026-005",
    asociado: "Claudia Herrera",
    tipoDocumento: "CC",
    documento: "334455667",
    correo: "claudia.herrera@email.com",
    celular: "3187654321",
    tipo: "Queja",
    servicio: "Ahorros",
    categoria: "Intereses",
    descripcion: "Los intereses de mi cuenta no corresponden a los pactados.",
    prioridad: "Media",
    estado: "En proceso",
    sla: "ok",
    responsable: "Carlos Operador",
    fechaCreacion: "2026-06-10",
    fechaLimite: "2026-06-20",
    comentarios: [],
    adjuntos: [],
    historial: [
      {
        fecha: "2026-06-10",
        usuario: "Sistema",
        accion: "Caso creado",
      },
    ],
  },
];

const CATALOGO = {
  "Créditos": ["Cuota", "Refinanciación", "Paz y salvo", "Otro"],
  "Ahorros": ["Extracto", "Intereses", "Retiro", "Otro"],
  "Seguros": ["Cobro", "Cancelación", "Siniestro", "Otro"],
  "Tarjetas": ["Bloqueo", "Cobro", "Beneficios", "Otro"],
};

const TIPOS_CASO = ["Queja", "Petición", "Reclamo", "Solicitud"];

const TIPOS_DOCUMENTO = ["CC", "CE", "NIT", "Pasaporte", "TI"];

const PRIORIDADES = ["Alta", "Media", "Baja"];

const ESTADOS = ["Abierto", "En proceso", "Cerrado", "Anulado"];

const ASOCIADOS = [
  {
    id: 1,
    tipoDocumento: "CC",
    documento: "1023456789",
    nombre: "María García López",
    correo: "maria.garcia@email.com",
    celular: "3001234567",
    direccion: "Calle 45 #32-10, Medellín",
  },
  {
    id: 2,
    tipoDocumento: "CC",
    documento: "987654321",
    nombre: "Juan Carlos Pérez",
    correo: "juan.perez@email.com",
    celular: "3109876543",
    direccion: "Carrera 80 #12-55, Medellín",
  },
  {
    id: 3,
    tipoDocumento: "CC",
    documento: "112233445",
    nombre: "Ana Sofía Ramírez",
    correo: "ana.ramirez@email.com",
    celular: "3154567890",
    direccion: "Avenida El Poblado #15-30, Medellín",
  },
];

function inicializarDatos() {
  if (!localStorage.getItem("casos")) {
    localStorage.setItem("casos", JSON.stringify(CASOS_INICIALES));
  }

  if (!localStorage.getItem("asociados")) {
    localStorage.setItem("asociados", JSON.stringify(ASOCIADOS));
  }
}

inicializarDatos()