import {DataTypes} from 'sequelize';
const sequelize = require('./config/sequelize.js');
const Preorder = require('./Preorder.js');
const Product = require('./Product.js');

// Define a model
const PreorderItem = sequelize.define('Preorder_Items', {
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

Preorder.hasMany(PreorderItem)
Product.hasMany(PreorderItem)
module.exports = PreorderItem;
