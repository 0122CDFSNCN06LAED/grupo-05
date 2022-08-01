window.addEventListener('load', function () {
    let loginForm = document.querySelector('.main-form');
    loginForm.addEventListener('change', () => {
        let email = document.getElementById('email');
        let errorEmail = document.querySelector('.errorEmail');
        let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
        if (email.value == '') {
            errorEmail.innerText = 'Debe ingresar un email';
        } else if (regex.test(email.value)) {
            errorEmail.innerText = '';
        } else {
            errorEmail.innerText = 'Debe ingresar un email válido';
        }

        let password = document.getElementById('password');
        let errorPassword = document.querySelector('.errorPassword');
        if (password.value == '') {
            errorPassword.innerText = 'Debe ingresar una contraseña';
        } else if (password.value.length < 8) {
            errorPassword.innerText = 'La contraseña debe tener un mínimo de ocho caracteres';
        } else {
            errorPassword.innerText = '';
        }
    });
});
