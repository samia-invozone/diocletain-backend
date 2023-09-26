const { Model } = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CanvasProperties extends Model {}
  CanvasProperties.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      size_X: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      size_Y: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      window_X: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      window_Y: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      x_split: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      y_split: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zoom: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "CanvasProperties",
      paranoid: false,
      tableName: "canvas_properties",
    }
  );

  return CanvasProperties;
};
