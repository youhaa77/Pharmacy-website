import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import "../../App.css";
import ResponsiveAppBar from "../../components/TopBarAdmin";
import BottomBar from "../../components/BottomBar";
import { useNavigate } from "react-router-dom";
function PatientDetails() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const apiUrl = "http://localhost:9000/patient/getOnePatient/" + id;
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  const handleBack = () => {
    navigate("/patients");
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
          style={{
            backgroundColor: "rgb(65, 105, 225)",
            borderRadius: "50px",
            margin: "10px",
            width: "30%",
            marginLeft: "35%",
          }}
        >
          <h1
            style={{
              font: "Arial",
              fontWeight: "bold",
              color: "white",
              margin: "10px",
            }}
          >
            Patient Details
          </h1>
        </div>
        <div
          className="card-body"
          style={{
            backgroundColor: "white",
            color: "black",
            borderRadius: "20px",
            width: "40%",
            border: "solid black",
            marginLeft: "30%",
            marginTop: "3%",
          }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              <li>name: {data.name}</li>
              <li>email: {data.email}</li>
              <li>birthDate: {data.birthDate}</li>
              <li>gender: {data.gender}</li>
              <li>phone: {data.phone}</li>
              <li>emergencyName: {data.emergencyName}</li>
              <li>emergencyNo: {data.emergencyNo}</li>
              <li>emergencyRel: {data.emergencyRel}</li>
              <li>status: {data.status}</li>
            </ul>
          )}
        </div>
        <button className="btn btn-primary rounded-2"
              style={{
                position: 'absolute',
                bottom: '1%',
                right: '5%',
                width: '5%',
                height: '40px',
                
              }}
              onClick={handleBack}
             
            >
              Back
            </button>
        <BottomBar />
      </AppBar>
    </div>
  );
}

export default PatientDetails;
