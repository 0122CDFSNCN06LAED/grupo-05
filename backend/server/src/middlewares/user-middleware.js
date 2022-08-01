const { check, body } = require('express-validator');

let validacionRegistro = [
  check('name').notEmpty().withMessage('Debe ingresar un nombre').bail(),
  check('name').isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  check('usuarioNombre').notEmpty().withMessage('Debe ingresar un nombre de usuario').bail(),
  check('usuarioNombre').isLength({ min: 2 }).withMessage('El nombre de usuario debe tener al menos 2 caracteres'),
  check('surname').notEmpty().withMessage('Debe ingresar un apellido').bail(),
  check('surname').isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
  check('email').notEmpty().withMessage('Debe ingresar un mail').bail(),
  check('email').isEmail().withMessage('El mail debe tener un formato válido').bail(),
  check('email').notEmpty().withMessage('Debe ingresar una contraseña').bail(),
  check('email').isLength({ min: 5 }).withMessage('La contraseña debe contener al menos 5 caracteres').bail(),
  check('password').notEmpty().withMessage('Debe ingresar una contraseña').bail(),
  check('password').isLength({ min: 5 }).withMessage('La contraseña debe contener al menos 5 caracteres'),
  check('passwordConfirmation').notEmpty().withMessage('Debe repetir la contraseña').bail(),
  body('img').custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = ['.jpg', '.png', '.jpeg', 'gif'];
    if (!file) {
      throw new Error('Suba una imagen');
    } else {
      let fileExtensions = path.extname(file.originalname);
      if (acceptedExtensions.includes(fileExtensions) === false) {
        throw new Error('Los archivos permitidos son ' + acceptedExtensions.join(', '));
      }
    }
    return true;
  }),
];

let validacionLogin = [
  check('email').notEmpty().withMessage('Debe ingresar un mail').bail(),
  check('email').isEmail().withMessage('El mail debe tener un formato válido').bail(),
  check('email').notEmpty().withMessage('Debe ingresar una contraseña').bail(),
  check('email').isLength({ min: 5 }).withMessage('La contraseña debe contener al menos 5 caracteres').bail(),
  check('password').notEmpty().withMessage('Debe ingresar una contraseña').bail(),
  check('password').isLength({ min: 5 }).withMessage('La contraseña debe contener al menos 5 caracteres'),
];

let validacionMensaje = [
  check('mensaje').notEmpty().withMessage('El mensaje no puede ser vacío').bail(),
  check('destinatario').notEmpty().withMessage('Debe elegir un usuario').bail(),
];

module.exports = {
  validacionRegistro,
  validacionLogin,
  validacionMensaje,
};
