const express = require("express");
const Product = require("../models/products");
const router = express.Router();
const mongoose = require("mongoose");

// Thêm sản phẩm
router.post("/", async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lấy tất cả sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/category/:id", async (req, res) => {
  try {
    const categoryId = new mongoose.Types.ObjectId(req.params.id);
    const products = await Product.find({ category: categoryId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Lỗi server hoặc ID không hợp lệ" });
  }
});

module.exports = router;
