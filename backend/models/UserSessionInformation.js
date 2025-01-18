import {DataTypes} from 'sequelize';
const sequelize = require('./config/sequelize.js');
const User = require('./User.js');

// Define a model
const UserSessionInformation = sequelize.define('User_Session_Informations', {
  user_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: 'users', 
    referencesKey: 'ID'
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

User.hasMany(UserSessionInformation)
module.exports = UserSessionInformation;
