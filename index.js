import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.error("Connection error:", err));

const app = express();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello from test API");
});

app.get("/welcome", (req, res) => {
  res.send("Welcome to my API!");
});
