const mongoose = require("mongoose");
const User = require("./user");
const Item = require("./item");

const lineItemSchema = new mongoose.Schema(
  {
    qty: {
      type: Number,
      required: true,
      default: 1,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Item,
      required: true,
    },
  },
  {
    timestamps: true,
    toJson: { virtuals: true },
  },
);

lineItemSchema.virtual("extPrice").get(async function () {
  await this.populate("item").execPopulate();
  return this.qty * this.item.price;
});

const orderSchema = new mongoose.Schema(
  {
    lineItems: [lineItemSchema],
    orderStatus: {
      type: String,
      required: true,
      default: "pending payment",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  {
    timestamps: true,
    toJson: { virtuals: true },
  },
);

orderSchema.virtual("orderTotal").get(function () {
  return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
});

orderSchema.virtual("totalQty").get(function () {
  return this.lineItems.reduce((total, item) => total + item.qty, 0);
});

orderSchema.virtual("orderId").get(function () {
  return this.id.slice(-6).toUpperCase();
});

// Instance method to set an item's qty in the cart (will add item if it does not exist )
orderSchema.methods.setItemQty = function (itemId, newQty) {
  // this keyword is bound to the cart (order doc)
  const cart = this;
  // Find the line item in the cart for the menu item
  const lineItem = cart.lineItems.find((lineItem) =>
    lineItem.item.itemId.equals(itemId),
  );
  if (lineItem && newQty <= 0) {
    // Calling deleteOne(), removes itself from the cart.lineItems array
    lineItem.deleteOne();
  } else if (lineItem) {
    // Set the new qty - positive value is assured thanks to prev if
    lineItem.qty = newQty;
  }

  return cart.save();
};

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
