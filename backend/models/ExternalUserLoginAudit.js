import {DataTypes} from 'sequelize';
const sequelize = require('./config/sequelize.js');
const User = require('./User.js');

// Define a model
const ExternalUserLoginAudit = sequelize.define('External_User_Login_Audits', {
  user_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: 'users', 
    referencesKey: 'ID'
  },
  logged_in_at: {
    type: DataTypes.DATE,
    default: DataTypes.NOW,
    allowNull: false
  }
});

User.hasMany(ExternalUserLoginAudit)
module.exports = ExternalUserLoginAudit;
