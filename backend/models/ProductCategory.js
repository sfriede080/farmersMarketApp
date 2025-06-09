import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

// Define a model
const ProductCategory = sequelize.define("Product_Categories", {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
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
});

export default ProductCategory;
