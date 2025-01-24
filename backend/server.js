import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import productRoute from "./route/product.route.js";
dotenv.config();
const app = express();
app.use(express.json());

app.use("/products", productRoute);

console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  connectDB();
  console.log("Server is running on port 5000 hello");
});
