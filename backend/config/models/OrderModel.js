const mongoose = require("mongoose");
const { Schema } = mongoose;

const recurringScheduleSchema = new Schema({
  dayOfWeek: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  deliveryTime: {
    type: String,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    beverageName: {
      type: String,
      required: true,
    },
    sugarLevel: {
      type: String,
      enum: ["none", "low", "medium", "high"],
      default: "medium",
    },
    cupCapacity: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    deliveryTime: {
      type: Date,
      required: true,
    },
    additionalComments: {
      type: String,
      maxLength: 200,
    },
    recurringOrder: {
      type: Boolean,
      default: false,
    },
    recurringSchedules: [recurringScheduleSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
