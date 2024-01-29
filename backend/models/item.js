const Sequelize = require("sequelize");
module.exports = class Item extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        category: {
          type: Sequelize.ENUM,
          values: ["회로", "전장", "기구", "포장", "기타"],
          allowNull: false,
        },
        name: { type: Sequelize.STRING(50), allowNull: true },
        descript: { type: Sequelize.STRING(200), allowNull: true },
        unit: { type: Sequelize.ENUM, values: ["￦", "$", "￥"] },
        price: {
          type: Sequelize.FLOAT(11, 4),
          allowNull: true,
          defaultValue: 0,
        },
        point: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
        use: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: true,
        modelName: "Item",
        tableName: "items",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Item.hasMany(db.Image);
  }
};
