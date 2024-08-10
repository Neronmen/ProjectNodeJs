const express = require("express");
var methodOverride = require('method-override') 
const route = require("./routers/client/index.router.js");
const routeAdmin = require("./routers/admin/index.router");
require("dotenv").config();
//Kết nội MONGO_DB

const database = require("./config/database.js");
database.connect();

const app = express();
app.use(methodOverride('_method'))
const port = process.env.PORT;
const system = require("./config/system.js")
// Cấu hình thằng pug
app.set("views", "./views");
app.set("view engine", "pug");

// file tĩnh
app.use(express.static("public"))

// routers
route(app);
routeAdmin(app);

app.locals.prefixAdmin = system.prefixAdmin

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
