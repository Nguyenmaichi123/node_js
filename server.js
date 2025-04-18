const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const path = require("path");
const configview = require("./src/config/viewEngine");
const authRoutes = require("./src/routes/auth");
const categoryRoutes = require("./src/routes/category");
const productRoutes = require("./src/routes/products");
const cartRoutes = require("./src/routes/cart");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 2 }, // 2 tiếng
  })
);
//config template engine
configview(app);
app.use(expressLayouts);
app.set("layout", "layouts/main");
app.use(express.static(path.join(__dirname, "src", "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//route
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.render("index"); // => render views/index.ejs
});

app.get("/products", (req, res) => {
  res.render("products");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/register", (req, res) => {
  res.render("register"); // => render views/index.ejs
});

app.get("/login", (req, res) => {
  res.render("login"); // => render views/index.ejs
});

app.get("/cart", (req, res) => {
  res.render("cart"); // => render views/index.ejs
});

app.get("/payment", (req, res) => {
  res.render("payment"); // => render views/index.ejs
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
