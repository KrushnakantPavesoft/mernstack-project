import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.module.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controllers.js";
const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

export default router;
