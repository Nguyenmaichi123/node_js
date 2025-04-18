const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/products");
const QRCode = require("qrcode");

// Khởi tạo giỏ nếu chưa có
function initCart(req) {
  if (!req.session.cart) req.session.cart = [];
}

// 👉 Thêm sản phẩm vào giỏ
router.post("/add", async (req, res) => {
  const { productId, quantity } = req.body;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "ID sản phẩm không hợp lệ" });
  }

  if (!req.session.cart) req.session.cart = [];

  try {
    const product = await Product.findById(productId).lean();
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    const existing = req.session.cart.find((item) => item._id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      req.session.cart.push({
        _id: product._id.toString(),
        name: product.name,
        price: product.price,
        description: product.description,
        quantity,
      });
    }

    res.json({ message: "Đã thêm vào giỏ", cart: req.session.cart });
  } catch (err) {
    console.error("Lỗi thêm giỏ hàng:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// 👉 Xem giỏ hàng
router.get("/", (req, res) => {
  initCart(req);
  res.json(req.session.cart);
});

// 👉 Xoá sản phẩm khỏi giỏ
router.post("/remove", (req, res) => {
  const { _id } = req.body;
  initCart(req);
  req.session.cart = req.session.cart.filter((item) => item._id !== _id);
  res.json({ message: "Đã xoá sản phẩm", cart: req.session.cart });
});

// 👉 Xoá toàn bộ giỏ
router.post("/clear", (req, res) => {
  req.session.cart = [];
  res.json({ message: "Đã xoá toàn bộ giỏ hàng" });
});

router.post("/payment", async (req, res) => {
  const { amount } = req.body;

  const qrCode = await QRCode.toDataURL(
    `https://images.search.yahoo.com/search/images;_ylt=AwrO.3pCZgJoYmgi6wmJzbkF;_ylu=c2VjA3NlYXJjaARzbGsDYnV0dG9u;_ylc=X1MDOTYwNjI4NTcEX3IDMgRmcgNtY2FmZWUEZnIyA3A6cyx2OmksbTpzYi10b3AEZ3ByaWQDdTN1d2xidHlSNkNoMFhnNjBCcFNHQQRuX3JzbHQDMARuX3N1Z2cDMARvcmlnaW4DaW1hZ2VzLnNlYXJjaC55YWhvby5jb20EcG9zAzAEcHFzdHIDBHBxc3RybAMwBHFzdHJsAzIyBHF1ZXJ5AyVFMSVCQSVBM25oJTIwYyVFMSVCQSVBM20lMjAlQzYlQTFuJTIwJUM0JTkxJUMzJUEzJTIwbXVhJTIwaCVDMyVBMG5nBHRfc3RtcAMxNzQ0OTg5MDAw?p=%E1%BA%A3nh+c%E1%BA%A3m+%C6%A1n+%C4%91%C3%A3+mua+h%C3%A0ng&fr=mcafee&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&ei=UTF-8&x=wrt&type=E210US91215G0#id=5&iurl=https%3A%2F%2Fblogcdn.muaban.net%2Fwp-content%2Fuploads%2F2021%2F04%2F29092832%2F3-1.jpg&action=clickhttps://blogcdn.muaban.net/wp-content/uploads/2021/04/29092832/3-1.jpg`
  );
  req.session.cart = [];
  res.json({ qrCode });
});

module.exports = router;
