window.addEventListener('load', function () {
    let registerForm = document.querySelector('#register-form');
    registerForm.addEventListener('change', () => {
        let name = document.getElementById('name');
        let errorNombre = document.querySelector('.errorNombre');
        if (name.value == '') {
            errorNombre.innerText = 'Debe ingresar un nombre';
        } else if (name.value.length < 2) {
            errorNombre.innerText = 'El nombre debe tener un mínimo de dos caracteres';
        } else {
            errorNombre.innerText = '';
        }

        let usuarioNombre = document.getElementById('usuarioNombre');
        let errorUsuarioNombre = document.querySelector('.errorUsuarioNombre');
        if (usuarioNombre.value == '') {
            errorUsuarioNombre.innerText = 'Debe ingresar un nombre de usuario';
        } else if (usuarioNombre.value.length < 2) {
            errorUsuarioNombre.innerText = 'El nombre de usuario debe tener un mínimo de dos caracteres';
        } else {
            errorUsuarioNombre.innerText = '';
        }

        let surname = document.getElementById('surname');
        let errorSurname = document.querySelector('.errorSurname');
        if (surname.value == '') {
            errorSurname.innerText = 'Debe ingresar un apellido';
        } else if (surname.value.length < 2) {
            errorSurname.innerText = 'El apellido debe tener un mínimo de dos caracteres';
        } else {
            errorSurname.innerText = '';
        }

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
