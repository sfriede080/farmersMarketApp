import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize.js';

// Define a model
const Role = sequelize.define('Roles', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true

  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Example usage
// recommended to be in controller file
async function run() {
  // Create a new user
  await Role.sync() // This creates the table if it doesn't exist (and does nothing if it already exists)
  const newRole = await Role.create({
    type: 'ADMIN',
    description: 'Administrative user'
    });
  console.log('New role created:', newRole.toJSON());
}

export default Role;
