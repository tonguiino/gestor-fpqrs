$(document).ready(function () {
  const datos = sessionStorage.getItem('ultimoRadicado');

  if (!datos) {
    window.location.href = 'formulario.html';
    return;
  }

  const caso = JSON.parse(datos);

  $('.card-rad-text').text(caso.id);

  const fechaFormateada = formatearFechaHora(caso.fechaCreacion);
  $('.custom-list-item').eq(0).find('span.fw-medium').text(fechaFormateada);

  const fechaLimite = formatearFechaHora(caso.fechaLimite);
  $('.custom-list-item').last().find('span').text(fechaLimite);

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

  sessionStorage.removeItem('ultimoRadicado');
});

function formatearFechaHora(fechaStr) {
  if (!fechaStr) return '—';
  const partes = fechaStr.split('-');
  return partes[2] + '/' + partes[1] + '/' + partes[0];
}