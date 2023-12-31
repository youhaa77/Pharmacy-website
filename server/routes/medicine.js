import express from "express";
import controllers from "../controllers/medicine.js";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";
import Middle from "../Authentication/Middleware.js"
const router = express.Router();

router.put("/:id", Middle.requireAuthPhatmacist, controllers.updateMedicine);
router.get("/filter", Middle.requireAuth, controllers.filterMedicine);
//check not found in front end check this
router.get("/search", Middle.requireAuth, controllers.searchByName);

router.get("/searchMedForClinic", controllers.searchByName);

router.post("/updateArchiveStatus",Middle.requireAuthPhatmacist, controllers.updateArchiveStatus);
router.post("/addPrescriptionMedicine",Middle.requireAuthPatient, controllers.addPrescriptionMed);

router.get("/listMedicines", Middle.requireAuth, controllers.listMedicines);
router.get("/medicineDetails", Middle.requireAuthPhatmacist, controllers.medicineDetails);
router.post("/addMedicine", uploadMiddleware, Middle.requireAuthPhatmacist, controllers.addMedicine);

router.post("/updateArchiveStatus", Middle.requireAuthPhatmacist, controllers.updateArchiveStatus);
//for data exchange with the clinic , don't put auth here
router.get("/medicinesTotPrice", controllers.medicinePrice);

export default router;

//
//652ae837203548e19b62d477
//652ae837203548e19b62d477    70
//652ae661203548e19b62d45b    200