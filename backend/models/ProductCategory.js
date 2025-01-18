import {DataTypes} from 'sequelize';
const sequelize = require('./sequelize');

// Define a model
const ProductCategory = sequelize.define('Product_Categories', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = ProductCategory;
