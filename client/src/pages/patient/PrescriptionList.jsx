import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import "../../App.css";
import ResponsiveAppBar from "../../components/TopBar";
import CircularProgress from "@mui/material/CircularProgress";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function PrescriptionsList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [filterMessage, setFilterMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = "http://localhost:9000/patient/getPerscriptions";
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
        setLoading(false);
        // Check if the filtered result is empty and set the message accordingly
        if (response.data.length === 0) {
          setFilterMessage("No prescriptions are available");
        } else {
          setFilterMessage("");
        }
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [refresh]);

  const handleBuy = async (prescriptionId) => {
    await axios
      .post(
        `http://localhost:8000/patient/payForPrescription/${prescriptionId}`,
        {}
      )
      .then((response) => {
        console.log(response);
        setRefresh(!refresh);
        navigate("/cart");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleView(id) {
    // Navigate to another route and pass the ID as a prop
    navigate(`/prescriptions/${id}`);
  }

  const listo = data.map((user, i) => {
    console.log(user);
    return (
      <div key={i} style={{ width: 400, display: "inline-flex" }}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Prescription number {i}</h5>
            <p className="card-text">
              Date: {new Date(user.date).toLocaleDateString("en-GB", {})}
            </p>
            <p className="card-text">Status: {user.status}</p>
            <div>
              <Tooltip title="View Details" placement="bottom">
                <IconButton onClick={() => handleView(user._id)}>
                  <VisibilityIcon></VisibilityIcon>
                </IconButton>
              </Tooltip>
              {user.status != "filled" && (
                <Tooltip title="buy" placement="bottom">
                  <IconButton onClick={() => handleBuy(user._id)} type="submit">
                    <ShoppingCartIcon></ShoppingCartIcon>
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
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
              My Prescriptions
            </h1>
          </div>
          <div className="card m-3 col-12" style={{ width: "80%", left: "8%" }}>
            <div className="card-body">
              {loading ? (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <CircularProgress color="success" />
                </div>
              ) : (
                <>
                  {data.length === 0 && filterMessage && (
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: "20px",
                        color: "red",
                      }}
                    >
                      <p>{filterMessage}</p>
                    </div>
                  )}

                  {data.length > 0 && !filterMessage && (
                    <div className="image">{listo}</div>
                  )}
                </>
              )}
            </div>
          </div>
        </AppBar>
      </div>
    </>
  );
}

export default PrescriptionsList;
