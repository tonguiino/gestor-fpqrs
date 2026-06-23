$(document).ready(function () {
  $('#categoria').prop('disabled', true);
  $('#subcategoria').prop('disabled', true);

  $('#servicio').on('change', function () {
    const servicioSeleccionado = $(this).val();

    resetearSelect('#categoria', 'Seleccionar categoría...');
    resetearSelect('#subcategoria', 'Seleccionar subcategoría...');
    $('#subcategoria').prop('disabled', true);

    if (!servicioSeleccionado || servicioSeleccionado === 'Seleccionar servicio...') {
      $('#categoria').prop('disabled', true);
      return;
    }

    const datosServicio = CATALOGO_SERVICIOS[servicioSeleccionado];

    if (datosServicio) {
      $.each(datosServicio.categorias, function (index, nombreCategoria) {
        $('#categoria').append(
          $('<option>').val(nombreCategoria).text(nombreCategoria)
        );
      });

      $('#categoria').prop('disabled', false);
      limpiarError('#servicio');
    }
  });

  $('#categoria').on('change', function () {
    const categoriaSeleccionada = $(this).val();

    resetearSelect('#subcategoria', 'Seleccionar subcategoría...');

    if (!categoriaSeleccionada || categoriaSeleccionada === 'Seleccionar categoría...') {
      $('#subcategoria').prop('disabled', true);
      return;
    }

    const subcats = SUBCATEGORIAS_POR_CATEGORIA[categoriaSeleccionada];

    if (subcats && subcats.length > 0) {
      $.each(subcats, function (index, nombreSubcat) {
        $('#subcategoria').append(
          $('<option>').val(nombreSubcat).text(nombreSubcat)
        );
      });
      $('#subcategoria').prop('disabled', false);
      limpiarError('#categoria');
    }
  });

  $('#tipoId, #numId, #nombre, #correo, #celular, #tipoCaso, #servicio, #categoria, #subcategoria, #descripcion').on('change input', function () {
    limpiarError('#' + $(this).attr('id'));
  });

  $('#autorizacion').on('change', function () {
    if ($(this).is(':checked')) {
      limpiarErrorCheckbox();
    }
  });

  $('form').on('submit', function (e) {
    e.preventDefault();

    let formularioValido = true;

    if (!validarCampo('#tipoId', 'Seleccione el tipo de identificación')) {
      formularioValido = false;
    }
    if (!validarCampo('#numId', 'Ingrese su número de identificación')) {
      formularioValido = false;
    }
    if (!validarCampo('#nombre', 'Ingrese su nombre completo')) {
      formularioValido = false;
    }
    if (!validarEmail('#correo', 'Ingrese un correo electrónico válido')) {
      formularioValido = false;
    }
    if (!validarCampo('#celular', 'Ingrese su número de celular')) {
      formularioValido = false;
    }
    if (!validarCampo('#tipoCaso', 'Seleccione el tipo de caso')) {
      formularioValido = false;
    }
    if (!validarCampo('#servicio', 'Seleccione el servicio')) {
      formularioValido = false;
    }
    if (!validarCampo('#categoria', 'Seleccione la categoría')) {
      formularioValido = false;
    }
    if (!validarCampo('#subcategoria', 'Seleccione la subcategoría')) {
      formularioValido = false;
    }
    if (!validarCampo('#descripcion', 'Describa detalladamente su caso')) {
      formularioValido = false;
    }

    if (!$('#autorizacion').is(':checked')) {
      mostrarErrorCheckbox();
      formularioValido = false;
    }

    if (!formularioValido) {
      const primerError = $('.is-invalid').first();
      if (primerError.length) {
        $('html, body').animate({
          scrollTop: primerError.offset().top - 100
        }, 300);
      }
      return; 
    }

    radicarCaso();
  });

});

function resetearSelect(selector, placeholder) {
  $(selector).empty();
  $(selector).append(
    $('<option>').val('').text(placeholder).prop('disabled', true).prop('selected', true)
  );
}

function validarCampo(selector, mensaje) {
  const campo = $(selector);
  const valor = campo.val();

  if (!valor || valor.trim() === '' || valor === 'Seleccionar...' || valor === '') {
    mostrarError(selector, mensaje);
    return false;
  }

  limpiarError(selector);
  return true;
}

function validarEmail(selector, mensaje) {
  const campo = $(selector);
  const valor = campo.val().trim();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!valor || !regexEmail.test(valor)) {
    mostrarError(selector, mensaje);
    return false;
  }

  limpiarError(selector);
  return true;
}

function mostrarError(selector, mensaje) {
  const campo = $(selector);
  campo.addClass('is-invalid');

  let feedback = campo.siblings('.invalid-feedback');

  if (feedback.length === 0) {
    feedback = $('<div class="invalid-feedback"></div>');
    campo.after(feedback);
  }

  feedback.text(mensaje);
}

function mostrarErrorCheckbox() {
  $('#autorizacion').closest('.card').addClass('card-auth-error');

  let feedback = $('#autorizacion').parent().siblings('.auth-error-msg');
  if (feedback.length === 0) {
    feedback = $('<p class="auth-error-msg text-danger small mt-2 mb-0"></p>');
    $('#autorizacion').closest('.card-body').append(feedback);
  }
  feedback.text('Debe aceptar el tratamiento de datos personales para continuar');
}

function limpiarErrorCheckbox() {
  $('#autorizacion').closest('.card').removeClass('card-auth-error');
  $('.auth-error-msg').remove();
}

function radicarCaso() {
  const fecha = new Date();
  const anio = fecha.getFullYear();
  const numero = Math.floor(Math.random() * 90000) + 10000; // 5 dígitos
  const radicado = `FPQRS-${anio}-${numero}`;
  const nuevoCaso = {
    id: radicado,
    asociado: $('#nombre').val(),
    tipoDocumento: $('#tipoId').val(),
    documento: $('#numId').val(),
    correo: $('#correo').val(),
    celular: $('#celular').val(),
    tipo: $('#tipoCaso').val(),
    servicio: $('#servicio').val(),
    categoria: $('#categoria').val(),
    subcategoria: $('#subcategoria').val(),
    descripcion: $('#descripcion').val(),
    prioridad: 'Media',       // prioridad por defecto al radicar
    estado: 'Abierto',
    sla: 'ok',
    responsable: 'Sin asignar',
    fechaCreacion: fecha.toISOString().split('T')[0],
    fechaLimite: calcularFechaLimite(fecha, 15), // 15 días hábiles
    comentarios: [],
    adjuntos: [],
    historial: [
      {
        fecha: fecha.toISOString().split('T')[0],
        usuario: 'Sistema',
        accion: 'Caso radicado por portal web'
      }
    ]
  };

  const casosExistentes = JSON.parse(localStorage.getItem('casos')) || [];
  casosExistentes.unshift(nuevoCaso);
  localStorage.setItem('casos', JSON.stringify(casosExistentes));
  sessionStorage.setItem('ultimoRadicado', JSON.stringify(nuevoCaso));
  window.location.href = 'confirmacion.html';
}

function calcularFechaLimite(fechaInicio, diasHabiles) {
  const fecha = new Date(fechaInicio);
  let diasContados = 0;

  while (diasContados < diasHabiles) {
    fecha.setDate(fecha.getDate() + 1);
    const diaSemana = fecha.getDay();

    if (diaSemana !== 0 && diaSemana !== 6) {
      diasContados++;
    }
  }

  return fecha.toISOString().split('T')[0];
}

function limpiarError(selector) {
  $(selector).removeClass('is-invalid');
}
