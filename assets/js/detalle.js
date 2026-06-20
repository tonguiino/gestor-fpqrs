$(document).ready(function () {
    
  $("#sidebar").load("/components/sidebar.html", function () {
    $('.sidebar-link[data-page="bandeja"]').addClass("active");
  });

})