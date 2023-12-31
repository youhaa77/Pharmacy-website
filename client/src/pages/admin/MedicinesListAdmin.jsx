import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { config } from "../../config/config";
import AppBar from "@mui/material/AppBar";
import "../../App.css";
import ResponsiveAppBar from "../../components/TopBarAdmin";
import BottomBar from "../../components/BottomBar";
import { medicinalUses } from "../../config/constants";

function MedicinesListAdmin() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [medicinalUse, setMedicinalUse] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = `http://localhost:9000/medicine/filter?medicinalUse=${medicinalUse}`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("Data received:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [medicinalUse]);

  useEffect(() => {
    const apiUrl = "http://localhost:9000/medicine/listMedicines";
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("Data received:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function handleEdit(id) {
    // Navigate to another route and pass the ID as a prop
    navigate(`/medicinesList/${id}`);
  }

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
            Medicine List
          </h1>
        </div>
        <div
          className="card m-3 col-12"
          style={{ width: "80%", left: "8%", borderRadius: "20px" }}
        >
          <Form>
            <InputGroup className="my-3">
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Medicines"
              />
            </InputGroup>
            <InputGroup className="my-3">
              <select
                className="form-select"
                onChange={(e) => setMedicinalUse(e.target.value)}
              >
                <option value="">Choose Medicinal Use</option>
                {medicinalUses.map((use) => (
                  <option key={use} value={use}>
                    {use}
                  </option>
                ))}
              </select>
            </InputGroup>
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Ingredients</th>
                <th>Description</th>
                <th>Status</th>
                <th>Use</th>
                <th>Quantity</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.medicineName.toLowerCase().includes(search.toLowerCase());
                })
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.medicineName}</td>
                    <td>{item.price}</td>
                    <td>{item.ingredients}</td>
                    <td>{item.description}</td>
                    <td>{item.medicineStatus}</td>
                    <td>{item.medicinalUse}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <img
                        style={{ height: 200, width: 200 }}
                        src={config.STORAGE_URL + item.image}
                        alt="Medicine Image"
                      />
                    </td>
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

export default MedicinesListAdmin;
