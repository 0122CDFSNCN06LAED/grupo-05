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
    Usuarios.hasMany(models.ProyectoUsuario, {
      as: "postulante",
      foreignKey: "postulanteId",
    });
    Usuarios.belongsTo(models.TipoUsuarios, {
      as: "tipousuario",
      foreignKey: "tipoUsuarioId",
    });
    Usuarios.hasMany(models.Mensajes, {
      as: "mensaje",
      foreignKey: "destinatarioId",
    });
  };

  return Usuarios;
};
