const Sequelize = require("sequelize");
module.exports = class Image extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        url: { type: Sequelize.STRING(200), allowNull: true },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: true,
        modelName: "Image",
        tableName: "images",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Image.belongsTo(db.Item);
  }
};
