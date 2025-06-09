import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

// Define a model
const Product = sequelize.define("Products", {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: "product_categories",
    referencesKey: "ID",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    default: "CURRENT",
    validate: {
      notEmpty: true,
    },
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  units_in_stock: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    default: 0.0,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    default: 0.0,
  },
});

export default Product;
