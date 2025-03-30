import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize.js';

// Define a model
const UserRole = sequelize.define('User_Roles', {
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
  role_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: 'roles', 
    referencesKey: 'ID'
  }
});

export default UserRole;