import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import pharmacistRoutes from "./routes/pharmacist.js";
import patientRoutes from "./routes/patient.js";
import adminRoutes from "./routes/admin.js";
import medicineRoutes from "./routes/medicine.js";
import orderRoutes from "./routes/order.js";
import chatRoutes from "./routes/message.js";
import MessageModel from './models/message.js';
import stripe from 'stripe';
import Auth from "./Authentication/login.js"
const stripeInstance = new stripe('sk_test_51OAbKKFG7BNY2kzIjyhX3ByBqijkVoASpjD4fcyOIjGcYiyxMdpHzQAf2rX7bBcokOGHeo7uwxDLX8mkStLJD3pj001MnvPqcn');

const app = express();
app.use(express.json());
app.use(cors());
import http from "http";
import { Server } from "socket.io";
// import chat from "./controllers/chat.js";
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
  },
})

global.onlineUsers = new Map();
io.on('connection', (socket) => {
  console.log('A user connected');
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`user ${userId}is added`);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    console.log(`${data.msg} is sent from ${data.from} to ${data.to}`);
    if (sendUserSocket) {
      console.log(`${data.msg} is received by ${data.to}`);
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
// socket.on('sendMessage', async (data) => {
//   // Save the message to the database
//   const newMessage = new MessageModel({
//     sender: data.senderId,
//     receiver: data.receiverId,
//     content: data.content
//   });
//   await newMessage.save();

//   // Emit to the specific user
//   io.to(data.receiverSocketId).emit('receiveMessage', newMessage);
// });

// Other Socket.IO event handlers...

const port = process.env.PORT || 9000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.set('strictQuery', false);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB is now connected!");
    // Starting server
    server.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

// images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the directory where your images are located
const imagesDirectory = path.join(__dirname, './uploads');

// Set up a route to serve images
app.use('/images', express.static(imagesDirectory));

// routes
app.use("/pharmacist", pharmacistRoutes);
app.use("/patient", patientRoutes);
app.use("/admin", adminRoutes);
app.use("/medicine", medicineRoutes);
app.use("/order", orderRoutes);
app.use("/chat", chatRoutes);
app.post("/login", Auth.login)

const PACKAGE_DOMAIN1 = 'http://localhost:3000/Checkout/';
const PACKAGE_DOMAIN2 = 'http://localhost:3000/creditOrderPlaced/';

app.post('/Checkout', async (req, res) => {
  const session = await stripeInstance.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price: 'price_1OAhcrFG7BNY2kzIxPQqkTZi', // Replace with the actual Price ID from your Stripe Dashboard
        quantity: 1
      },
    ],
    success_url: `${PACKAGE_DOMAIN2}`,
    cancel_url: `${PACKAGE_DOMAIN1}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));