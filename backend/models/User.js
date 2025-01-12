import {DataTypes} from 'sequelize';
const sequelize = require('./sequelize');

// Define a model
const User = sequelize.define('User', {
  fname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  }
});

// Synchronize the model with the database
// This function will delete all existing tables in the database
async function syncDatabase() {
  await sequelize.sync();
  console.log('Database synchronized.');
}
// Example usage
// recommended to be in controller file
async function run() {

  await syncDatabase();// remember to comment this after server runs ones.
  // Create a new user
  const newUser = await User.create({
    username: 'john_doe',
    email: 'john.doe@example.com',
  });
  console.log('New user created:', newUser.toJSON());
}
run();