const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    beverageName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["coffee", "juice", "green tea", "regular tea"],
      required: true,
    },
    availableSizes: [
      {
        cupCapacity: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
