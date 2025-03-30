import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize.js';

// Define a model
const PasswordHistory = sequelize.define('Password_Histories', {
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
  retired_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

export default PasswordHistory;