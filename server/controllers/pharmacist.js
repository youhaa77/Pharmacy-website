import mongoose from 'mongoose';
import PharmacistModel from '../models/pharmacist.js';
import UserModel from '../models/user.js';
import OrderModel from '../models/order.js';
import MedicineModel from '../models/medicine.js';
import bcrypt from "bcrypt";
const saltRounds = 10;

const createPharmacist = async (req, res) => {
  const {
    username,
    name,
    type,
    email,
    password,
    birthDate,
    hourlyRate,
    hospital,
    eduBackground,
    wallet,
    status,
  } = req.body;
  let files = {}
   req.files.forEach(file => {
    if (file.fieldname == "idFile") {
      files = { ...files, idFile: file.filename }
    } else if (file.fieldname == "degreeFile") {
      files = { ...files, degreeFile: file.filename }
    } else if (file.fieldname == "licenseFile") {
      files = { ...files, licenseFile: file.filename }
    }
   });
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const existingUser = await UserModel.findOne({ username });
  if (!existingUser) {
    try {
      const user = new UserModel({ username, password, type });
      user.password = hashedPassword;
      console.log(user.password);
      await user.save();
      console.log(user);
      const pharmacist = new PharmacistModel({
        user: user._id,
        name,
        email,
        birthDate,
        hourlyRate,
        hospital,
        eduBackground,
        wallet,
        status,
        ...files
      });
      await pharmacist.save();
      res.status(200).json(pharmacist);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json("Username already exist");
  }
};

const getPharmacists = async (req, res) => {
  try {
    const pharmacists = await PharmacistModel.find();
    console.log(pharmacists);
    res.status(200).json(pharmacists);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

const getPharmacistById = async (req, res) => {
  try {
    const pharmacist = await PharmacistModel.findById(
      new mongoose.Types.ObjectId(req.params.id)
    );
    if (!pharmacist) return res.status(404).send("Pharmacist not found");
    res.status(200).send(pharmacist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPharmacistByIdForChat = async (req, res) => {
  try {
    const pharmacist = await PharmacistModel.findOne(
      {user: res.locals.userId }
    );
    if (!pharmacist) return res.status(404).send("Pharmacist not found");
    res.status(200).send(pharmacist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const acceptPharmacist = async (req, res) => {
  try {
    const pharmacist = await PharmacistModel.findByIdAndUpdate(
      req.params.id,
      { status: 'Accepted' },
      { new: true }
    );
    if (!pharmacist) {
      return res.status(404).json({ error: 'Pharmacist not found' });
    }
    res.status(200).json(pharmacist);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}; const rejectPharmacist = async (req, res) => {
  try {
    const pharmacist = await PharmacistModel.findByIdAndUpdate(
      req.params.id,
      { status: 'Rejected' },
      { new: true }
    );
    if (!pharmacist) {
      return res.status(404).json({ error: 'Pharmacist not found' });
    }
    res.status(200).json(pharmacist);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getPharmacistSalesReport = async (req, res) => {
  try {
    const pharm = await PharmacistModel.findOne({ user: res.locals.userId });
    const pharmacistId = pharm._id;

    
    const selectedMonth = req.params.month || (new Date().getMonth() + 1);
    const currentYear = new Date().getFullYear(); // Get the current year

    const startDate = new Date(currentYear, selectedMonth - 1, 1);
    const endDate = new Date(currentYear, selectedMonth, 0, 23, 59, 59, 999);

  
    
    const orders = await OrderModel.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    const medicineIds = orders.flatMap(order => order.items.map(item => item.medicine));
    const medicines = await MedicineModel.find({ _id: { $in: medicineIds } });

    const salesReport = medicines.map(medicine => {
      const totalSales = orders.reduce((acc, order) => {
        const item = order.items.find(item => item.medicine.equals(medicine._id));
        return acc + (item ? medicine.price * item.quantity : 0);
      }, 0);

      return {
        medicineName: medicine.medicineName,
        quantity:medicine.quantity,
        totalSales,
      };
    });


    res.status(200).send(salesReport);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getPharmacistSalesReportByDate = async (req, res) => {
  try {
    const pharm = await PharmacistModel.findOne({ user: res.locals.userId });
    const pharmacistId = pharm._id;
    const dateString = req.params.date; 
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; 
    const day = parseInt(dateParts[2]);
    const selectedDate = new Date(year, month, day);
    const nextDay=new Date(selectedDate);
    nextDay.setDate(nextDay.getDate()+1);
  
    console.log(selectedDate); 
    const orders = await OrderModel.find({
      createdAt: {
        $gte: new Date(selectedDate), 
        $lt: nextDay,
      },
    });

    const medicineIds = orders.flatMap(order => order.items.map(item => item.medicine));
    const medicines = await MedicineModel.find({ _id: { $in: medicineIds } });

    const salesReport = medicines.map(medicine => {
      const totalSales = orders.reduce((acc, order) => {
        const item = order.items.find(item => item.medicine.equals(medicine._id));
        return acc + (item ? medicine.price * item.quantity : 0);
      }, 0);

      return {
        medicineName: medicine.medicineName,
        quantity:medicine.quantity,
        totalSales,
      };
    });
   
    res.status(200).send(salesReport);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
  const getWallet = async (req, res) => {
    console.log("nano");
    try {

      const pharmacist = await PharmacistModel.findOne({ user: res.locals.userId });
      console.log("user: res.locals.userId "+  res.locals.userId );
      if (!pharmacist) {
        return res.status(404).json({ error: 'pharmacist not found' });
      }
      const pharmacistWallet = pharmacist.wallet;
      console.log("harmacistWallet"+pharmacistWallet);
      res.status(200).json(pharmacistWallet);
    } catch (error) {
      console.error('Error in getwallet:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getNotfication = async (req, res) => {
    try {
      console.log("wslnaa");
      const pharmacist = await PharmacistModel.findOne({ user: res.locals.userId });
      res.status(200).json(pharmacist.notifications);
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  };

  const sawNotfication = async (req, res) => {
    try {
      console.log("wslnaa saww");
      const pharmacist = await PharmacistModel.findOne({ user: res.locals.userId });
      for (let i = 0; i < pharmacist.notifications.length; i++) {
        pharmacist.notifications[i].state="read"
      }
     await pharmacist.save()
      res.status(200).json(patient.notifications);
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  };

export default {
  createPharmacist,
  getPharmacists,
  getPharmacistById,
  getPharmacistByIdForChat,
  acceptPharmacist,
  rejectPharmacist,
  getPharmacistSalesReport,
  getPharmacistSalesReportByDate,
  getWallet,
  getNotfication,
  sawNotfication
}