import {DataTypes} from 'sequelize';
const sequelize = require('./config/sequelize.js');
const User = require('./User.js');

// Define a model
const LoginAttemptHistory = sequelize.define('Login_Attempt_Histories', {
  user_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    refernces: 'users', 
    referencesKey: 'ID'
  },
  login_success: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  login_attempted_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

LoginAttemptHistory.hasMany(User)
module.exports = LoginAttemptHistory;
