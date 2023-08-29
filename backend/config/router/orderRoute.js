const Order = require("../models/OrderModel");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Create a new order
router.post(
  "/addOrder",
  [
    check("userId").notEmpty().withMessage("User ID is required"),
    check("beverageName").notEmpty().withMessage("Beverage name is required"),
    check("cupCapacity")
      .isNumeric()
      .withMessage("Cup capacity must be a number"),
    check("deliveryTime").notEmpty().withMessage("Delivery time is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newOrder = new Order(req.body);
      const savedOrder = await newOrder.save();
      res.status(201).json({
        message: "Successfully Order added",
        savedOrder,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Get all orders
router.get("/getAllOrder", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a specific order by ID
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update an order by ID
router.put("/updateOrder/:orderId", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, {
      new: true,
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete an order by ID
router.delete("/deleteOrder/:orderId", async (req, res) => {
  try {
    const order = await Order.findByIdAndRemove(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
