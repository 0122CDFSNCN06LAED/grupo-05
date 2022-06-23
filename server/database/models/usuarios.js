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
      as: "postulanteid",
      foreignKey: "postulanteId",
    });
    Usuarios.hasMany(models.TipoUsuarios, {
      as: "tipoUsuarioidTipo",
      foreignKey: "tipoUsuarioId",
    });
    Usuarios.belongsTo(models.Mensajes, {
      as: "destinatarioid",
      foreignKey: "destinatarioId",
    });
    Usuarios.belongsTo(models.Mensajes, {
      as: "remitenteid",
      foreignKey: "remitenteId",
    });
    Usuarios.belongsTo(models.Proyectos, {
      as: "tipoUsuarioidProye",
      foreignKey: "tipoUsuarioId",
    });
  };

  return Usuarios;
};
