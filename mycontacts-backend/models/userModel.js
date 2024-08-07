// models/userModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/testConnection"); // Import your sequelize instance

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please add the username",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email address already taken",
      },
      validate: {
        isEmail: {
          msg: "Please provide a valid email address",
        },
        notEmpty: {
          msg: "Please add the user email address",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please add the user password",
        },
      },
    },
  },
  {
    timestamps: true, // Enables createdAt and updatedAt fields
  }
);

// Export the User model
module.exports = User;
