const Sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  const alias = "Usuarios";
  const columns = {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    username: dataTypes.STRING,
    name: dataTypes.STRING,
    surname: dataTypes.STRING,
    profileURL: dataTypes.STRING,
    password: dataTypes.STRING,
    email: dataTypes.STRING,
  };

  const config = {
    tableName: "usuarios",
    timestamps: false,
  };

  const Usuarios = sequelize.define(alias, columns, config);

  // relaciones

  Usuarios.associate = (models) => {
    Usuarios.hasMany(models.proyectoUsuario, {
      as: "postulanteId",
      foreignKey: "postulanteId",
    });
    Usuarios.hasMany(models.tipoUsuarios, {
      as: "tipousuario",
      foreignKey: "tipoUsuarioId",
    });
    Usuarios.belongsTo(models.Mensajes, {
      as: "mensajeDes",
      foreignKey: "destinatarioId",
    });
    Usuarios.belongsTo(models.Mensajes, {
      as: "mensajeRemi",
      foreignKey: "remitenteId",
    });
    Usuarios.belongsTo(models.Proyectos, {
      as: "creadorP",
      foreignKey: "tipoUsuarioId",
    });
  };

  return Usuarios;
};
