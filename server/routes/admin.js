import express from "express";
import controllers from "../controllers/admin.js";
import Auth from "../Authentication/login.js"
import forget from "../Authentication/forget.js"
import changePass from "../Authentication/changePass.js";
import Middle from "../Authentication/Middleware.js";


const router = express.Router();

//no middle ware except changePass
router.post("/forget",forget.forget)
router.post("/compare",forget.compare)
//handled internally 
router.post("/chanePass",changePass.changePass)
//no need

router.get("/sales/:month?",Middle.requireAuthAdmin,controllers.getAdminSalesReport);

router.post("/adminLogin",Auth.loginAdmin)
router.get("/getType",Middle.getType)
//check no need azonn
// to test this send a post request to this route: http://localhost:8000/doctor
router.post("/createUser", controllers.createUser);

router.get("/getUsers",Middle.requireAuthAdmin ,controllers.getUsers);
router.post("/addAdministrator",Middle.requireAuthAdmin, controllers.addAdministrator);
router.delete("/removeUser",Middle.requireAuthAdmin, controllers.removeUser);

router.get("/medicineDetails", Middle.requireAuthAdmin, controllers.medicineDetails);
export default router;