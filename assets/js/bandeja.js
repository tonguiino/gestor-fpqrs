$(document).ready(function () {
  $("#sidebar").load("/components/sidebar.html", function () {
    $('.sidebar-link[data-page="bandeja"]').addClass("active");
  });

  const casos = JSON.parse(localStorage.getItem("casos")) || [];

  const casosActivos = casos.filter(function (c) {
    return c.estado !== "Cerrado" && c.estado !== "Anulado"; //Revisar estados porque si son diferentes al original
  }).length;

  const slaVencidos = casos.filter(function (c) {
    return c.sla === "vencido"; //revisar porque segun veo esto deberia se con fecha mas no con palabra vencido o proximo
  }).length;

  const slaProximos = casos.filter(function (c) {
    return c.sla === "proximo";
  }).length;

  const hoy = new Date().toISOString().split("T")[0];
  const cerradosHoy = casos.filter(function (c) {
    return c.estado === "Cerrado" && c.fechaLimite === hoy;
  }).length;

  $("#cardActivos").text(casosActivos);
  $("#cardVencidos").text(slaVencidos);
  $("#cardProximos").text(slaProximos);
  $("#cardCerradosHoy").text(cerradosHoy);

  //Tabla

  function renderizarTabla(listaCasos) {
    const tbody = $("#tablaCasos");
    tbody.empty();

    if (listaCasos.length === 0) {
      tbody.append(`
        <tr>
          <td colspan='13'>No se encontraron casos</td>
        </tr>
        `);
      return;
    }

    $.each(listaCasos, function (index, caso) {
      const estadoBadge = obtenerBadgeEstado(caso.estado);
      const semaforoHtml = obtenerSemaforo(caso.sla);
      const prioridadHtml = obtenerBadgePrioridad(caso.prioridad);

      const fila = `
      <tr class='fila-caso' data-id="${caso.id}">
          <td>${caso.id}</td>
          <td>${formatearFecha(caso.fechaCreacion)}</td>
          <td>${caso.tipo}</td>
          <td>${caso.servicio}</td>
          <td>${caso.categoria}</td>
          <td>${caso.subcategoria}</td>
          <td>${caso.asociado}</td>
          <td>${caso.responsable}</td>
          <td>${prioridadHtml}</td>
          <td>${estadoBadge}</td>
          <td>${caso.fechaLimite}</td>
          <td>${caso.semaforoHtml}</td>
          <td>
            <button type="button" data-id="${caso.id}" class="btn-ver-caso translate-middle-y me-2 border-0 bg-transparent">
                  <i data-lucide="eye" id="eyeOpen" width="20" height="20"></i>
            </button>
          </td>
      </tr>
      `;

      tbody.append(fila);
    });
  }
  renderizarTabla(casos);

  //Funcion buscar
  $("#inputBuscar").on("input", function () {
    const termino = $(this).val().toUpperCase().trim();
    const casosFiltrados = casos.filter(function (c) {
      return (
        c.id.toUpperCase().includes(termino) ||
        c.asociado.toUpperCase().includes(termino)
      );
    });
    renderizarTabla(casosFiltrados);
  });

  //Guardar info
  $(document).on("click", ".fila-caso", function () {
    const id = $(this).data("id");
    sessionStorage.setItem("casoSeleccionado", id);
    window.location.href = "detalle.html";
  });

  $(document).on("click", ".btn-ver-caso", function () {
    e.stopPropagation();

    const id = $(this).data("id");
    sessionStorage.setItem("casoSeleccionado", id);
    window.location.href = "detalle.html";
  });
});

//Funciones auxiliares

function formatearFecha(fecha) {
  if (!fecha) {
    return "-";
  }

  const partes = fecha.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

function obtenerBadgeEstado(estado) {
  const clases = {
    'Abierto' : 'badge-abierto',
    'En proceso': 'badge-en-proceso',
    'Cerrado': 'badge-cerrado',
    'Anulado': 'badge-anulado'
  };
  const clase = clases[estado] || 'badge-anulado';
  return `<span class='px-2 py-1 ${clase}'>${estado}</span>`
}

function obtenerSemaforo(sla) {
  const config = {
    'vencido': { clase: 'text-danger',  bg: 'bg-danger',  texto: 'Vencido' },
    'proximo': { clase: 'text-warning', bg: 'bg-warning', texto: 'Próximo a vencer' },
    'ok':      { clase: 'text-success', bg: 'bg-success', texto: 'En tiempo' }
  };
  const c = config[sla] || config['ok']
  return `
      <span class="d-inline-flex align-items-center gap-1 ${c.clase} small">
      <div style="width:6px;height:6px;border-radius:50%;" class="${c.bg}"></div>
      ${c.texto}
    </span>
  `;
}

function obtenerBadgePrioridad(prioridad) {
  const config = {
    'Alta':  { bg: '#fee2e2', color: '#dc2626' },
    'Media': { bg: '#fef3c7', color: '#d97706' },
    'Baja':  { bg: '#dcfce7', color: '#16a34a' }
  };
  const c = config[prioridad] || config['Baja'];
  return `
    <span style="background:${c.bg};color:${c.color};padding:2px 8px; border-radius:20px;font-size:0.75rem;font-weight:600;">
      ${prioridad}
    </span>
  `;
}