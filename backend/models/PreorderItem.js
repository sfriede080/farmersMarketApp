import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize.js';
import Preorder from './Preorder.js';
import Product from './Product.js';

// Define a model
const PreorderItem = sequelize.define('Preorder_Items', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true

  },
  preorder_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: 'preorders', 
    referencesKey: 'ID'
  },
  product_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: 'products', 
    referencesKey: 'ID'
  },
  total_price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    default: 0.00
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    default: 0
  }
});

PreorderItem.hasMany(Preorder), {as: 'preorder_FK'};
PreorderItem.hasMany(Product), {as: 'product_FK'};
export default PreorderItem;