import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Wallet", "CreditCard", "CashOnDelivery"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Delivered", "Cancelled"],
      required: true,
      default: "Pending",
    },
    items: [
      {
        medicine: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medicine",
        },
        quantity: {
          type: Number,
          default: 0,
        },
        default: [],
      },
    ],
    total: {
      type: Number, 
      required: true
    }
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;
