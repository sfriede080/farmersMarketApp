import {DataTypes} from 'sequelize';
const sequelize = require('./config/sequelize.js');
const Product = require('./Product.js');
const Ingredient = require('./Ingredient.js');

// Define a model
const ProductIngredient = sequelize.define('Product_Ingredients', {
  product_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    refernces: 'products', 
    referencesKey: 'ID'
  },
  ingredient_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: 'ingredients', 
    referencesKey: 'ID'
  }
});

ProductIngredient.hasMany(Product)
ProductIngredient.hasMany(Ingredient)

module.exports = ProductIngredient;
