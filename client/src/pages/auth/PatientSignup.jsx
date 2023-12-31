import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import "../../App.css";
import ResponsiveAppBar from "../../components/TopBarHome";
import BottomBar from "../../components/BottomBar";

function PatientSignup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [birthDate, setBrithDate] = useState();
  const [gender, setGender] = useState();
  const [phone, setPhone] = useState();
  const [emergencyName, setEmergencyName] = useState();
  const [emergencyNo, setEmergencyNo] = useState();
  const [emergencyRel, setEmergencyRel] = useState();
  const [adresses, setAdresses] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(email);
    axios
      .post("http://localhost:9000/patient", {
        name,
        username,
        email,
        password,
        birthDate,
        gender,
        type: "Patient",
        phone,
        emergencyName,
        emergencyNo,
        emergencyRel,
        adresses,
      })
      .then((result) => {
        console.log(result);
        navigate("/HomePage");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ marginRight: "-5%", marginLeft: "-5%" }}>
      <AppBar
        style={{
          height: "100%",
          backgroundColor: "#F0F0F0",
          overflowY: "auto",
        }}
      >
        <ResponsiveAppBar />
        <div
          className="card m-3 col-12"
          style={{
            width: "80%",
            borderRadius: "20px",
            left: "8%",
            display: "flex",
          }}
        >
          <h2>Patient Register</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Username</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                autoComplete="off"
                name="username"
                className="form-control rounded-0"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="email"
                className="form-control rounded-0"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="form-control rounded-0"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                <strong>Birth Date</strong>
              </label>
              <input
                type="Date"
                placeholder="Enter Birth Date"
                autoComplete="off"
                name="birthDate"
                className="form-control rounded-0"
                onChange={(e) => setBrithDate(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                <strong>Gender</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Gender"
                autoComplete="off"
                name="gender"
                className="form-control rounded-0"
                onChange={(e) => setGender(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                <strong>Phone Number</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Phone Number"
                autoComplete="off"
                name="phone"
                className="form-control rounded-0"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Emergency Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Emergency Name"
                autoComplete="off"
                name="emergencyName"
                className="form-control rounded-0"
                onChange={(e) => setEmergencyName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                <strong>Emergency Phone Number</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Emergency Phone Number"
                autoComplete="off"
                name="emergencyNo"
                className="form-control rounded-0"
                onChange={(e) => setEmergencyNo(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                <strong>Emergency Relation</strong>
              </label>
              <input
                type="text"
                placeholder="EnterEmergency Relation"
                autoComplete="off"
                name="emergencyRel"
                className="form-control rounded-0"
                onChange={(e) => setEmergencyRel(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                <strong> Address</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Address"
                autoComplete="off"
                name="address"
                className="form-control rounded-0"
                onChange={(e) => setAdresses(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Register
            </button>
          </form>
          <br />
          <Link
            to="/"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration"
          >
            Login
          </Link>
        </div>
        <BottomBar />
      </AppBar>
    </div>
  );
}

export default PatientSignup;
