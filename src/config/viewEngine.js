const path = require("path"); // Thêm dòng này
const express = require("express");
const configview = (app) => {
  app.set("views", "./src/views");
  app.set("view engine", "ejs");
  app.use(express.static(path.join(__dirname, "../public")));
};

module.exports = configview;
