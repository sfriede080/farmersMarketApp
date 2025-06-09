import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

// Define a model
const PreorderStatusCode = sequelize.define("Preorder_Status_Codes", {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status_code: {
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

export default PreorderStatusCode;
