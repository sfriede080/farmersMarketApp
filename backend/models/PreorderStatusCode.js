import {DataTypes} from 'sequelize';
const sequelize = require('./sequelize');

// Define a model
const PreorderStatusCode = sequelize.define('Preorder_Status_Codes', {
  status_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = PreorderStatusCode;
