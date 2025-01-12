import {DataTypes} from 'sequelize';
const sequelize = require('./sequelize');

// Define a model
const Ingredient = sequelize.define('Ingredients', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Ingredient;
