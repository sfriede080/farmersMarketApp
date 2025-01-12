import {DataTypes} from 'sequelize';
const sequelize = require('./config/sequelize.js');
const User = require('./User.js');

// Define a model
const PasswordHistory = sequelize.define('Password_Histories', {
  user_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    refernces: 'users', 
    referencesKey: 'ID'
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  retired_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

PasswordHistory.hasMany(User)
module.exports = PasswordHistory;
