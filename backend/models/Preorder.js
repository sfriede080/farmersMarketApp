import {DataTypes, DATE} from 'sequelize';
const sequelize = require('./config/sequelize.js');
const User = require('./User.js');
const PreorderStatusCode = require('./PreorderStatusCode.js');

// Define a model
const Preorder = sequelize.define('Preorders', {
  user_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: 'users', 
    referencesKey: 'ID'
  },
  status_code_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: 'preorder_status_codes', 
    referencesKey: 'ID'
  },
  created_at: {
    type: DataTypes.DATE,
    default: DataTypes.NOW,
    allowNull: false
  },
  fulfilled_at: {
    type: DataTypes.DATE,
    allowNull: true
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

User.hasMany(Preorder)
PreorderStatusCode.hasMany(Preorder)
module.exports = Preorder;
