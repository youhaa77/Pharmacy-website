import express from "express";
import controllers from "../controllers/patient.js";
import Auth from "../Authentication/login.js"
import Middle from "../Authentication/Middleware.js"
const router = express.Router();
//login
router.post("/patientLogin", Auth.loginPatient)

// to test this send a post request to this route: http://localhost:9000/patient
//no middleware needed
router.post("/", controllers.createPatient);
//
router.get("/", controllers.getPatients);
//check as two persons is usning it
router.get("/byId", Middle.requireAuth, controllers.getPatientById);
//not found in front checkk but tmam
router.post('/addToCart', Middle.requireAuthPatient, controllers.addToCart);
router.get("/checkIfMedicineIsAdded/:medicineId", Middle.requireAuthPatient, controllers.checkIfMedicineIsAdded);
router.post('/addToCartFromClinic', controllers.addToCart);
router.delete('/removeFromCartClinic', controllers.removeFromCart);

router.get('/viewCart', Middle.requireAuthPatient, controllers.viewCart);
router.delete('/:id/removeFromCart', Middle.requireAuthPatient, controllers.removeFromCart);
router.put('/incMed', Middle.requireAuthPatient, controllers.incMedicine);
router.put('/addAddress', Middle.requireAuthPatient, controllers.addAddressToPatient);
router.put('/updateWallet', Middle.requireAuthPatient, controllers.updateWallet);
router.put('/:id/decMed', Middle.requireAuthPatient, controllers.decMedicine);
router.get('/:id/orders/:orderId', Middle.requireAuthPatient, controllers.viewOrderDetails);
router.get('/getCartTotal', Middle.requireAuthPatient, controllers.getCartTotal);
router.post('/:id/orders/:orderId/cancel', Middle.requireAuthPatient, controllers.cancelOrder);
router.get("/getWallet", Middle.requireAuthPatient, controllers.getWallet)
router.get('/outofstock', Middle.requireAuthPatient, controllers.outofstock);
router.get("/getOnePatient/:id", Middle.requireAuthAdmin, controllers.getPatient);
router.get("/getPerscriptions", Middle.requireAuthPatient, controllers.getPrescriptions)
router.get("/getPerscription/:id", Middle.requireAuthPatient, controllers.getPres)
router.post("/payForPrescription/:id", Middle.requireAuthPatient, controllers.payPrescription)



export default router;