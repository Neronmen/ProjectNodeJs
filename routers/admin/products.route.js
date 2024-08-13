
const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/products.controller.js");
router.get("/", controller.index);
router.get("/recover", controller.indexRecover);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.patch("/recover/:id", controller.recover);
router.patch("/recoverMulti", controller.recoverMulti);
router.delete("/delete/:id", controller.delete);
module.exports = router
