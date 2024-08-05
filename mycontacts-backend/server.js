const express = require("express");
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorhandler");
const { connect } = require("mongoose");
const dotenv = require("dotenv").config();

connectDB();
const app = express();


const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})