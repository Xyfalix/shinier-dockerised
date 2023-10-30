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

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
