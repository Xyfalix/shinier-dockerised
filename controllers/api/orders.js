const Order = require("../../models/order");

const getAllOrders = async (req, res) => {
  try {
    const userId = res.locals.userId;
    const userOrders = await Order.find({ user: userId });
    res.status(200).json(userOrders);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve order summary" });
  }
};
const getCart = async (req, res) => {
  try {
    const cart = await Order.getCart(res.locals.userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Unable to get cart" });
  }
};

const setItemQtyInCart = async (req, res) => {
  try {
    const cart = await Order.getCart(req.user._id);
    await cart.setItemQty(req.body.itemId, req.body.newQty);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "unable to set item qty" });
  }
};

const addToCart = async (req, res) => {
  try {
    const cart = await Order.getCart(res.locals.userId);
    await cart.addItemToCart(req.params.itemId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Unable to add item to cart" });
  }
};

// const addOrder = async (req, res) => {
//     const orderData = req.body;
//     const userId = res.locals.userId;

//     try {
//         const newOrder = await Order.create({
//             ...orderData,
//             user: userId,
//         });
//         res.status(201).json(newOrder);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Something went wrong"});
//     }
// }

const deleteItemFromOrder = async (req, res) => {
  const orderId = req.params.orderId;
  const itemId = req.params.itemId;

  try {
    const userOrder = await Order.updateOne(
      { _id: orderId },
      { $pull: { lineItems: { _id: itemId } } },
    );

    console.log(`userOrder is ${userOrder}`);

    res.status(200).json({ success: "Removed product from order" });
  } catch (error) {
    res.status(500).json({
      error: "something went wrong when trying to remove item from order",
    });
  }
};

const checkout = async (req, res) => {
  const cart = await Order.getCart(res.locals.userId);
  cart.orderStatus = "Paid";
  await cart.save();
  res.json(cart);
};

module.exports = {
  getAllOrders,
  getCart,
  setItemQtyInCart,
  addToCart,
  deleteItemFromOrder,
  checkout,
};
