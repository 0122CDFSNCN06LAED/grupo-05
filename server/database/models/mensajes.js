const Sequelize = require('sequelize');

module.exports = (sequelize, dataTypes) => {
  const alias = 'Mensajes';
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
    tableName: 'mensajes',
    timestamps: false,
  };

  const Mensajes = sequelize.define(alias, columns, config);

  // relaciones
    Usuarios.belongsTo(models.Usuarios, {
      as: "mensaje",
      foreignKey: "destinatarioId",
    });

  return Mensajes;
};
