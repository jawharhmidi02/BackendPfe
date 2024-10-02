const express = require("express");
const db = require("./db/connect");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/auth.route");
const servicesRouter = require("./routes/services.route");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/services", servicesRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB and start the Server
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await db(process.env.MONGODB_URI);
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
