import {DataTypes} from 'sequelize';
const sequelize = require('./config/sequelize.js');
const User = require('./User.js');

// Define a model
const UserLogin = sequelize.define('User_Logins', {
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

User.hasMany(UserLogin)
module.exports = UserLogin;
