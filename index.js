const express = require("express");
const route = require("./routers/client/index.router.js");
const app = express();
const port = 4000;

// Cấu hình thằng pug
app.set("views", "./views");
app.set("view engine", "pug");

// routers
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
