import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize.js';
import Product from './Product.js';
import Ingredient from './Ingredient.js';

// Define a model
const ProductIngredient = sequelize.define('Product_Ingredients', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true

  },
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

ProductIngredient.hasMany(Product), {as: 'product_FK'};
ProductIngredient.hasMany(Ingredient), {as: 'ingredient_FK'};
export default ProductIngredient;