import mailer from "nodemailer";
import MedicineModel from '../models/medicine.js';
import OrderModel from '../models/order.js';
import PatientModel from '../models/patient.js';
import PharmacistModel from '../models/pharmacist.js';


async function calculateCartTotalPrice(cart) {

  console.log(cart);
  let total = 0;


  for (const cartItem of cart) {
    // const patientWithCart = PatientModel
    // .findById('652aebde203548e19b62d4b1')
    // .populate({
    //   path: 'cart.medicine', // Populate the 'medicine' field inside the 'cart' array
    //   model: 'Medicine', // Specify the model to use for populating
    // })
    // .exec();
    const medicine = await MedicineModel.findById(cartItem.medicine);
    //console.log(medicine);
    total += medicine.price * cartItem.quantity;
    //console.log(medicine.price);
    //console.log(cartItem.quantity);

  }
  console.log(total);
  return total;
}

const addOrder = async (req, res) => {
  const pat = await PatientModel.findOne({ user: res.locals.userId })
  const patientId = pat._id;
  const { deliveryAddress, paymentMethod } = req.body;

  try {
    const patient = await PatientModel.findOne(patientId).populate('cart.medicine');

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    const cartItems = patient.cart;
    let total = 0;

    for (const cartItem of cartItems) {
      if (cartItem.medicine) {
        const medicine = await MedicineModel.findById(cartItem.medicine);
        console.log("medicine quantity before: " + medicine.quantity);

        // Update the quantity of the medicine in the database
        medicine.quantity -= cartItem.quantity;

        if (medicine.quantity === 0) {
          console.log("yahyaa");
          const message = `this message is to inform you that ${medicine.medicineName} is out of stock `;

          const notifi = {
            data: message,
            img: medicine.image,
            state: "Unread",
            time: new Date(),
          }
          const updateNotfi = await PharmacistModel.updateMany({}, { $push: { notifications: notifi } })
          const result = await PharmacistModel.find({}, 'email');

          // Extract emails from the result
          const emails = result.map(instance => instance.email);


          //maill


          let config = {
            service: "gmail",
            auth: {
              user: process.env.mail,
              pass: process.env.appPss

            },
            tls: {
              rejectUnauthorized: false
            },
          }

          let transporter = mailer.createTransport(config);

          let messagee = {
            from: process.env.mail, // sender address
            to: emails, // list of receivers
            subject: "Hello ✔", // Subject line
            text: message // plain text body
            //html: "<b>your verification code is 5555</b>", // html body
          }

          transporter.sendMail(messagee).then((info) => {
            console.log(info);
          }).catch(error => {
            console.log(error)
          })


        }

        try {
          await medicine.save();
          console.log("medicine quantity after: " + medicine.quantity);
        } catch (error) {
          console.error('Error saving medicine:', error);
        }

        total += medicine.price * cartItem.quantity;
      }
    }


    const order = new OrderModel({
      patient: patientId,
      deliveryAddress,
      paymentMethod,
      items: cartItems,
      status: 'Pending',
      total: total
    });

    await order.save();

    // Clear the patient's cart after placing the order
    patient.cart = [];
    await patient.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//not linkedd with front end
// const viewOrderDetails = async (req, res) => {
//   const orderId = req.body.id;
//   console.log(req.params.id)

//   try {
//     const order = await OrderModel.findById(orderId);

//     console.log(order)
//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' });
//     }

//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const viewOrderDetails = async (req, res) => {
  const pat = await PatientModel.findOne({ user: res.locals.userId })
  const patientId = pat._id;
  // const patientId = req.params.id;
  const orderId = req.params.id;

  try {
    console.log(orderId)
    const order = await OrderModel.findById(orderId).populate('patient items.medicine');

    if (!order || !order.patient.equals(patientId)) {
      return res.status(404).json({ error: 'Order not found for the patient' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getOrders = async (req, res) => {
  const pat = await PatientModel.findOne({ user: res.locals.userId })
  const patientId = pat._id;
  try {
    const order = await OrderModel.find({ patient: patientId });
    //console.log(order);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//not linkedd with front end
// const cancelOrder = async (req, res) => {
//   const orderId = '6551ff758f207fe689a67e5f';

//   try {
//     const order = await OrderModel.findById(orderId);

//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' });
//     }

//     if (order.status !== 'Pending') {
//       return res.status(400).json({ error: 'Cannot cancel order. Status is not Pending.' });
//     }

//     order.status = 'Cancelled';
//     await order.save();

//     res.status(200).json({ message: 'Order cancelled successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const cancelOrder = async (req, res) => {
  const pat = await PatientModel.findOne({ user: res.locals.userId })
  const patientId = pat._id;
  const orderId = req.body.orderId;

  try {
    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found for the patient' });
    }

    if (order.status !== 'Pending') {
      return res.status(400).json({ error: 'Cannot cancel order. Status is not Pending.' });
    }
    // Iterate through order items and increment the quantity in the MedicineModel
    for (const orderItem of order.items) {
      const medicine = await MedicineModel.findById(orderItem.medicine);
      console.log("medicine quantity before: " + medicine.quantity);

      // Update the quantity of the medicine in the database
      medicine.quantity += orderItem.quantity;

      try {
        await medicine.save();
        console.log("medicine quantity after: " + medicine.quantity);
      } catch (error) {
        console.error('Error saving medicine:', error);
      }
      order.status = 'Cancelled';
      await order.save();
    }
    res.status(200).json({ message: 'Order cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  addOrder,
  viewOrderDetails,
  cancelOrder,
  getOrders,

}
