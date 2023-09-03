const express = require("express");
const router = express.Router();
const Product = require("../models/ProductModel");
const { check, validationResult } = require("express-validator");

// Create a new product
router.post(
  "/addProduct",
  [
    check("beverageName").notEmpty().withMessage("Beverage name is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("category").notEmpty().withMessage("Category is required"),
    check("category")
      .isIn(["coffee", "juice", "green tea", "regular tea"])
      .withMessage("Invalid category"),
    check("availableSizes")
      .isArray()
      .withMessage("Available sizes must be an array"),
    check("availableSizes.*.cupCapacity")
      .isString()
      .withMessage("Cup capacity must be a string"),
    check("availableSizes.*.price")
      .isNumeric()
      .withMessage("Price must be a number"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json({
        message: "Successfully Product added",
        Product: savedProduct,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Get all products
router.get("/getAllProduct", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: "get product successful",
      status: "200",
      response: products,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a specific product by ID
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a product by ID
router.put("/updateProduct/:productId", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a product by ID
router.delete("/deleteProduct/:productId", async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
