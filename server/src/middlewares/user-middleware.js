const { check } = require("express-validator");

let validacionRegistro = [
  check("name").notEmpty().withMessage("Debe ingresar un nombre").bail(),
  check("name")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres"),
  check("usuarioNombre")
    .notEmpty()
    .withMessage("Debe ingresar un nombre de usuario")
    .bail(),
  check("usuarioNombre")
    .isLength({ min: 3 })
    .withMessage("El nombre de usuario debe tener al menos 3 caracteres"),
  check("surname").notEmpty().withMessage("Debe ingresar un apellido").bail(),
  check("surname")
    .isLength({ min: 3 })
    .withMessage("El apellido debe tener al menos 3 caracteres"),
  check("email").notEmpty().withMessage("Debe ingresar un mail").bail(),
  check("email")
    .isEmail()
    .withMessage("El mail debe tener un formato válido")
    .bail(),
  check("email").notEmpty().withMessage("Debe ingresar una contraseña").bail(),
  check("email")
    .isLength({ min: 5 })
    .withMessage("La contraseña debe contener al menos 5 caracteres")
    .bail(),
  check("password")
    .notEmpty()
    .withMessage("Debe ingresar una contraseña")
    .bail(),
  check("password")
    .isLength({ min: 5 })
    .withMessage("La contraseña debe contener al menos 5 caracteres"),
  check("passwordConfirmation")
    .notEmpty()
    .withMessage("Debe repetir la contraseña")
    .bail(),
];

let validacionLogin = [
  check("email").notEmpty().withMessage("Debe ingresar un mail").bail(),
  check("email")
    .isEmail()
    .withMessage("El mail debe tener un formato válido")
    .bail(),
  check("email").notEmpty().withMessage("Debe ingresar una contraseña").bail(),
  check("email")
    .isLength({ min: 5 })
    .withMessage("La contraseña debe contener al menos 5 caracteres")
    .bail(),
  check("password")
    .notEmpty()
    .withMessage("Debe ingresar una contraseña")
    .bail(),
  check("password")
    .isLength({ min: 5 })
    .withMessage("La contraseña debe contener al menos 5 caracteres"),
];

module.exports = {
  validacionRegistro,
  validacionLogin,
};
