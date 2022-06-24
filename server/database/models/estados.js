const Sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  const alias = "Estados";
  const columns = {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    nombreEstado: dataTypes.STRING,
  };

  const config = {
    tableName: "estados",
    timestamps: false,
  };

  const Estados = sequelize.define(alias, columns, config);

  // relaciones

  Estados.associate = (models) => {
    Estados.hasMany(models.Proyectos, {
      as: "estadoid",
      foreignKey: "estadoId",
    });
  };

  return Estados;
};
