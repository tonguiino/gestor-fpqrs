// =====================================================
// detalle.js — Lógica completa de la vista de detalle
// =====================================================

$(document).ready(function () {
  // ── 2. CARGAR SIDEBAR ────────────────────────────
  $("#sidebar").load("components/sidebar.html", function () {
    $('.sidebar-link[data-page="detalle"]').addClass("active");
  });

  // ── 3. LEER EL CASO SELECCIONADO ─────────────────
  // bandeja.js guardó el id en sessionStorage al hacer clic en "Ver"
  const casoId = sessionStorage.getItem("casoSeleccionado");

  if (!casoId) {
    // Si no hay caso seleccionado, volver a bandeja
    window.location.href = "bandeja.html";
    return;
  }

  // Leer todos los casos del localStorage
  const casos = JSON.parse(localStorage.getItem("casos")) || [];

  // Buscar el caso por id — .find() retorna el primer objeto que coincide
  const caso = casos.find(function (c) {
    return c.id === casoId;
  });

  // ── 4. LLENAR EL HTML CON LOS DATOS DEL CASO ─────

  // Header — breadcrumb y título
  $("#detalleCasoId").text(caso.id);
  // Actualizar el breadcrumb con el id real
  $(".breadcrumb-item.active").text(caso.id);

  // Datos del asociado
  $("#asociadoNombre").text(caso.asociado || "—");
  $("#asociadoDocumento").text(
    (caso.tipoDocumento || "") + " " + (caso.documento || "—"),
  );
  $("#asociadoCorreo").text(caso.correo || "—");
  $("#asociadoCelular").text(caso.celular || "—");
  $("#asociadoDireccion").text(caso.direccion || "No registrada");

  // Datos del caso
  $("#casoServicio").text(caso.servicio || "—");
  $("#casoCategoria").text(caso.categoria || "—");
  $("#casoSubcategoria").text(caso.subcategoria || "—");
  $("#casoResponsable").text(caso.responsable || "—");
  $("#casoPrioridad").text(caso.prioridad || "—");
  $("#casoFechaLimite").text(caso.fechaLimite || "—");

  // Descripción
  $("#casoDescripcion").text(caso.descripcion || "Sin descripción registrada.");

  // ── 5. ALERTA SLA ─────────────────────────────────
  // Solo mostrar si el sla es 'vencido'
  if (caso.sla === "vencido") {
    $(".header-alert-card").show();
  } else {
    $(".header-alert-card").hide();
  }

  // ── 6. LLENAR SELECTS DEL PANEL DE ACCIONES ───────

  // Select de estado — marcar la opción actual del caso
  $("#selectEstado").empty();
  $.each(ESTADOS, function (i, estado) {
    const opcion = $("<option>").val(estado).text(estado);
    if (estado === caso.estado) opcion.prop("selected", true);
    $("#selectEstado").append(opcion);
  });

  // Select de prioridad — marcar la opción actual
  $("#selectPrioridad").empty();
  $.each(PRIORIDADES, function (i, prioridad) {
    const opcion = $("<option>").val(prioridad).text(prioridad);
    if (prioridad === caso.prioridad) opcion.prop("selected", true);
    $("#selectPrioridad").append(opcion);
  });

  // Select de responsable — llenar con los usuarios del sistema
  $("#selectResponsable").empty();
  $.each(USUARIOS, function (i, u) {
    const opcion = $("<option>").val(u.nombre).text(u.nombre);
    if (u.nombre === caso.responsable) opcion.prop("selected", true);
    $("#selectResponsable").append(opcion);
  });

  // ── 7. RENDERIZAR TABS ────────────────────────────

  // Historial
  renderizarHistorial(caso.historial || []);

  // Comentarios
  renderizarComentarios(caso.comentarios || []);

  // ── 8. CAMBIAR ESTADO ────────────────────────────
  $("#selectEstado").on("change", function () {
    const nuevoEstado = $(this).val();
    actualizarCaso("estado", nuevoEstado, "Estado cambiado a: " + nuevoEstado);
    mostrarToast("Estado actualizado a: " + nuevoEstado);
  });

  // ── 9. CAMBIAR PRIORIDAD ─────────────────────────
  $("#selectPrioridad").on("change", function () {
    const nuevaPrioridad = $(this).val();
    actualizarCaso(
      "prioridad",
      nuevaPrioridad,
      "Prioridad cambiada a: " + nuevaPrioridad,
    );
    mostrarToast("Prioridad actualizada a: " + nuevaPrioridad);
  });

  // ── 10. REASIGNAR CASO ───────────────────────────
  $("#selectResponsable").on("change", function () {
    const nuevoResponsable = $(this).val();
    actualizarCaso(
      "responsable",
      nuevoResponsable,
      "Caso reasignado a: " + nuevoResponsable,
    );
    // Actualizar el texto en la card de datos del caso también
    $("#casoResponsable").text(nuevoResponsable);
    mostrarToast("Caso reasignado a: " + nuevoResponsable);
  });

  // ── 11. REGISTRAR OBSERVACIÓN ────────────────────
  $("#btnRegistrarObservacion").on("click", function () {
    const texto = $("#txtObservacion").val().trim();
    const notificar = $("#notificarAsociado").is(":checked");

    if (!texto) {
      mostrarToast("Escriba una observación antes de registrar", "error");
      return;
    }

    // Crear el comentario nuevo
    const nuevoComentario = {
      fecha: new Date().toISOString().split("T")[0],
      usuario: usuario.nombre,
      texto: texto,
      notificado: notificar,
    };

    // Agregar al array de comentarios del caso
    const casosActualizados = JSON.parse(localStorage.getItem("casos")) || [];
    const idx = casosActualizados.findIndex(function (c) {
      return c.id === casoId;
    });

    if (idx !== -1) {
      casosActualizados[idx].comentarios.push(nuevoComentario);

      // También agregar al historial
      casosActualizados[idx].historial.push({
        fecha: new Date().toISOString().split("T")[0],
        usuario: usuario.nombre,
        accion: notificar
          ? "Observación registrada y notificada al asociado"
          : "Observación interna registrada",
      });

      localStorage.setItem("casos", JSON.stringify(casosActualizados));

      // Re-renderizar tabs
      renderizarComentarios(casosActualizados[idx].comentarios);
      renderizarHistorial(casosActualizados[idx].historial);

      // Limpiar el textarea y el checkbox
      $("#txtObservacion").val("");
      $("#notificarAsociado").prop("checked", false);

      mostrarToast("Observación registrada correctamente");
    }
  });

  // ── 12. CERRAR CASO ──────────────────────────────
  $("#btnCerrarCaso").on("click", function () {
    // Configurar el modal de confirmación
    $("#modalConfirmarLabel").text("Cerrar caso");
    $("#modalConfirmarTexto").text(
      "¿Está seguro que desea cerrar el caso " +
        casoId +
        "? Esta acción quedará registrada en el historial.",
    );
    $("#btnConfirmarAccion")
      .removeClass("btn-danger")
      .addClass("btn-success")
      .text("Sí, cerrar caso")
      .data("accion", "cerrar"); // guardamos qué acción confirmar

    // Abrir el modal con Bootstrap
    const modal = new bootstrap.Modal($("#modalConfirmar")[0]);
    modal.show();
  });

  // ── 13. ANULAR CASO ──────────────────────────────
  $("#btnAnularCaso").on("click", function () {
    $("#modalConfirmarLabel").text("Anular caso");
    $("#modalConfirmarTexto").text(
      "¿Está seguro que desea anular el caso " +
        casoId +
        "? Esta acción es irreversible.",
    );
    $("#btnConfirmarAccion")
      .removeClass("btn-success")
      .addClass("btn-danger")
      .text("Sí, anular caso")
      .data("accion", "anular");

    const modal = new bootstrap.Modal($("#modalConfirmar")[0]);
    modal.show();
  });

  // ── 14. CONFIRMAR ACCIÓN DEL MODAL ───────────────
  $("#btnConfirmarAccion").on("click", function () {
    const accion = $(this).data("accion");

    if (accion === "cerrar") {
      actualizarCaso("estado", "Cerrado", "Caso cerrado por " + usuario.nombre);
      $("#selectEstado").val("Cerrado");
      mostrarToast("Caso cerrado exitosamente");
    } else if (accion === "anular") {
      actualizarCaso("estado", "Anulado", "Caso anulado por " + usuario.nombre);
      $("#selectEstado").val("Anulado");
      mostrarToast("Caso anulado");
    }

    // Cerrar el modal
    bootstrap.Modal.getInstance($("#modalConfirmar")[0]).hide();
  });
});

// =====================================================
// FUNCIONES AUXILIARES
// =====================================================

// Actualiza un campo del caso en localStorage y agrega al historial
function actualizarCaso(campo, valor, accionHistorial) {
  const casoId = sessionStorage.getItem("casoSeleccionado");
  const casos = JSON.parse(localStorage.getItem("casos")) || [];
  const idx = casos.findIndex(function (c) {
    return c.id === casoId;
  });

  if (idx !== -1) {
    casos[idx][campo] = valor; // actualiza el campo

    // Agrega la acción al historial
    casos[idx].historial.push({
      fecha: new Date().toISOString().split("T")[0],
      usuario: JSON.parse(sessionStorage.getItem("usuarioLogueado")).nombre,
      accion: accionHistorial,
    });

    localStorage.setItem("casos", JSON.stringify(casos));

    // Re-renderizar historial con los datos actualizados
    renderizarHistorial(casos[idx].historial);
  }
}

// Renderiza el historial en el tab correspondiente
function renderizarHistorial(historial) {
  const lista = $("#listaHistorial");
  lista.empty();

  $("#badgeHistorial").text(historial.length);

  if (historial.length === 0) {
    lista.html(
      '<p class="text-muted small text-center py-3">Sin historial disponible.</p>',
    );
    return;
  }

  // Mostrar del más reciente al más antiguo — .slice().reverse() no modifica el original
  const historialOrdenado = historial.slice().reverse();

  $.each(historialOrdenado, function (i, item) {
    lista.append(`
      <div class="historial-item">
        <div class="historial-punto"></div>
        <div>
          <p class="historial-accion">${item.accion}</p>
          <p class="historial-meta">${item.usuario} · ${item.fecha}</p>
        </div>
      </div>
    `);
  });
}

// Renderiza los comentarios en el tab correspondiente
function renderizarComentarios(comentarios) {
  const lista = $("#listaComentarios");
  lista.empty();

  $("#badgeComentarios").text(comentarios.length);

  if (comentarios.length === 0) {
    lista.html(
      '<p class="text-muted small text-center py-3">No hay comentarios aún.</p>',
    );
    return;
  }

  $.each(comentarios, function (i, comentario) {
    lista.append(`
      <div class="comentario-item">
        <p class="comentario-autor">${comentario.usuario}</p>
        <p class="comentario-texto">${comentario.texto}</p>
        <p class="comentario-fecha">${comentario.fecha}${comentario.notificado ? " · Notificado al asociado" : ""}</p>
      </div>
    `);
  });
}

// Muestra un toast de notificación temporal
// tipo: 'success' (default) o 'error'
function mostrarToast(mensaje, tipo) {
  // Si ya hay un toast, lo eliminamos
  $("#toastDetalle").remove();

  const bgColor = tipo === "error" ? "#dc2626" : "#16a34a";

  const toast = $(`
    <div id="toastDetalle" style="
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: ${bgColor};
      color: white;
      padding: 12px 20px;
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 500;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      opacity: 0;
      transition: opacity 0.3s;
    ">${mensaje}</div>
  `);

  $("body").append(toast);

  // Aparecer
  setTimeout(function () {
    $("#toastDetalle").css("opacity", 1);
  }, 10);

  // Desaparecer después de 3 segundos
  setTimeout(function () {
    $("#toastDetalle").css("opacity", 0);
    setTimeout(function () {
      $("#toastDetalle").remove();
    }, 300);
  }, 3000);
}
