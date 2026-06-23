$(document).ready(function () {
  $("#sidebar").load("/components/sidebar.html", function () {
    $('.sidebar-link[data-page="bandeja"]').addClass("active");
  });

  const casos = JSON.parse(localStorage.getItem("casos")) || [];

  let ordenActual = { columna: null, direccion: "asc" };
  // ── Paginación ──
  const CASOS_POR_PAGINA = 10;
  let paginaActual = 1;

  const casosActivos = casos.filter(function (c) {
    return c.estado !== "Cerrado" && c.estado !== "Anulado";
  }).length;

  const slaVencidos = casos.filter(function (c) {
    return c.sla === "vencido";
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
      const tipoBadge = obtenerBadgeTipo(caso.tipo);

      const fila = `
      <tr class='fila-caso' data-id="${caso.id}">
          <td>${caso.id}</td>
          <td>${formatearFecha(caso.fechaCreacion)}</td>
          <td>${tipoBadge}</td> 
          <td>${caso.servicio}</td>
          <td>${caso.categoria}</td>
          <td>${caso.subcategoria}</td>
          <td>${caso.asociado}</td>
          <td>${caso.responsable}</td>
          <td>${prioridadHtml}</td>
          <td>${estadoBadge}</td>
          <td>${caso.fechaLimite}</td>
          <td>${semaforoHtml}</td>
          <td>
            <button type="button" data-id="${caso.id}" class="btn-ver-caso translate-middle-y me-2 border-0 bg-transparent">
                  <i data-lucide="eye" class='icon-eye' id="eyeOpen" width="14" height="14"></i>
            </button>
          </td>
      </tr>
      `;

      tbody.append(fila);
    });
  }

  function obtenerCasosFiltrados() {
    const busqueda = $("#inputBuscar").val().toUpperCase().trim();
    const filtroEstado = $("#filtroEstado").val();
    const filtroTipo = $("#filtroTipo").val();
    const filtroServicio = $("#filtroServicio").val();
    const filtroResponsable = $("#filtroResponsable").val();
    const filtroPrioridad = $("#filtroPrioridad").val();
    const soloVencidos = $("#filtroVencidos").is(":checked");
    const soloProximos = $("#filtroProximos").is(":checked");

    let resultado = casos.filter(function (c) {
      if (busqueda) {
        const coincide =
          c.id.toUpperCase().includes(busqueda) ||
          c.asociado.toUpperCase().includes(busqueda);
        if (!coincide) return false;
      }
      if (filtroEstado && c.estado !== filtroEstado) return false;
      if (filtroTipo && c.tipo !== filtroTipo) return false;
      if (filtroServicio && c.servicio !== filtroServicio) return false;
      if (filtroResponsable && c.responsable !== filtroResponsable)
        return false;
      if (filtroPrioridad && c.prioridad !== filtroPrioridad) return false;
      if (soloVencidos && c.sla !== "vencido") return false;
      if (soloProximos && c.sla !== "proximo") return false;
      return true;
    });

    if (ordenActual.columna) {
      resultado = resultado.slice().sort(function (a, b) {
        let valA = (a[ordenActual.columna] || "").toString().toLowerCase();
        let valB = (b[ordenActual.columna] || "").toString().toLowerCase();
        let comp = valA.localeCompare(valB, "es");
        return ordenActual.direccion === "asc" ? comp : -comp;
      });
    }

    return resultado;
  }

  function actualizarVista() {
    paginaActual = 1;
    const filtrados = obtenerCasosFiltrados();
    renderizarPagina(filtrados, paginaActual);
  }

  // renderizarTabla(casos);

  //Funcion buscar
  $("#inputBuscar").on("input", actualizarVista);

  $("#isFilterBtn").on("click", function () {
    $("#filterInfo").toggleClass("active");
  });

  // Filtros selects y checkboxes
  $(
    "#filtroEstado, #filtroTipo, #filtroServicio, #filtroResponsable, #filtroPrioridad",
  ).on("change", actualizarVista);
  $("#filtroVencidos, #filtroProximos").on("change", actualizarVista);

  // Ordenamiento por columna
  $(document).on("click", ".table-title[data-orden]", function () {
    const columna = $(this).data("orden");
    if (ordenActual.columna === columna) {
      ordenActual.direccion = ordenActual.direccion === "asc" ? "desc" : "asc";
    } else {
      ordenActual.columna = columna;
      ordenActual.direccion = "asc";
    }
    $(".table-title").removeClass("col-orden-asc col-orden-desc");
    $(this).addClass(
      ordenActual.direccion === "asc" ? "col-orden-asc" : "col-orden-desc",
    );
    actualizarVista();
  });

  $(document).on("click", ".btn-ver-caso", function () {
    const id = $(this).data("id");
    sessionStorage.setItem("casoSeleccionado", id);
    window.location.href = "detalle.html";
  });

  function renderizarPagina(listaCasos, pagina) {
    const inicio = (pagina - 1) * CASOS_POR_PAGINA;
    const fin = inicio + CASOS_POR_PAGINA;
    const casosPagina = listaCasos.slice(inicio, fin);
    const total = listaCasos.length;

    renderizarTabla(casosPagina);

    // Actualizar texto informativo
    const desde = total === 0 ? 0 : inicio + 1;
    const hasta = Math.min(fin, total);
    $("#paginadorInfo").text(`Mostrando ${desde}-${hasta} de ${total} casos`);
  }

  // Llamar con paginación desde el inicio
  actualizarVista();

  // Clic en botones de página
  $(document).on("click", ".pag-btn", function (e) {
    e.preventDefault();
    const texto = $(this).text().trim();

    if (texto === "‹") {
      if (paginaActual > 1) paginaActual--;
    } else if (texto === "›") {
      const totalPaginas = Math.ceil(casos.length / CASOS_POR_PAGINA);
      if (paginaActual < totalPaginas) paginaActual++;
    } else {
      paginaActual = parseInt(texto);
    }

    renderizarPagina(casos, paginaActual);
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
  const config = {
    "Abierto":                  { bg: "#e0f2fe", color: "#0369a1" },
    "En proceso":               { bg: "#ffedd5", color: "#c2410c" },
    "En Gestión":               { bg: "#ffedd5", color: "#c2410c" },
    "Respondido":               { bg: "#e2fbe8", color: "#15803d" },
    "Pendiente de Información": { bg: "#fef3c7", color: "#b45309" },
    "Cerrado":                  { bg: "#f3f4f6", color: "#4b5563" },
    "Anulado":                  { bg: "#fee2e2", color: "#b91c1c" }
  };

  const c = config[estado] || { bg: "#f3f4f6", color: "#374151" };
  
  return `
    <span style="background:${c.bg}; color:${c.color}; padding: 3px 10px; border-radius: 12px; font-size: 0.72rem; display: inline-block; white-space: nowrap;">
      ${estado}
    </span>
  `;
}

function obtenerSemaforo(sla) {
  const config = {
    vencido: { clase: "text-danger", bg: "bg-danger", texto: "Vencido" },
    proximo: {
      clase: "text-warning",
      bg: "bg-warning",
      texto: "Próximo a vencer",
    },
    ok: { clase: "text-success", bg: "bg-success", texto: "En tiempo" },
  };
  const c = config[sla] || config["ok"];
  return `
      <span class="d-inline-flex align-items-center gap-1 ${c.clase} small">
      <div style="width:6px;height:6px;border-radius:50%;" class="${c.bg}"></div>
      ${c.texto}
    </span>
  `;
}

function obtenerBadgePrioridad(prioridad) {
  const config = {
    Alta: { bg: "#fee2e2", color: "#dc2626" },
    Media: { bg: "#fef3c7", color: "#d97706" },
    Baja: { bg: "#dcfce7", color: "#16a34a" },
  };
  const c = config[prioridad] || config["Baja"];
  return `
    <span style="background:${c.bg};color:${c.color};padding:2px 8px; border-radius:20px;font-size:0.75rem;">
      ${prioridad}
    </span>
  `;
}

function obtenerBadgeTipo(tipo) {
  const config = {
    Felicitación: { bg: "#e2fbe8", color: "#15803d" },
    Petición: { bg: "#e0f2fe", color: "#0369a1" },
    Queja: { bg: "#ffedd5", color: "#c2410c" },
    Reclamo: { bg: "#fee2e2", color: "#b91c1c" },
    Sugerencia: { bg: "#f3e8ff", color: "#6b21a8" },
  };

  const c = config[tipo] || { bg: "#f3f4f6", color: "#374151" };

  return `
    <span style="background:${c.bg}; color:${c.color}; padding: 3px 10px; border-radius: 12px; font-size: 0.72rem; display: inline-block;">
      ${tipo}
    </span>
  `;
}
