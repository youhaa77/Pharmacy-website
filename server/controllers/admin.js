
import PatientModel from '../models/patient.js';
import PharmacistModel from '../models/pharmacist.js';
import UserModel from '../models/user.js';
import OrderModel from '../models/order.js';
import MedicineModel from '../models/medicine.js';
import bcrypt from "bcrypt";
const saltRounds = 10;

const createUser = async (req, res) => {
  const {
    username,
    password,
    type,

  } = req.body;
  console.log(req.body)
  try {
    const user = new UserModel({ username, password, type });
    await user.save();
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await UserModel.find();
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

const addAdministrator = async (req, res) => {
  const {
    username,
    password
  } = req.body;
  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken ,please choose a different username' });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new UserModel({
      username,
      password:hashedPassword,
      type: 'Admin'
    });
    await newAdmin.save();
    console.log(newAdmin);
    res.status(200).json(newAdmin);
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
}
const removeUser = async (req, res) => {
  const{
      username
  }= req.body;
     try {
      const user = await UserModel.findOne({ username });
      if(!user){
          res.status(404).json({message:"The User is not found"});
      }
      if(user.type==='Pharmacist'){
          await PharmacistModel.deleteOne({user:user._id});
      }
      else if(user.type==='Patient'){
        await PatientModel.deleteOne({user:user._id});
    }
      await UserModel.deleteOne({username});
      res.status(200).json({message:"The User removed successfully"});
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
};
const getAdminSalesReport = async (req, res) => {
  try {
    console.log("res.locals.userId:", res.locals.userId);
    const admin = await UserModel.findOne({ _id: res.locals.userId });
   // Check if admin is found
   if (!admin) {
    return res.status(404).send("Admin not found");
}

console.log("admin._id", admin._id);
    
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

export default {
  createUser, getUsers,
  addAdministrator, removeUser,getAdminSalesReport,
  medicineDetails
}
