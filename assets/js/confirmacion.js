$(document).ready(function () {

  // Leer el caso que guardó formulario.js
  const datos = sessionStorage.getItem('ultimoRadicado');

  if (!datos) {
    // Si alguien entra directo sin radicar, volver al formulario
    window.location.href = 'formulario.html';
    return;
  }

  const caso = JSON.parse(datos);

  // Llenar el número de radicado
  $('.card-rad-text').text(caso.id);

  // Llenar fecha de radicación
  const fechaFormateada = formatearFechaHora(caso.fechaCreacion);
  // Busca el li de fecha y actualiza el span
  $('.custom-list-item').eq(0).find('span.fw-medium').text(fechaFormateada);

  // Llenar fecha límite SLA
  const fechaLimite = formatearFechaHora(caso.fechaLimite);
  $('.custom-list-item').last().find('span').text(fechaLimite);

  // Botón copiar radicado
  $('.copy-btn').on('click', function () {
    navigator.clipboard.writeText(caso.id).then(function () {
      $('.copy-btn').html('<i data-lucide="check" width="16"></i> ¡Copiado!');
      lucide.createIcons();
      setTimeout(function () {
        $('.copy-btn').html('<i data-lucide="copy" width="16"></i> Copiar número');
        lucide.createIcons();
      }, 2000);
    });
  });

  // Limpiar sessionStorage para que no quede el dato
  sessionStorage.removeItem('ultimoRadicado');
});

function formatearFechaHora(fechaStr) {
  if (!fechaStr) return '—';
  const partes = fechaStr.split('-');
  return partes[2] + '/' + partes[1] + '/' + partes[0];
}