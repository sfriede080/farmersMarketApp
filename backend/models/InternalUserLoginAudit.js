import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize.js';

// Define a model
const InternalUserLoginAudit = sequelize.define('Internal_User_Login_Audits', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true

  },
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

export default InternalUserLoginAudit;
