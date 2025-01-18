import {DataTypes} from 'sequelize';
const sequelize = require('./config/sequelize.js');
const ProductCategory = require('./ProductCategory.js');

// Define a model
const Product = sequelize.define('Products', {
  category_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: 'product_categories', 
    referencesKey: 'ID'
  },
  name: {
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
  },
  image_path: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false
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

ProductCategory.hasMany(Product)
module.exports = Product;
