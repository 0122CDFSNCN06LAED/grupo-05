const Sequelize = require('sequelize');

module.exports = (sequelize, dataTypes) => {
  const alias = 'Usuarios';
  const columns = {
    username: dataTypes.STRING,
    name: dataTypes.STRING,
    surname: dataTypes.STRING,
    profileURL: dataTypes.STRING,
    password: dataTypes.STRING,
    email: dataTypes.STRING,
  };
  
  const config = {
    tableName: 'usuarios',
    timestamps: false,
  };

  const Usuarios = sequelize.define(alias, columns, config);

  // relaciones

  Usuarios.associate = (models) => {
    Usuarios.hasMany(models.ProyectoUsuario, {
      as: 'postulanteid',
      foreignKey: 'postulanteId',
    });
    Usuarios.belongsTo(models.TipoUsuarios, {
      as: 'tipoUsuarioidTipo',
      foreignKey: 'tipoUsuarioId',
    });
    Usuarios.hasMany(models.Mensajes, {
      as: 'destinatarioid',
      foreignKey: 'destinatarioId',
    });
    Usuarios.hasMany(models.Mensajes, {
      as: 'remitenteid',
      foreignKey: 'remitenteId',
    });
    Usuarios.hasMany(models.Proyectos, {
      as: 'creadorId',
      foreignKey: 'creadorId',
    });
  };

  return Usuarios;
};
