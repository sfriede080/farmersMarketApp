import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize.js';
import User from './User.js';


// Define a model
const LoginAttemptHistory = sequelize.define('Login_Attempt_Histories', {
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
  login_success: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  login_attempted_at: {
    type: DataTypes.DATE,
    default: DataTypes.NOW,
    allowNull: false
  }
});

LoginAttemptHistory.hasMany(User), {as: 'user_FK'};
export default LoginAttemptHistory;