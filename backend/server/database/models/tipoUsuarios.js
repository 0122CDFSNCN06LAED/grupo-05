const Sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  const alias = "TipoUsuarios";
  const columns = {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    rol: dataTypes.STRING,
  };

  const config = {
    tableName: "tipousuario",
    timestamps: false,
  };

  const tipoUsuarios = sequelize.define(alias, columns, config);

  // relaciones

  tipoUsuarios.associate = (models) => {
    tipoUsuarios.hasMany(models.Usuarios, {
      as: "tipousuarioid",
      foreignKey: "tipoUsuarioId",
    });
  };

  return tipoUsuarios;
};
