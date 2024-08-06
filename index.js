const express = require("express");

const route = require("./routers/client/index.router.js");
require("dotenv").config();
//Kết nội MONGO_DB

const database = require("./config/database.js");
database.connect();

const app = express();
const port = process.env.PORT;

// Cấu hình thằng pug
app.set("views", "./views");
app.set("view engine", "pug");

// file tĩnh
app.use(express.static("public"))

// routers
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
