$(document).ready(function () {
  $("#togglePassword").on("click", function () {
    const passwordInp = $("#password");
    const isPassword = passwordInp.attr("type") === "password";

    if (isPassword) {
      passwordInp.attr("type", "text");
      $("#eyeOpen").addClass("d-none");
      $("#eyeOff").removeClass("d-none");
    } else {
      passwordInp.attr("type", "password");
      $("#eyeOff").addClass("d-none");
      $("#eyeOpen").removeClass("d-none");
    }
  });
});
