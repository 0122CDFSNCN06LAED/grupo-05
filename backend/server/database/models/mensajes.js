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
    contenidoMensaje: dataTypes.STRING,
    fechaMensaje: dataTypes.STRING,
  };

  const config = {
    tableName: "mensajes",
    timestamps: false,
  };

  const Mensajes = sequelize.define(alias, columns, config);

  //relaciones
  Mensajes.associate = (models) => {
    Mensajes.belongsTo(models.Usuarios, {
      as: "destinatarioid",
      foreignKey: "destinatarioId",
    });
    Mensajes.belongsTo(models.Usuarios, {
      as: "remitenteid",
      foreignKey: "remitenteId",
    });
  };

  return Mensajes;
};
