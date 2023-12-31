import express from "express";
import controllers from "../controllers/pharmacist.js";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";
import Auth from "../Authentication/login.js"
import Middle from "../Authentication/Middleware.js"

const router = express.Router();
//login
router.post("/PharmicistLogin", Auth.loginPharmacist)
router.get("/getWallet",Middle.requireAuthPhatmacist, controllers.getWallet);
// to test this send a post request to this route: http://localhost:9000/pharmacist
router.post("/", uploadMiddleware, controllers.createPharmacist);

router.get("/", controllers.getPharmacists);
router.get("/getNotfication",Middle.requireAuthPhatmacist, controllers.getNotfication);
router.get("/sawNotfication",Middle.requireAuthPhatmacist, controllers.sawNotfication);
router.get("/:id",controllers.getPharmacistById);
router.get("/get/byId", Middle.requireAuthPhatmacist,controllers.getPharmacistByIdForChat);
router.put("/accept/:id",Middle.requireAuthAdmin, controllers.acceptPharmacist);
router.put("/reject/:id",Middle.requireAuthAdmin, controllers.rejectPharmacist);
router.get("/sales/:month?",Middle.requireAuthPhatmacist, controllers.getPharmacistSalesReport);
router.get("/salesdate/:date?", Middle.requireAuthPhatmacist, controllers.getPharmacistSalesReportByDate);


export default router;