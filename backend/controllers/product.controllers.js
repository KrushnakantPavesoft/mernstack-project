import Product from "../models/product.module.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; //get the product from the request body
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }
  const newProduct = await Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch {
    console.log(error);
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }

  try {
    const upadtedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: upadtedProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: "server error" });
  }
};
