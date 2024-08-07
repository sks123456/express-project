// server.js
const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const dotenv = require("dotenv").config();
const cors = require("cors");
const sequelize = require("./config/testConnection"); // This should import the sequelize instance

const app = express();

app.use(cors());
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

// Sync models
sequelize
  .sync({ force: false }) // This should work if sequelize is correctly imported
  .then(() => console.log("Models synced with the database"))
  .catch((err) => console.error("Error syncing models:", err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
