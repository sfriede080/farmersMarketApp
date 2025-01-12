import {DataTypes} from 'sequelize';
const sequelize = require('./sequelize');

// Define a model
const ProductCategory = sequelize.define('Product_Categories', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = ProductCategory;
