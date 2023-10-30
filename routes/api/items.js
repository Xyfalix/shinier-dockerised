const express = require("express");
const router = express.Router();
const itemsCtrl = require("../../controllers/api/items");
const { checkToken } = require("../../config/checkToken");

router.get("/", checkToken, itemsCtrl.getAllItems);
router.post("/:itemId", checkToken, itemsCtrl.addItem);

module.exports = router;
