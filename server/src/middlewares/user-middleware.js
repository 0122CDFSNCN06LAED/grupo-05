const { check } = require("express-validator");

let validacionRegistro = [
  check("name").notEmpty().withMessage("Debe ingresar un nombre").bail(),
  check("name")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres"),
  check("user-surname")
    .notEmpty()
    .withMessage("Debe ingresar un apellido")
    .bail(),
  check("user-surname")
    .isLength({ min: 3 })
    .withMessage("El apellido debe tener al menos 3 caracteres"),
  check("user-email").notEmpty().withMessage("Debe ingresar un mail").bail(),
  check("user-email")
    .isEmail()
    .withMessage("El mail debe tener un formato válido"),
  check("user-email")
    .notEmpty()
    .withMessage("Debe ingresar una contraseña")
    .bail(),
  check("user-email")
    .isLength({ min: 5 })
    .withMessage("La contraseña debe contener al menos 5 caracteres")
    .bail(),
  check("user-password")
    .notEmpty()
    .withMessage("Debe ingresar una contraseña")
    .bail(),
  check("user-password")
    .isLength({ min: 5 })
    .withMessage("La contraseña debe contener al menos 5 caracteres"),
  check("user-password-confirmation")
    .notEmpty()
    .withMessage("Debe repetir la contraseña")
    .bail(),
];

module.exports = validacionRegistro;
