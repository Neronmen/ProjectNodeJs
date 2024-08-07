const controller = require("../../controller/admin/dashboard.controller");
const express = require("express");
const router = express.Router();
router.get("/", controller.dashboard);


module.exports = router
