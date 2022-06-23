const Sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  const alias = "Mensajes";
  const columns = {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    contenido: dataTypes.STRING,
    fecha: dataTypes.STRING,
  };

  const config = {
    tableName: "mensajes",
    timestamps: false,
  };

  const Mensajes = sequelize.define(alias, columns, config);

  // relaciones
  Mensajes.hasMany(models.Usuarios, {
    as: "mensajeDes",
    foreignKey: "destinatarioId",
  });
  Mensajes.hasMany(models.Usuarios, {
    as: "mensajeRemi",
    foreignKey: "remitenteId",
  });

  return Mensajes;
};
