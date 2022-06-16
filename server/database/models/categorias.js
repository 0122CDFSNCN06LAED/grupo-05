const Sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  const alias = "Categorias";
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
    tableName: "categorias",
    timestamps: false,
  };

  const Categorias = sequelize.define(alias, columns, config);

  Categorias.associate = (models) => {
    Categorias.hasMany(models.ProyectoCategoria, {
      as: "categoria",
      foreignKey: "categoriaId",
    });
  };

  return Categorias;
};
