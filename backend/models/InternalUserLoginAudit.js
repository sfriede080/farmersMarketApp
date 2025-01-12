import {DataTypes} from 'sequelize';
const sequelize = require('./config/sequelize.js');
const User = require('./User.js');

// Define a model
const InternalUserLoginAudit = sequelize.define('Internal_User_Login_Audits', {
  user_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    refernces: 'users', 
    referencesKey: 'ID'
  },
  action_performed: {
    type: DataTypes.STRING,
    allowNull: false
  },
  action_performed_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

InternalUserLoginAudit.hasMany(User)
module.exports = InternalUserLoginAudit;
