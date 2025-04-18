const express = require("express");
const Category = require("../models/category");
const router = express.Router();

// Thêm danh mục
router.post("/", async (req, res) => {
  const category = new Category(req.body);
  try {
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lấy danh sách danh mục
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

module.exports = router;
