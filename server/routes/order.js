import express from "express";
import controllers from "../controllers/order.js";
import Middle from "../Authentication/Middleware.js"

const router = express.Router();
router.post("/add", Middle.requireAuthPatient, controllers.addOrder);
router.get("/orderDetails/:id", Middle.requireAuthPatient, controllers.viewOrderDetails);
router.put("/cancel", Middle.requireAuthPatient, controllers.cancelOrder);
router.get("/getOrders", Middle.requireAuthPatient, controllers.getOrders);


export default router;