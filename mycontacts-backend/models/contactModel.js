// models/contactModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/testConnection"); // Import your sequelize instance

const Contact = sequelize.define(
  "Contact",
  {
    user_id: {
      type: DataTypes.INTEGER, // Use INTEGER for foreign key
      allowNull: false,
      references: {
        model: "Users", // Ensure this matches the name of the User table
        key: "id", // Assuming the User table has an 'id' column
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please add the contact name",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Please provide a valid email address",
        },
        notEmpty: {
          msg: "Please add the contact email address",
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please add the contact phone number",
        },
      },
    },
  },
  {
    timestamps: true, // Enables createdAt and updatedAt fields
  }
);

// Export the Contact model
module.exports = Contact;
