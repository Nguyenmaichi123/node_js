const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/wick_education_dev", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch((err) => console.error("❌ Lỗi MongoDB:", err));

module.exports = mongoose;
