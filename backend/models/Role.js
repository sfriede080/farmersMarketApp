import {DataTypes} from 'sequelize';
const sequelize = require('./sequelize');

// Define a model
const Role = sequelize.define('Roles', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
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

module.exports = Role;

//run();