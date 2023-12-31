import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import PharmacistSignup from "./pages/auth/PharmacistSignup";
import PatientSignup from "./pages/auth/PatientSignup";
import Home from "./pages/Home";
import PharmacistsList from "./pages/admin/PharmacistsList";
import PatientsList from "./pages/admin/PatientsList";
import PharmacistDetails from "./pages/admin/PharmacistDetails";
import PatientDetails from "./pages/admin/PatientDetails";
import EditMedicine from "./pages/admin/EditMedicine";
import AddMedicine from "./pages/pharmacist/AddMedicine";
import MedicineSales from "./pages/pharmacist/MedicineSales";
import AddAdmin from "./pages/admin/AddAdmin";
import RemoveUser from "./pages/admin/RemoveUser";
import PharmacistsListPending from "./pages/admin/PharmacistsListPending";
import SalesReport from "./pages/admin/SalesReport";
import MedicinesListPharmacist from "./pages/pharmacist/MedicinesListPharmacist";
import MedicinesListPatient from "./pages/patient/MedicinesListPatient";
import HomePage from "./pages/patient/HomePage";
import MedicinesListAdmin from "./pages/admin/MedicinesListAdmin";
import Cart from "./pages/patient/cart";
import MyOrders from "./pages/patient/MyOrders";
import ListMedicine from "./pages/patient/Medicine";
import ListMedicinepharm from "./pages/pharmacist/MedicinePharm";
import HomePagePharm from "./pages/pharmacist/HomePagePharm";
import HomePageAdmin from "./pages/admin/HomePageAdmin";
import AddressForm from "./pages/patient/AddressForm";
import Checkout from "./pages/patient/Checkout";
import Pharmacistlogin from "./pages/auth/PharmacistLogin";
import Adminlogin from "./pages/auth/AdminLogin";
import Patientlogin from "./pages/auth/PatientLogin";
import PatientWallet from "./pages/patient/PatientWallet";
import OutOfStock from "./pages/patient/OutOfStock";
import PharmacistWallet from "./pages/pharmacist/PharmacistWallet";
import Forget from "./pages/auth/ForgetPassword";
import ChangePass from "./pages/patient/chnagePass";
import ChangePassPharm from "./pages/pharmacist/changePassPharm";
import ChangePassAdm from "./pages/admin/changePassAdm";
import OrderDetails from "./pages/patient/orderDetails";
import PrescriptionList from "./pages/patient/PrescriptionList";
// Chat patient 
import ChatPharmacist from "./pages/patient/ChatPharmacist";
import ChatChoice from "./pages/patient/ChatChoice";
import ChatDoctor from "./pages/patient/ChatDoctor";

// Chat pharmacist 
import ChatChoicePH from "./pages/pharmacist/ChatChoicePH";
import ChatDoctorPH from "./pages/pharmacist/ChatDoctorPH";
import ChatPatientPH from "./pages/pharmacist/ChatPatientPH";

import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import OrderPlaced from "./pages/patient/orderPlaced";
import CreditOrderPlaced from "./pages/patient/CreditOrderPlaced";
import PharmEditMedicine from "./pages/pharmacist/PharmEditMedicine";
import PrescriptionsDetails from "./pages/patient/PrescriptionDetails";
const socket = io.connect("http://localhost:9000");

axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
  sessionStorage.getItem("token")
)}`;

function App() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const [type, setData] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:9000/admin/getType");

        setData(result.data.type);
        setDataFetched(true);
        console.log(result.data.type);
      } catch (err) {
        console.log(err);
        setDataFetched(true);
      }
    };

    fetchData();
  }, [token]);

  if (!dataFetched) {
    return <p>Loading...</p>; // Render nothing until data is fetched
  }

  //enum: ['Pharmacist', 'Admin', 'Patient']
  if (type === "Patient") {
    return (
      <div>
        <Routes>
          <Route
            path="/medicinesListPatient"
            element={<MedicinesListPatient />}
          />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/myorders/:id" element={<OrderDetails />} />
          <Route path="/listMedicine" element={<ListMedicine />} />
          <Route path="/AddressForm" element={<AddressForm />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/ChatDoctor" element={<ChatDoctor />} />
          <Route path="/ChatPharmacist" element={<ChatPharmacist />} />
          <Route path="/ChatChoice" element={<ChatChoice />} />
          <Route path="/ForgetPassword" element={<Forget />} />
          <Route path="/ChangePassword" element={<ChangePass />} />
          <Route path="/PatientWallet" element={<PatientWallet />} />
          <Route path="/ForgetPassword" element={<Forget />} />
          <Route path="/PrescriptionList" element={<PrescriptionList />} />
          <Route path="/prescriptions/:id" element={<PrescriptionsDetails />} />
          <Route path="/OutOfStock" element={<OutOfStock />} />
          <Route path="/orderPlaced" element={<OrderPlaced />} />
          <Route path="/creditOrderPlaced" element={<CreditOrderPlaced />} />
        </Routes>
      </div>
    );
  } else if (type === "Pharmacist") {
    return (
      <div>
        <Routes>
          <Route path="/medicinesList/:id" element={<PharmEditMedicine />} />
          <Route path="/addMedicine" element={<AddMedicine />} />

          <Route path="/medicineSales" element={<MedicineSales />} />
          <Route
            path="/medicinesListPharmacist"
            element={<MedicinesListPharmacist />}
          />
          {/* <Route path="/listMedicinepharm" element={<ListMedicinepharm />} /> */}
          <Route path="/HomePagePharm" element={<HomePagePharm />} />
          <Route path="/ForgetPassword" element={<Forget />} />
          <Route path="/ChangePassword" element={<ChangePass />} />
          <Route path="/ChangePasswordPharm" element={<ChangePassPharm />} />
          <Route path="/PharmacistWallet" element={<PharmacistWallet />} />
          <Route path="/ChatChoicePH" element={<ChatChoicePH />} />
          <Route path="/ChatDoctorPH" element={<ChatDoctorPH />} />
          <Route path="/ChatPatientPH" element={<ChatPatientPH />} />
        </Routes>
      </div>
    );
  } else if (type === "Admin") {
    return (
      <div>
        <Routes>
          <Route path="/pharmacists" element={<PharmacistsList />} />
          <Route path="/patients" element={<PatientsList />} />
          <Route path="/pharmacists/:id" element={<PharmacistDetails />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
          <Route path="/medicinesList/:id" element={<EditMedicine />} />
          <Route path="/medicinesListAdmin" element={<MedicinesListAdmin />} />
          <Route path="/addAdmin" element={<AddAdmin />} />
          <Route path="/HomePageAdmin" element={<AddAdmin />} />
          <Route path="/removeUser" element={<RemoveUser />} />
          <Route path="/salesreport" element={<SalesReport />} />
          <Route
            path="/pharmacistsListPending"
            element={<PharmacistsListPending />}
          />
          <Route path="/ForgetPassword" element={<Forget />} />
          <Route path="/ChangePassword" element={<ChangePass />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div>
        <Routes>
          <Route path="/registerPharmacist" element={<PharmacistSignup />} />
          <Route path="/registerPatient" element={<PatientSignup />} />{" "}
          <Route path="/" element={<Home />} />
          <Route path="/PatientLogin" element={<Patientlogin />} />
          <Route path="/Login" element={<Pharmacistlogin />} />
          <Route path="/AdminLogin" element={<Adminlogin />} />
          <Route path="/ForgetPassword" element={<Forget />} />
          <Route path="/ChangePassword" element={<ChangePass />} />
          <Route path="/ChangePasswordPharm" element={<ChangePassPharm />} />
          <Route path="/:any" element={<Home />} />
        </Routes>
      </div>
    );
  }
}

export default App;
