const CATALOGO_SERVICIOS = {
  "Crédito": {
    categorias: [
      "Crédito de Consumo",
      "Crédito de Vivienda",
      "Crédito Empresarial",
      "Crédito Educativo",
      "Refinanciación de Crédito"
    ]
  },
  "Ahorro y Capacitación": {
    categorias: ["Cuenta de Ahorro", "CDT", "Ahorro Programado", "Cuenta Corriente"]
  },
  "Canales Digitales": {
    categorias: ["App Móvil", "Portal Web", "Cajero Automático", "Banca Telefónica"]
  },
  "Atención al Asociado": {
    categorias: ["Atención Presencial", "Atención Telefónica", "Atención Virtual"]
  },
  "Pagos y Transferencias": {
    categorias: ["Pago PSE", "Transferencias Nacionales", "Pago de Servicios Públicos", "Débito Automático"]
  },
  "Seguros y Protección": {
    categorias: ["Seguro de Vida", "Seguro de Desempleo", "Seguro de Hogar", "Seguro Deudor"]
  },
  "Invesiones": {
    categorias: ["Fondo de Inversión", "Portafolio Personal"]
  },
  "Centrales de Riesgo": {
    categorias: ["Reporte en DataCrédito", "Reporte en TransUnion", "Consulta de Historia Crediticia"]
  },
  "Educación Cooperativa": {
    categorias: ["Talleres Financieros", "Programa de Ahorro"]
  },
  "Vinculacion y Retiro": {
    categorias: ["Vinculación de Asociado", "Actualización de Datos", "Retiro Voluntario"]
  },
  "Catedra y Cobranza": {
    categorias: ["Gestión de Mora", "Acuerdo de Pago", "Reestructuración de Crédito"]
  },
  "Certificaciones y Documentos": {
    categorias: ["Certificado Tributario", "Extracto de Cuenta", "Paz y Salvo", "Constancia de Asociado", "Certificado de Ingresos"]
  }
};

// Subcategorías organizadas por categoría
// Tomadas del archivo de datos de la plantilla
const SUBCATEGORIAS_POR_CATEGORIA = {
  "Crédito de Consumo": [
    "Descuento no reconocido en cuota",
    "Certificado de crédito vigente",
    "Liquidación anticipada de crédito",
    "Error en tasa de interés aplicada",
    "Cobro de seguro no autorizado",
    "Solicitud de refinanciación",
    "Tabla de amortización",
    "Inconformidad con cuota calculada"
  ],
  "Crédito de Vivienda": [
    "Estudio de crédito vivienda",
    "Demora en desembolso de vivienda",
    "Error en amortización hipotecaria",
    "Paz y salvo hipotecario",
    "Levantamiento de hipoteca"
  ],
  "Crédito Empresarial": [
    "Solicitud de crédito para capital de trabajo",
    "Demora en aprobación empresarial",
    "Error en condiciones del crédito empresarial"
  ],
  "Crédito Educativo": [
    "Solicitud de crédito educativo",
    "Demora en desembolso educativo"
  ],
  "Refinanciación de Crédito": [
    "Solicitud de ampliación de plazo",
    "Solicitud de período de gracia",
    "Inconformidad con condiciones de refinanciación"
  ],
  "Cuenta de Ahorro": [
    "Saldo incorrecto en cuenta",
    "Bloqueo de cuenta de ahorro",
    "Cobro de cuota de manejo no autorizado",
    "Movimiento no reconocido en cuenta",
    "Solicitud de extracto de cuenta",
    "Apertura de cuenta de ahorro"
  ],
  "CDT": [
    "Renovación automática no autorizada de CDT",
    "Error en tasa de CDT",
    "Cancelación anticipada de CDT"
  ],
  "Ahorro Programado": [
    "Descuento automático no realizado",
    "Inconformidad con rendimientos"
  ],
  "Cuenta Corriente": [
    "Cheque devuelto sin justificación",
    "Error en estado de cuenta corriente"
  ],
  "App Móvil": [
    "Error de inicio de sesión en app",
    "Funcionalidad no disponible en app",
    "App no carga o se cierra sola",
    "Error en notificaciones push",
    "Transacción fallida en app",
    "Sugerencia de nueva funcionalidad en app"
  ],
  "Portal Web": [
    "No puede ingresar al portal web",
    "Error al descargar documentos en portal",
    "Información desactualizada en portal",
    "Sugerencia de mejora en portal web"
  ],
  "Cajero Automático": [
    "Cajero retuvo tarjeta",
    "Retiro no acreditado en cajero",
    "Cajero fuera de servicio frecuente"
  ],
  "Banca Telefónica": [
    "Tiempo de espera excesivo en línea",
    "Transacción telefónica no procesada"
  ],
  "Atención Presencial": [
    "Tiempo de espera excesivo en oficina",
    "Trato inadecuado por parte del asesor",
    "Información incorrecta suministrada",
    "Felicitación por excelente atención",
    "Demora en trámite de documentos",
    "Oficina cerrada en horario de atención"
  ],
  "Atención Telefónica": [
    "Asesor no resolvió la consulta",
    "Llamada cortada sin solución"
  ],
  "Atención Virtual": [
    "Chat sin respuesta oportuna",
    "Videollamada con problemas técnicos"
  ],
  "Pago PSE": [
    "Pago PSE no acreditado en destino",
    "Débito PSE doble o duplicado",
    "Pago PSE rechazado sin motivo",
    "Solicitud de comprobante de pago PSE"
  ],
  "Transferencias Nacionales": [
    "Transferencia rechazada",
    "Transferencia duplicada",
    "Transferencia a cuenta equivocada",
    "Demora en acreditación de transferencia",
    "Comprobante de transferencia"
  ],
  "Pago de Servicios Públicos": [
    "Pago de servicio no registrado",
    "Cobro doble de servicio público"
  ],
  "Débito Automático": [
    "Débito automático no autorizado",
    "Débito automático no ejecutado"
  ],
  "Seguro de Vida": [
    "Cobro de prima no autorizado",
    "Solicitud de información de póliza",
    "Reclamación de seguro de vida"
  ],
  "Seguro de Desempleo": [
    "Activación de seguro de desempleo",
    "Rechazo de reclamación de desempleo"
  ],
  "Seguro de Hogar": [
    "Reclamación por daño en hogar",
    "Cobro de prima de hogar no autorizado"
  ],
  "Seguro Deudor": [
    "Cobro de seguro deudor incorrecto",
    "Cancelación de seguro deudor"
  ],
  "Fondo de Inversión": [
    "Inconformidad con rendimientos del fondo",
    "Solicitud de retiro del fondo"
  ],
  "Portafolio Personal": [
    "Error en valoración del portafolio",
    "Solicitud de asesoría de inversión"
  ],
  "Reporte en DataCrédito": [
    "Reporte negativo incorrecto en DataCrédito",
    "Solicitud de eliminación de reporte",
    "Demora en actualización de reporte",
    "Inconformidad con tiempo de corrección"
  ],
  "Reporte en TransUnion": [
    "Reporte negativo incorrecto en TransUnion",
    "Solicitud de corrección en TransUnion"
  ],
  "Consulta de Historia Crediticia": [
    "Solicitud de historia crediticia",
    "Inconformidad con historia crediticia"
  ],
  "Talleres Financieros": [
    "Inscripción a taller financiero",
    "Solicitud de material educativo"
  ],
  "Programa de Ahorro": [
    "Inscripción a programa de ahorro"
  ],
  "Vinculación de Asociado": [
    "Demora en proceso de vinculación",
    "Documentación rechazada en vinculación"
  ],
  "Actualización de Datos": [
    "Actualización de correo electrónico",
    "Actualización de dirección y teléfono",
    "Cambio de datos bancarios",
    "Actualización de número de celular"
  ],
  "Retiro Voluntario": [
    "Solicitud de retiro voluntario",
    "Demora en devolución de aportes"
  ],
  "Gestión de Mora": [
    "Cobro de mora incorrecto",
    "Inconformidad con gestión de cobranza",
    "Llamadas de cobranza inapropiadas",
    "Solicitud de paz y salvo de mora"
  ],
  "Acuerdo de Pago": [
    "Solicitud de acuerdo de pago",
    "Incumplimiento de acuerdo por la cooperativa"
  ],
  "Reestructuración de Crédito": [
    "Solicitud de reestructuración de crédito",
    "Demora en proceso de reestructuración"
  ],
  "Certificado Tributario": [
    "Certificado de intereses pagados",
    "Certificado de retención en la fuente",
    "Certificado de GMF (4x1000)"
  ],
  "Extracto de Cuenta": [
    "Extracto de cuenta de ahorro",
    "Extracto de crédito",
    "Extracto de CDT"
  ],
  "Paz y Salvo": [
    "Paz y salvo de crédito de consumo",
    "Paz y salvo de crédito de vivienda",
    "Paz y salvo general de obligaciones"
  ],
  "Constancia de Asociado": [
    "Constancia de vinculación activa",
    "Constancia de antigüedad como asociado"
  ],
  "Certificado de Ingresos": [
    "Certificado de ingresos y retenciones",
    "Certificado de aportes sociales"
  ]
};