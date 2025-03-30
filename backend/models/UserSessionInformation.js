import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize.js';

// Define a model
const UserSessionInformation = sequelize.define('User_Session_Informations', {
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

export default UserSessionInformation;