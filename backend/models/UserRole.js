import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize.js';
import User from './User.js';
import Role from './Role.js';

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

UserRole.hasMany(User), {as: 'user_FK'};
UserRole.hasMany(Role), {as: 'role_FK'};

export default UserRole;