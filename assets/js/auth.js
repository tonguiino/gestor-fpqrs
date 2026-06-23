$(document).ready(function () {
  const emailRecordado = localStorage.getItem('emailRecordado');
  if (emailRecordado) {
    $('#email').val(emailRecordado);
    $('#recordar').prop('checked', true);
    $('#password').focus()
  }

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

  $('.demo-user-row').on('click', function () {
    const email = $(this).data('email');
    const password = $(this).data('password');

    $('#email').val(email);
    $('#password').val(password);
    $('#loginError').hide();
    $('.demo-user-row').removeClass('demo-row-selected');
    $(this).addClass('demo-row-selected');
  });

$('#formLogin').on('submit', function (e) {
  e.preventDefault();

  const email = $('#email').val().trim();
  const password = $('#password').val().trim();
  const recordar = $('#recordar').is(':checked');

  $('#email').removeClass('is-invalid');
  $('#password').removeClass('is-invalid');
  $('#loginAlert').hide();

  let hayError = false;

  if (!email) {
    $('#email').addClass('is-invalid');      
    $('#emailError').text('El correo electrónico es obligatorio');
    hayError = true;
  }

  if (!password) {
    $('#password').addClass('is-invalid');
    $('#passwordError').text('La contraseña es obligatoria');
    hayError = true;
  }

  if (hayError) return;

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
    $('#loginAlert').show();
    $('#loginAlertMsg').text('Credenciales inválidas — use las cuentas de demostración para ingresar.');
    $('#password').val('');
    $('#password').focus();
  }
});

});

function logout() {
  sessionStorage.removeItem('usuarioLogueado');
  window.location.href = 'index.html';
}

function verificarSesion() {
  const datos = sessionStorage.getItem('usuarioLogueado');
  if (!datos) {
    window.location.href = 'index.html';
    return null;
  }
  return JSON.parse(datos);
}
