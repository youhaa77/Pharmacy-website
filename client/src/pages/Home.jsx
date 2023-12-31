import AppBar from "@mui/material/AppBar";
import "../App.css";
import Button1 from "react-bootstrap/Button";
import Card1 from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../components/TopBarHome";
import BottomBar from "../components/BottomBar";

import img1 from "../pictures/admin.png";
import img2 from "../pictures/pharm.png";
import img3 from "../pictures/pat.png";
import img4 from "../pictures/docsign.jpeg";
import img5 from "../pictures/pharmsign.png";

function Home() {
  const navigate = useNavigate();
  const handlePharmacistSignup = () => {
    navigate("/registerPharmacist");
  };
  const handlePatientSignup = () => {
    navigate("/registerPatient");
  };
  const handlePatientLogin = () => {
    navigate("/PatientLogin");
  };
  const handlePharmacistLogin = () => {
    navigate("/Login");
  };
  const handleAdminLogin = () => {
    navigate("/Adminlogin");
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card1 style={{ width: "18rem", margin: "20px" }}>
              <Card1.Img variant="top" src={img2} alt="family.png" />
              <Card1.Body>
                <Card1.Title style={{}}>Pharmacy Login</Card1.Title>

                <Button1
                  variant="primary"
                  style={{}}
                  onClick={handlePharmacistLogin}
                >
                  Login
                </Button1>
              </Card1.Body>
            </Card1>
            <Card1 style={{ width: "18rem", margin: "20px" }}>
              <Card1.Img variant="top" src={img4} alt="health package.png" />
              <Card1.Body>
                <Card1.Title>Patient SignUp</Card1.Title>

                <Button1 variant="primary" onClick={handlePatientSignup}>
                  Sign Up
                </Button1>
              </Card1.Body>
            </Card1>
            <Card1 style={{ width: "18rem", margin: "20px" }}>
              <Card1.Img variant="top" src={img5} alt="family.png" />
              <Card1.Body>
                <Card1.Title>Pharmacist SignUp</Card1.Title>

                <Button1 variant="primary" onClick={handlePharmacistSignup}>
                  Sign Up
                </Button1>
              </Card1.Body>
            </Card1>
          </div>
        </div>
        <BottomBar />
      </AppBar>
    </div>
  );
}

export default Home;
