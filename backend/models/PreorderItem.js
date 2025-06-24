import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Product from "./Product.js";

// Define a model
const PreorderItem = sequelize.define("Preorder_Items", {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  preorder_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "preorders", key: "ID" },
  },
  product_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "products", key: "ID" },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    default: 0,
  },
});

PreorderItem.belongsTo(Product, { foreignKey: "product_FK" });
Product.hasMany(PreorderItem, { foreignKey: "product_FK" });

export default PreorderItem;
