import {DataTypes} from 'sequelize';
const sequelize = require('./config/sequelize.js');
const Product = require('./Product.js');
const Ingredient = require('./Ingredient.js');

// Define a model
const ProductIngredient = sequelize.define('Product_Ingredients', {
  product_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: 'products', 
    referencesKey: 'ID'
  },
  ingredient_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: 'ingredients', 
    referencesKey: 'ID'
  }
});

Product.hasMany(ProductIngredient)
Ingredient.hasMany(ProductIngredient)

module.exports = ProductIngredient;
