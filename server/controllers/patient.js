import mongoose from 'mongoose';
import PatientModel from '../models/patient.js';
import UserModel from '../models/user.js';
import bcrypt from "bcrypt";
import MedicineModel from '../models/medicine.js';
import PrescriptionModel from '../models/prescription.js';
const saltRounds = 10;

const createPatient = async (req, res) => {
  const {
    username,
    name,
    type,
    email,
    password,
    birthDate,
    gender,
    phone,
    emergencyName,
    emergencyNo,
    emergencyRel,
    adresses,
    status,
  } = req.body;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const existingUser = await UserModel.findOne({ username });
  if (!existingUser) {
    try {
      const user = new UserModel({ username, password, type });
      user.password = hashedPassword;
      console.log(user.password);
      console.log(req.body);

      await user.save();
      console.log(user);
      const patient = new PatientModel({
        user: user._id,
        name,
        email,
        birthDate,
        gender,
        phone,
        emergencyName,
        emergencyNo,
        emergencyRel,
        adresses,
        status,
      });
      await patient.save();
      console.log(patient);
      res.status(200).json(patient);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json("Username already exist");
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await PatientModel.find();
    console.log(patients);
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

const getPatientById = async (req, res) => {
  try {
    const patient = await PatientModel.findOne({ user: res.locals.userId })
    if (!patient) return res.status(404).send("Patient not found");
    return res.status(200).send(patient);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPatient = async (req, res) => {
  try {
    const patient = await PatientModel.findOne({ _id: req.params.id })
    if (!patient) return res.status(404).send("Patient not found");
    return res.status(200).send(patient);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
//s

const addAddressToPatient = async (req, res) => {
  try {

    const { newAddress } = req.body;
    const patient = await PatientModel.findOne({ user: res.locals.userId })

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    patient.adresses.push(newAddress);
    const updatedPatient = await patient.save();

    res.status(200).json({ message: 'Address added successfully', patient: updatedPatient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPrescriptions = async (req, res) => {
  try {
    console.log(req.query)
    const patient = await PatientModel.findOne({ user: res.locals.userId });
    const patientID = patient._id;
    const arr = await PrescriptionModel.find({ "patientId": patientID });
    res.status(200).json(arr);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

const getPres = async (req, res) => {
  try {
    const presID = req.params.id
    const perscription = await PrescriptionModel.findById(presID)
    res.status(200).json(perscription);
  } catch {
    res.status(400).json({ error: error.message })
  }
}

const payPrescription = async (req, res) => {
  try {
    const presID = req.params.id;
    const perscription = await PrescriptionModel.findById(presID);
    //check its presence to avoid errors
    if (!perscription) {
      res.status(200).json({ error: "no prescription with this id , check the database" });
      return;
    }
    if (perscription.status === "filled") {
      res.status(200).json({ error: "already ordered!!, can not order it twice" });
      return;
    }

    const patient = await PatientModel.findOne({ user: res.locals.userId });

    // add medicine to cart
    for (const medicine of perscription.medicine) {
      const med = await MedicineModel.findOne({ medicineName: medicine.name });
      if (med && patient.cart) {
        const isFound = patient.cart.some(item => item.medicine.equals(med._id));
        if (!isFound) {
          patient.cart.push({
            medicine: med._id,
            quantity: 1
          })
        }
      }
    }
    await patient.save();
    perscription.status = "filled";
    await perscription.save();
    res.status(200).json("now the prescription is 'filled'");
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


const addToCart = async (req, res) => {
  const pat = await PatientModel.findOne({ user: res.locals.userId })
  const patientId = pat._id;
  const { medicineId, quantity } = req.body;

  try {
    const patient = await PatientModel.findOne({ user: res.locals.userId });
    const patientId = patient._id

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    const medicine = await MedicineModel.findById(medicineId);

    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    if (medicine.quantity === 0) {
      return res.status(400).json({ error: 'Medicine is out of stock' });
    }

    const existingCartItem = patient.cart.find(item => item.medicine.equals(medicineId));

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      patient.cart.push({ medicine: medicineId, quantity: 1 });
    }

    await patient.save();
    const populatedPatient = await PatientModel.findById(patientId).populate('cart.medicine');

    res.status(200).json(populatedPatient.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const viewCart = async (req, res) => {
  //const pat = await PatientModel.findOne({ user: res.locals.userId })
  //const patientId = pat._id;

  try {
    const patient = await PatientModel.findOne({ user: res.locals.userId }).populate('cart.medicine');
    console.log(res.locals.userId)
    console.log(patient)
    //const patient = await PatientModel.findById(patientId).populate('cart.medicine');

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const cartDetails = patient.cart.map(item => ({
      medicine: item.medicine,
      quantity: item.quantity,
    }));

    res.status(200).json(cartDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const removeFromCart = async (req, res) => {
  const pat = await PatientModel.findOne({ user: res.locals.userId })
  const patientId = pat._id;
  // const patientId = req.params.id;
  const { medicineId } = req.body;

  try {
    const patient = await PatientModel.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const cartItemIndex = patient.cart.findIndex(item => item.medicine.equals(medicineId));

    if (cartItemIndex !== -1) {
      // If the item is found, remove it from the cart
      patient.cart.splice(cartItemIndex, 1);
    } else {
      return res.status(404).json({ error: 'Item not found in the cart' });
    }

    await patient.save();

    const populatedPatient = await PatientModel.findById(patientId).populate('cart.medicine');

    res.status(200).json(populatedPatient.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const incMedicine = async (req, res) => {
  const pat = await PatientModel.findOne({ user: res.locals.userId });
  const patientId = pat._id;
  const { medicineId } = req.body;

  try {
    const patient = await PatientModel.findById(patientId);
    const medicine = await MedicineModel.findById(medicineId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const cartItem = patient.cart.find(item => item.medicine.equals(medicineId));

    if (cartItem) {
      if (medicine.quantity > 0 && cartItem.quantity < medicine.quantity) {
        cartItem.quantity += 1;
        console.log("cartItem.quantity :" + cartItem.quantity)
      } else {
        return res.status(400).json({ error: 'Cannot increment quantity. Limited to available stock.' });
      }
    } else {
      return res.status(404).json({ error: 'Item not found in the cart' });
    }

    await patient.save();
    const populatedPatient = await PatientModel.findById(patientId).populate('cart.medicine');
    res.status(200).json(populatedPatient.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const decMedicine = async (req, res) => {
  const pat = await PatientModel.findOne({ user: res.locals.userId })
  const patientId = pat._id;
  //const patientId = req.params.id; // Assuming you're passing the patientId in the route parameters
  const { medicineId } = req.body;

  try {
    const patient = await PatientModel.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const cartItem = patient.cart.find(item => item.medicine.equals(medicineId));
    if (!cartItem) return;
    if (cartItem.quantity > 0) {
      cartItem.quantity -= 1;
    } else {
      return res.status(404).json({ error: 'Item not found in the cart' });
    }

    await patient.save();
    const populatedPatient = await PatientModel.findById(patientId).populate('cart.medicine');
    res.status(200).json(populatedPatient.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const viewOrderDetails = async (req, res) => {
  const pat = await PatientModel.findOne({ user: res.locals.userId })
  const patientId = pat._id;
  // const patientId = req.params.id;
  const orderId = req.params.orderId;

  try {
    const order = await OrderModel.findById(orderId).populate('patient items.medicine');

    if (!order || !order.patient.equals(patientId)) {
      return res.status(404).json({ error: 'Order not found for the patient' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getCartTotal = async (req, res) => {

  //const patientId = req.params.id;
  const patient = await PatientModel.findOne({ user: res.locals.userId });

  if (!patient) {
    return res.status(404).json({ error: 'Patient not found' });
  }
  const cartItems = patient.cart;
  let total = 0;

  for (const cartItem of cartItems) {
    const medicine = await MedicineModel.findById(cartItem.medicine);
    console.log(medicine);
    total += medicine.price * cartItem.quantity;
    console.log(medicine.price);
    console.log(cartItem.quantity);

  }

  res.status(200).json(total);
};
const cancelOrder = async (req, res) => {
  const pat = await PatientModel.findOne({ user: res.locals.userId })
  const patientId = pat._id;
  const orderId = req.params.orderId;

  try {
    const order = await OrderModel.findById(orderId);

    if (!order || !order.patient.equals(patientId)) {
      return res.status(404).json({ error: 'Order not found for the patient' });
    }

    if (order.status !== 'Pending') {
      return res.status(400).json({ error: 'Cannot cancel order. Status is not Pending.' });
    }

    order.status = 'Cancelled';
    await order.save();

    res.status(200).json({ message: 'Order cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateWallet = async (req, res) => {
  try {
    const { paymentAmount } = req.body;
    const patient = await PatientModel.findOne({ user: res.locals.userId })
    console.log(patient);
    patient.wallet += paymentAmount;
    const updatedPatient = await patient.save();
    res.status(200).json({ updatedWallet: updatedPatient.wallet });
  } catch (error) {
    console.error('Error updating wallet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const getWallet = async (req, res) => {
  try {
    const patient = await PatientModel.findOne({ user: res.locals.userId });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const patientWallet = patient.wallet;
    res.status(200).json(patientWallet);
  } catch (error) {
    console.error('Error in getwallet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const outofstock = async (req, res) => {
  try {
    const medicinesWithZeroQuantity = await MedicineModel.find({ quantity: { $lte: 0 } });
    console.log("medicinesWithZeroQuantity:", medicinesWithZeroQuantity);
    const outOfStockMedicines = [];

    for (const medicine of medicinesWithZeroQuantity) {
      console.log("Processing medicine:", medicine);

      const medicinesWithSameIngredient = await MedicineModel.find({
        ingredients: medicine.ingredients,
        _id: { $ne: medicine._id }, // Exclude the same medicine
        quantity: { $gt: 0 }, // Exclude medicines with zero or negative quantity
      });

      console.log("medicinesWithSameIngredient:", medicinesWithSameIngredient);

      if (medicinesWithSameIngredient.length > 0) {
        outOfStockMedicines.push({
          medicineWithZeroQuantity: medicine.medicineName,
          medicinesWithSameIngredient: medicinesWithSameIngredient.map((m) => m.medicineName),
        });
      } else {
        outOfStockMedicines.push({
          medicineWithZeroQuantity: medicine.medicineName,
          medicinesWithSameIngredient: ["No alternatives available"],
        });
      }
    }

    console.log("outOfStockMedicines:", outOfStockMedicines);
    res.status(200).json(outOfStockMedicines);
  } catch (error) {
    console.error('Error fetching out-of-stock medicines:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const checkIfMedicineIsAdded = async (req, res) => {
  const { medicineId } = req.params;

  try {
    const patient = await PatientModel.findOne({ user: res.locals.userId });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const existingCartItem = patient.cart.find(item => item.medicine.equals(medicineId));

    if (existingCartItem && existingCartItem.quantity === 1) {
      res.status(200).json({ isAdded: true });
    } else {
      res.status(200).json({ isAdded: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default {
  createPatient,
  getPatients,
  getPatientById,
  getPatient,
  getPrescriptions,
  getPres,
  payPrescription,
  addToCart,
  viewCart,
  removeFromCart,
  incMedicine,
  decMedicine,
  viewOrderDetails,
  cancelOrder,
  addAddressToPatient,
  updateWallet,
  getCartTotal,
  getWallet,
  outofstock,
  checkIfMedicineIsAdded
}