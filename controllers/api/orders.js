const Item = require("../../models/item");
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
  const userId = res.locals.userId;
  // look for order with pending payment order status and userId
  try {
    const cart = await Order.findOne({
      orderStatus: "pending payment",
      user: userId,
    })
      .populate("lineItems.item")
      .exec();
    // return cart if it exists
    if (cart) {
      return res.status(200).json(cart);
    } else {
      // inform user that cart is empty
      return res.status(200).json({ message: "Your cart is empty!" });
    }
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
  const itemId = req.params.itemId;
  const userId = res.locals.userId;
  try {
    const unpaidOrder = await Order.findOne({
      orderStatus: "pending payment",
      user: userId,
    })
      .populate("lineItems.item")
      .exec();

    if (unpaidOrder) {
      // check if item exists in cart and add qty if it exists
      const existingItem = unpaidOrder.lineItems.find(
        (lineItem) => lineItem.item.itemId === itemId,
      );

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        // create new line item if item does not exist
        const item = await Item.findOne({ itemId });
        if (!item) {
          return res.status(400).json({ error: "Item not found" });
        }
        unpaidOrder.lineItems.push({ item, qty: 1 });
      }
      await unpaidOrder.save();
      return res.status(200).json(unpaidOrder);
    } else {
      // create a new order and add item to order
      const item = await Item.findOne({ itemId });

      const newOrder = await Order.create({
        user: userId,
        lineItems: [{ item: item._id, qty: 1 }],
      });
      await newOrder.save();
      return res.status(201).json(newOrder);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to add item to cart" });
  }
};

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
