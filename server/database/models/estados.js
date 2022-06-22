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
    nombre: dataTypes.STRING,
  };

  const config = {
    tableName: "estados",
    timestamps: false,
  };

  const Estados = sequelize.define(alias, columns, config);

  // relaciones

  Estados.associate = (models) => {
    Estados.belongsTo(models.proyectos, {
      as: "estado",
      foreignKey: "estadoId",
    });
  };

  return Estados;
};
