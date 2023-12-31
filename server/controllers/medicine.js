import MedicineModel from '../models/medicine.js';
import PrescriptionModel from '../models/prescription.js';
import PatientModel from '../models/patient.js';
import OrderModel from '../models/order.js';
// add a new medicine with all the details 
const addMedicine = async (req, res) => {
  try {

    const {
      medicineName,
      price,
      quantity,
      ingredients,
      medicineStatus,
      description,
      sales,
      medicinalUse,
      requiresPrescription
    } = req.body;
    let files = {}
    req.files.forEach(file => {
      if (file.fieldname == "image") {
        files = { ...files, image: file.filename }
      }
    });

    const medicine = new MedicineModel({
      medicineName,
      price,
      quantity,
      ingredients,
      description,
      medicineStatus,
      sales,
      medicinalUse,
      requiresPrescription,
      ...files
    });
    await medicine.save();
    console.log(medicine);
    res.status(200).json(medicine);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// search a medicine by name 
const searchByName = async (req, res) => {
  try {
    const lowerName = req.body.name.toLowerCase();
    const medicine = await MedicineModel.find({ medicineName: { $regex: new RegExp(lowerName, 'i') } });
    res.status(200).json(medicine);
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}


const updateMedicine = async (req, res) => {
  const {
    description,
    ingredients,
    price,
    quantity,
  } = req.body;
  try {
    const medicine = await MedicineModel.findByIdAndUpdate(req.params.id, { $set: { description, ingredients, price, quantity } }, { new: true });
    res.status(200).json(medicine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// filter medicine using medicinal use
const filterMedicine = async (req, res) => {
  try {
    const { medicinalUse } = req.query;

    const medicines = await MedicineModel.find({ medicinalUse: { $regex: medicinalUse, $options: 'i' } });

    if (!medicines) return res.status(200).send({ message: "No medicine found" });
    return res.status(200).send(medicines);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
const medicineDetails = async (req, res) => {
  try {
  
    const medicines = await MedicineModel.find();

   
    const nonCancelledOrders = await OrderModel.find({ status: { $ne: 'Cancelled' } });

    const selectedData = medicines.map((item) => {
      
      const totalSales = nonCancelledOrders.reduce((acc, order) => {
        const orderItem = order.items.find((orderItem) => orderItem.medicine.equals(item._id));
        return acc + (orderItem ? orderItem.quantity * item.price : 0);
      }, 0);

      
      return {
        medicineName: item.medicineName,
        quantity: item.quantity,
        sales: item.sales,
        totalSales,
      };
    });

    
    res.status(200).json(selectedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addMedicineAdmin = async (req, res) => {
  try {
  
    const medicines = await MedicineModel.find();

   
    const nonCancelledOrders = await OrderModel.find({ status: { $ne: 'Cancelled' } });

    const selectedData = medicines.map((item) => {
      
      const totalSales = nonCancelledOrders.reduce((acc, order) => {
        const orderItem = order.items.find((orderItem) => orderItem.medicine.equals(item._id));
        return acc + (orderItem ? orderItem.quantity * item.price : 0);
      }, 0);

      
      return {
        medicineName: item.medicineName,
        quantity: item.quantity,
        sales: item.sales,
        totalSales,
      };
    });

    
    res.status(200).json(selectedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//get the total price for a list of medicines in a prescription (from the clinic)
const medicinePrice = async (req, res) => {
  try {
    let price = 0;
    const medicines = req.body;
    if (!medicines) {
      console.log("the pres medicine array is null!!!")
      return;
    }
    for (const element of medicines) {
      const medicine = await MedicineModel.findOne({ "medicineName": element.name });
      if (!medicine) {
        res.status(200).send("Oops, medicine not found");
        return;
      }
      price += medicine.price;
    }
    res.status(200).send(price);
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}



// list specific details of all medicines 
const listMedicines = async (req, res) => {
  try {
    const medicines = await MedicineModel.find();
    const selectedData = medicines.map((item) => {
      return {
        _id: item._id,
        medicineName: item.medicineName,
        price: item.price,
        ingredients: item.ingredients,
        description: item.description,
        medicineStatus: item.medicineStatus,
        medicinalUse: item.medicinalUse,
        quantity: item.quantity,
        image: item.image,
        requiresPrescription: item.requiresPrescription,
        archiveStatus: item.archiveStatus
      };
    });

    //console.log(selectedData);

    res.status(200).json(selectedData);
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//ss
const updateArchiveStatus = async (req, res) => {
  const { medicineId, archivedStatus } = req.body;

  try {
    if (!medicineId || !archivedStatus) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const updatedMedicine = await MedicineModel.findByIdAndUpdate(
      medicineId,
      { $set: { archiveStatus: archivedStatus } },
      { new: true }
    );

    if (!updatedMedicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    return res.status(200).json(updatedMedicine);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/*const addPrescriptionMedicine = async (req, res) => {
  try {
    const { patientId, medicineId, prescriptionInfo } = req.body;

    // Validate input parameters
    if (!patientId || !medicineId || !prescriptionInfo) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    // Check if the patient exists
    const patient = await PatientModel.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Check if the medicine exists and is available
    const medicine = await MedicineModel.findById(medicineId);
    if (!medicine || medicine.medicineStatus !== "Available" || medicine.archiveStatus === "Archived") {
      return res.status(404).json({ error: "Prescription medicine not available" });
    }

    // Check if the medicine is in the recent prescription
    const recentPrescription = // Logic to retrieve recent prescription ;
    const isMedicineInPrescription = recentPrescription.some(prescriptionMedicine => prescriptionMedicine.medicine.toString() === medicineId);
    if (!isMedicineInPrescription) {
      return res.status(403).json({ error: "Medicine not in recent prescription" });
    }

    // Add medicine to the cart
    const cartItem = {
      medicine: medicineId,
      quantity: 1, // You can adjust the quantity as needed
    };

    patient.cart.push(cartItem);
    await patient.save();

    return res.status(200).json({ message: "Prescription medicine added to the cart successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};*/


const addPrescriptionMed = async (req, res) => {
  try {
    const { medicineName, quantity, prescriptionId } = req.body;

    // Check if prescription exists
    const prescription = await PrescriptionModel.findById(prescriptionId);
    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    // Check if prescription is recent
    const currentDate = new Date();
    const prescriptionDate = prescription.date;

    if (currentDate - prescriptionDate > 30 * 24 * 60 * 60 * 1000) {
      // Prescription is older than 30 days
      return res.status(400).json({ error: 'Prescription is not recent' });
    }

    // Check if medicine exists
    const medicine = await MedicineModel.findOne({ medicineName });

    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    // Check if medicine is available
    if (medicine.medicineStatus !== 'Available') {
      return res.status(400).json({ error: 'Medicine is not available' });
    }

    // Update patient's cart
    const patientId = res.locals.userId;
    const patient = await PatientModel.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const cartItem = {
      medicine: medicine._id,
      quantity,
    };

    patient.cart.push(cartItem);
    await patient.save();

    return res.status(200).json({ message: 'Medicine added to cart successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};




//ss


export default {
  updateMedicine,
  filterMedicine,
  addMedicine,
  searchByName,
  medicineDetails,
  listMedicines,
  updateArchiveStatus,
  addPrescriptionMed,
  medicinePrice,
  addMedicineAdmin
}