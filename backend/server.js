import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.module.js";
import mongoose from "mongoose";
dotenv.config();
const app = express();
app.use(express.json());

app.get("/products",async(req,res)=>{
  try{
   const products=await Product.find({})
   res.status(200).json({success:true,data:products})
  }catch(error){
   res.status(500).json({success:false,message:"server error"})
  }
  
})
app.post("/products", async (req, res) => {
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
});

app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.put("/products/:id",async(req,res)=>{
  const id =req.params.id;
  const product=req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({success:false,message:"Invalid Id"})
  }

  try{
    const upadtedProduct=await Product.findByIdAndUpdate(id,product,{new:true})
    res.status(200).json(({success:true,data:upadtedProduct}))
  }catch(error){
    res.status(400).json({success:false,message:"server error"})
  }

})


console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  connectDB();
  console.log("Server is running on port 5000 hello");
});
