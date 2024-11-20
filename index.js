const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
require("dotenv").config();

const app = express();

app.use(express.json());

// Routes
app.use("/api/user", userRouter);

// Additional Routes
app.get("/", (req, res) => {
  res.send("Hello from test API");
});

app.get("/welcome", (req, res) => {
  res.send("Welcome to my API!");
});

const port = process.env.port||3000
// const db = process.env.DB;

// Database Connection and Server Initialization
// mongoose
//   .connect(db)
//   .then(() => {
//     console.log("Database connection established");
 
//   })
//   .catch((error) => {
//     console.log(`Database unable to connect: ${error.message}`);
//   });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
