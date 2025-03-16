import {DataTypes, DATE} from 'sequelize';
import sequelize from '../config/sequelize.js';
import User from './User.js';
import PreorderStatusCode from './PreorderStatusCode.js';

// Define a model
const Preorder = sequelize.define('Preorders', {
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
  status_code_FK: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: 'preorder_status_codes', 
    referencesKey: 'ID'
  },
  created_at: {
    type: DataTypes.DATE,
    default: DataTypes.NOW,
    allowNull: false
  },
  fulfilled_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  order_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  total_price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    default: 0.00
  }
});

Preorder.hasMany(User), {as: 'user_FK'};
Preorder.hasMany(PreorderStatusCode), {as: 'status_code_FK'};
export default Preorder;