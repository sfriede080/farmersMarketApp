import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

// Define a model
const ProductIngredient = sequelize.define("Product_Ingredients", {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: "products",
    referencesKey: "ID",
  },
  ingredient_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: "ingredients",
    referencesKey: "ID",
  },
});

export default ProductIngredient;
