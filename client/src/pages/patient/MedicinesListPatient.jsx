import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { config } from "../../config/config";

function MedicinesListPatient() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [medicinalUse, setMedicinalUse] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(medicinalUse);
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

  return (
    <div className="d-flex justify-content-center align-itelms-center vh-100 bg-light">
      <div className="card m-3 col-12" style={{ width: "80%" }}>
        <h1 className="text-center mt-4">List of Medicines</h1>
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
              <option value="diarrhea">diarrhea</option>
              <option value="vomit">vomit</option>
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
                      src={config.STORAGE_URL + item.image}
                      alt="Medicine Image"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default MedicinesListPatient;
