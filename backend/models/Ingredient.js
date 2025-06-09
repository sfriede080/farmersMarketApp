import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

// Define a model
const Ingredient = sequelize.define("Ingredients", {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
});

export default Ingredient;
