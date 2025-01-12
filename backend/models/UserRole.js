import {DataTypes} from 'sequelize';
const sequelize = require('./config/sequelize.js');
const User = require('./User.js');
const Role = require('./Role.js');

// Define a model
const UserRole = sequelize.define('User_Roles', {
  user_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    refernces: 'users', 
    referencesKey: 'ID'
  },
  role_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: 'roles', 
    referencesKey: 'ID'
  }
});

UserRole.hasMany(User)
UserRole.hasMany(Role)

module.exports = UserRole;
