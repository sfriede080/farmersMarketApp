import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize.js';
import User from './User.js';

// Define a model
const UserLogin = sequelize.define('User_Logins', {
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
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  locked_out: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

UserLogin.hasMany(User), {as: 'user_FK'};
export default UserLogin;

