module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("canvas_properties", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      size_X: {
        type: Sequelize.STRING,
      },
      size_Y: {
        type: Sequelize.STRING,
      },
      window_X: {
        type: Sequelize.STRING,
      },
      window_Y: {
        type: Sequelize.STRING,
      },
      x_split: {
        type: Sequelize.STRING,
      },
      y_split: {
        type: Sequelize.STRING,
      },
      zoom: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("canvas_properties");
  },
};
