import { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import "../../App.css";
import { useParams } from "react-router-dom";
import ResponsiveAppBar from "../../components/TopBar";
import { useNavigate } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { IconButton, Tooltip } from "@mui/material";
function PrescriptionsDetails() {
  const [prescription, setPrescription] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/patient/getPerscription/${id}`)
      .then((response) => {
        if (response.data) {
          setPrescription(response.data);
        }
      })
      .catch((error) => {
        console.error("Failed to prescription:", error);
      });
  }, []);

  const handleBack = () => {
    navigate("/PrescriptionList");
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
            backgroundColor: " rgb(65, 105, 225)",
            borderRadius: "50px",
            margin: "10px",
            width: "40%",
            marginLeft: "30%",
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
            Prescription Details
          </h1>
        </div>
        <div
          className="card m-3 col-12"
          style={{ width: "80%", borderRadius: "20px", left: "8%" }}
        >
          {prescription &&
            prescription.medicine &&
            prescription.medicine.length > 0 &&
            prescription.medicine.map((medicine) => (
              <div
                key={medicine}
                style={{
                  height: "50px",
                  backgroundColor: "#e2e3e5", // Set the background color to green
                  color: "black", // Set the text color to white
                  display: "flex",
                  justifyContent: "space-between",
                }}
                className="alert d-flex align-items-center"
                role="alert"
              >
                <div>{medicine.name}</div>
                <div>dose: {medicine.dose}</div>
                <div>{medicine.notes}</div>
              </div>
            ))}
        </div>
        <button
          className="btn btn-primary rounded-2"
          style={{
            position: "absolute",
            bottom: "1%",
            right: "5%",
            width: "5%",
            height: "40px",
          }}
          onClick={handleBack}
        >
          Back
        </button>
      </AppBar>
    </div>
  );
}

export default PrescriptionsDetails;
