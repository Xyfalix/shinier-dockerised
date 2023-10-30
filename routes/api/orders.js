const express = require("express");
const router = express.Router();
const ordersCtrl = require("../../controllers/api/orders");
const { checkToken } = require("../../config/checkToken");

router.get("/orders", checkToken, ordersCtrl.getAllOrders);
router.get("/orders/getCart", checkToken, ordersCtrl.getCart);
router.patch("/orders/setItemQty", checkToken, ordersCtrl.setItemQtyInCart);
router.post("/orders/:itemId", checkToken, ordersCtrl.addToCart);
router.delete("/orders/:itemId", checkToken, ordersCtrl.deleteItemFromOrder);
router.patch("/orders/checkout", checkToken, ordersCtrl.checkout);

module.exports = router;
