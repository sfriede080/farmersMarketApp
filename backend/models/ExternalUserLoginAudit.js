import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize.js';
import User from './User.js';

// Define a model
const ExternalUserLoginAudit = sequelize.define('External_User_Login_Audits', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true

  },
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

ExternalUserLoginAudit.hasMany(User), {as: 'user_FK'};
export default ExternalUserLoginAudit;
