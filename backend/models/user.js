const Sequelize = require("sequelize");
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: { type: Sequelize.STRING(50), unique: true, allowNull: false },
        name: { type: Sequelize.STRING(20), allowNull: false },
        password: { type: Sequelize.STRING(200), allowNull: false },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: true,
        tableName: "User",
        modelName: "users",
        charset: "utf8",
        collage: "utf8_general_ci",
      }
    );
  }
};
