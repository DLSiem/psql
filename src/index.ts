import express from "express";
import dotenv from "dotenv";
import pool from "./config/db";

dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, async () => {
  await pool
    .connect()
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.error("Error connecting to the database: ", err);
    });
  console.log(`Server running on http://localhost:${PORT}`);
});

import userRouter from "./routes/userRoutes";

app.use("/users", userRouter);

import User from "./models/userModel";
