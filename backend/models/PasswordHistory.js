import {DataTypes} from 'sequelize';
const sequelize = require('./config/sequelize.js');
const User = require('./User.js');

// Define a model
const PasswordHistory = sequelize.define('Password_Histories', {
  user_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: 'users', 
    referencesKey: 'ID'
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  retired_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

User.hasMany(PasswordHistory)
module.exports = PasswordHistory;
