$(document).ready(function () {


  // ============================================
  // 2. PRECARGAR EMAIL SI MARCÓ "RECORDAR"
  // ============================================
  // localStorage persiste aunque cierres el navegador
  // sessionStorage se borra al cerrar
  const emailRecordado = localStorage.getItem('emailRecordado');
  if (emailRecordado) {
    $('#email').val(emailRecordado);       // escribe el email guardado
    $('#recordar').prop('checked', true);  // marca el checkbox
    $('#password').focus();                // pone cursor en contraseña
  }

  // ============================================
  // 3. TOGGLE OJO — ya lo tienes, no lo tocamos
  // ============================================
  $('#togglePassword').on('click', function () {
    const passwordInp = $('#password');
    const isPassword = passwordInp.attr('type') === 'password';

    if (isPassword) {
      passwordInp.attr('type', 'text');
      $('#eyeOpen').addClass('d-none');
      $('#eyeOff').removeClass('d-none');
    } else {
      passwordInp.attr('type', 'password');
      $('#eyeOff').addClass('d-none');
      $('#eyeOpen').removeClass('d-none');
    }
  });

  // ============================================
  // 4. CLIC EN FILA DEMO → AUTOCOMPLETAR
  // ============================================
  // $(this) es el div.demo-user-row específico que clickearon
  // .data('email') lee el atributo data-email del elemento
  $('.demo-user-row').on('click', function () {
    const email = $(this).data('email');
    const password = $(this).data('password');

    $('#email').val(email);
    $('#password').val(password);

    // Ocultar error si estaba visible de un intento anterior
    $('#loginError').hide();

    // Feedback visual — resaltar la fila seleccionada
    $('.demo-user-row').removeClass('demo-row-selected');
    $(this).addClass('demo-row-selected');
  });

  // ============================================
  // 5. SUBMIT DEL FORMULARIO
  // ============================================
$('#formLogin').on('submit', function (e) {
  e.preventDefault();

  const email = $('#email').val().trim();
  const password = $('#password').val().trim();
  const recordar = $('#recordar').is(':checked');

  // Limpiar validaciones anteriores
  $('#email').removeClass('is-invalid');
  $('#password').removeClass('is-invalid');
  $('#loginAlert').hide();

  // Validar campo por campo
  let hayError = false;

  if (!email) {
    $('#email').addClass('is-invalid');          // Bootstrap muestra invalid-feedback
    $('#emailError').text('El correo electrónico es obligatorio');
    hayError = true;
  }

  if (!password) {
    $('#password').addClass('is-invalid');
    $('#passwordError').text('La contraseña es obligatoria');
    hayError = true;
  }

  if (hayError) return; // detener si hay campos vacíos

  // Buscar usuario
  const usuario = USUARIOS.find(function (u) {
    return u.email === email && u.password === password;
  });

  if (usuario) {
    sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
    if (recordar) {
      localStorage.setItem('emailRecordado', email);
    } else {
      localStorage.removeItem('emailRecordado');
    }
    window.location.href = 'bandeja.html';

  } else {
    // Credenciales incorrectas — mostrar alerta global
    $('#loginAlert').show();
    $('#loginAlertMsg').text('Credenciales inválidas — use las cuentas de demostración para ingresar.');
    $('#password').val('');
    $('#password').focus();
  }
});

});

// ============================================
// FUNCIONES GLOBALES — disponibles en TODAS las páginas
// ============================================

// Llámala en el botón "Cerrar sesión" del sidebar: onclick="logout()"
function logout() {
  sessionStorage.removeItem('usuarioLogueado');
  window.location.href = 'index.html';
}

// Llámala al inicio de bandeja.js, detalle.js, etc.
// Retorna el usuario logueado o redirige al login
function verificarSesion() {
  const datos = sessionStorage.getItem('usuarioLogueado');
  if (!datos) {
    window.location.href = 'index.html';
    return null;
  }
  return JSON.parse(datos); // convierte el string de vuelta a objeto
}
