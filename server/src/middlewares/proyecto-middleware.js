const { check } = require("express-validator");

let validacionCreate = [
  check("titulo").notEmpty().withMessage("Debe ingresar un titulo").bail(),
  check("titulo")
    .isLength({ min: 3 })
    .withMessage("El titulo debe tener al menos 3 caracteres"),
  check("descripcion")
    .notEmpty()
    .withMessage("Debe ingresar una descripción")
    .bail(),
  check("descripcion")
    .isLength({ min: 20 })
    .withMessage("La descripción debe tener al menos 20 caracteres"),
  check("precio").notEmpty().withMessage("Debe ingresar un precio").bail(),
  check("precio").isNumeric().withMessage("El valor debe ser numérico").bail(),
];

module.exports = {
  validacionCreate,
};
