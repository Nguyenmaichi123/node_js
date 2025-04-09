const Course = require("../models/course");

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.render("test", { courses });
  } catch (err) {
    res.status(500).send("Lỗi khi lấy dữ liệu khóa học.");
  }
};
