import {DataTypes} from 'sequelize';
const sequelize = require('./config/sequelize.js');
const User = require('./User.js');

// Define a model
const InternalUserLoginAudit = sequelize.define('Internal_User_Login_Audits', {
  user_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    referEnces: 'users', 
    referencesKey: 'ID'
  },
  action_performed: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  action_performed_at: {
    type: DataTypes.DATE,
    default: DataTypes.NOW,
    allowNull: false
  }
});

User.hasMany(InternalUserLoginAudit)
module.exports = InternalUserLoginAudit;
