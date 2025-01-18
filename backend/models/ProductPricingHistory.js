import {DataTypes} from 'sequelize';
const sequelize = require('./config/sequelize.js');
const Product = require('./Product.js');

// Define a model
const ProductPricingHistory = sequelize.define('Product_Pricing_Histories', {
  product_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: 'products', 
    referencesKey: 'ID'
  },
  price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    default: 0.00
  },
  started_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ended_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

Product.hasMany(ProductPricingHistory)
module.exports = ProductPricingHistory;
