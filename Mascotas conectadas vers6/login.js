//en este sitio web esta la info de como ocultar o mostrar 
//cada pantalla: https://docs.idew.org/code-internet-of-things/references/web-app-multiple-screens
// _apretar el "olvidaste usuario y contraseña" redirige a screen 2 y luego a screen 5
// _apretar el "no tienes una cuenta" redirige a screen 3 y luego a screen 4
//gracias 👍.

document.addEventListener("DOMContentLoaded", function() {
    const logologin = document.querySelector('.logologin');
    if (logologin) {
        logologin.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    // Pantallas
    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');
    const screen3 = document.getElementById('screen3');
    const screen4 = document.getElementById('screen4');
    const screen5 = document.getElementById('screen5');

    // Enlaces
    const linkOlvido = document.querySelector('.userlinks[href="#"]:nth-of-type(1)');
    const linkRegistro = document.querySelector('.userlinks[href="#"]:nth-of-type(2)');

    // Botones
    const btnEnviarRecuperacion = document.getElementById('enviarRecuperacion');
    const btnRegistrarse = document.getElementById('registrarse');
    const btnOkConfirmacion = document.getElementById('okConfirmacion');
    const btnOkRecuperacion = document.getElementById('okRecuperacion');

    // Mostrar pantalla de olvido contraseña
    if(linkOlvido) linkOlvido.addEventListener('click', function(e) {
        e.preventDefault();
        screen1.style.display = 'none';
        screen2.style.display = 'flex';
    });
    // Mostrar pantalla de registro
    if(linkRegistro) linkRegistro.addEventListener('click', function(e) {
        e.preventDefault();
        screen1.style.display = 'none';
        screen3.style.display = 'flex';
    });
    // Enviar recuperación -> pantalla 5
    if(btnEnviarRecuperacion) btnEnviarRecuperacion.addEventListener('click', function() {
        screen2.style.display = 'none';
        screen5.style.display = 'flex';
    });
    // Registrarse -> pantalla 4
    if(btnRegistrarse) btnRegistrarse.addEventListener('click', function() {
        screen3.style.display = 'none';
        screen4.style.display = 'flex';
    });
    // Ok confirmación -> index
    if(btnOkConfirmacion) btnOkConfirmacion.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    // Ok recuperación -> index
    if(btnOkRecuperacion) btnOkRecuperacion.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});