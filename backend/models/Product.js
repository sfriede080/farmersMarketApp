import {DataTypes} from 'sequelize';
const sequelize = require('./config/sequelize.js');
const ProductCategory = require('./ProductCategory.js');

// Define a model
const Product = sequelize.define('Products', {
  category_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    refernces: 'product_categories', 
    referencesKey: 'ID'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  units_in_stock: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    default: 0.00
  },
  price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    default: 0.00
  }
});

Product.hasMany(ProductCategory)
module.exports = Product;
