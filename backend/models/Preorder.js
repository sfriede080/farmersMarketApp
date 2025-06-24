import { DataTypes, DATE } from "sequelize";
import sequelize from "../config/sequelize.js";

// Define a model
const Preorder = sequelize.define("Preorders", {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: "users",
    referencesKey: "ID",
  },
  status_code: {
    type: DataTypes.ENUM(["unplaced", "placed", "fulfilled", "unfulfilled"]),
    allowNull: false,
    defaultValue: "unplaced",
  },
  created_at: {
    type: DataTypes.DATE,
    default: DataTypes.NOW,
    allowNull: false,
  },
  fulfilled_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  order_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Preorder;
