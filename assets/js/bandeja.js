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

  $('#cardActivos').text(casosActivos)
  $('#cardVencidos').text(slaVencidos)
  $('#cardProximos').text(slaProximos)
  $('#cardCerradosHoy').text(cerradosHoy)
});
