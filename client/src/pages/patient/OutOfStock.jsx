import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import ResponsiveAppBar from "../../components/TopBar";
import BottomBar from "../../components/BottomBar";
function MedecineOutOfStock() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiUrl = `http://localhost:9000/patient/outofstock`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("Data received:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      });
  }, []);

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
            width: "40%",
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
            <PaidIcon
              fontSize="large"
              sx={{ color: "white", marginRight: "20px" }}
            />
            Medecines Out Of Stock{" "}
          </h1>
        </div>

        <div
          className="card m-3 col-12"
          style={{ width: "80%", borderRadius: "50px", left: "9%" }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Medicine Out Of Stock</th>
                <th>The Alternative Medicines</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.medicineWithZeroQuantity}</td>
                  <td>{item.medicinesWithSameIngredient.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <BottomBar />
      </AppBar>
    </div>
  );
}

export default MedecineOutOfStock;
