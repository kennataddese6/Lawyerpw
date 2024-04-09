const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

console.log("Server is listening on port", port);

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app; // Export app to be used by tests
