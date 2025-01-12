import {DataTypes} from 'sequelize';
const sequelize = require('./config/sequelize.js');
const User = require('./User.js');
const PreorderStatusCode = require('./PreorderStatusCode.js');

// Define a model
const Preorder = sequelize.define('Preorders', {
  user_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    refernces: 'users', 
    referencesKey: 'ID'
  },
  status_code_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    refernces: 'preorder_status_codes', 
    referencesKey: 'ID'
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fulfilled_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  order_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  total_price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    default: 0.00
  }
});

Preorder.hasMany(User)
Preorder.hasMany(PreorderStatusCode)
module.exports = Preorder;
