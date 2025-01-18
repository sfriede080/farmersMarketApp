import {DataTypes} from 'sequelize';
const sequelize = require('./sequelize');

// Define a model
const User = sequelize.define('Users', {
  fname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      is: ["^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$"]
    }
  },
  user_created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});


// Example usage
// recommended to be in controller file
async function run() {
  // Create a new user
  await User.sync() // This creates the table if it doesn't exist (and does nothing if it already exists)
  const newUser = await User.create({
    fname: 'John',
    lname: 'Doe',
    email: 'john.doe@example.com',
    phone_number: '321-321-4321'
    });
  console.log('New user created:', newUser.toJSON());
  newUser.name = 'Ada';
  // the name is still "Jane" in the database
  await newUser.save();
  // Now the name was updated to "Ada" in the database!
  console.log('Updated name:', newUser.toJSON());
}

module.exports = User;

//run();