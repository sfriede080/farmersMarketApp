import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

// Define a model
const User = sequelize.define(
  "Users",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    instanceMethods: {
      validatePassword: async function (candidatePassword) {
        const match = await compare(
          candidatePassword,
          this.getDataValue("password")
        );
        return match;
      },
      getFullname: function () {
        return [this.fname, this.lname].join(" ");
      },
    },
  }
);

// Hook to hash password on create
User.beforeCreate(async (user) => {
  const salt = await genSaltSync(10);
  user.password = hashSync(user.password, salt);
});

// Hook to hash password on update if it's changed
User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    const salt = await genSaltSync(10);
    user.password = hashSync(user.password, salt);
  }
});

export default User;
