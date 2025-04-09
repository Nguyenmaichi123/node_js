const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const path = require("path");
const configview = require("./src/config/viewEngine");
const webRouter = require("./src/routes/web");
const mongoose = require("./src/config/Mongo"); // Kết nối DB tự động

//config template engine
configview(app);

//route
app.use(webRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
