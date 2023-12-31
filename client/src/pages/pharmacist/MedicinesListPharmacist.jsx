import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { config } from "../../config/config";
import { AppBar, colors } from "@mui/material";
import ResponsiveAppBar from "../../components/TopBarPharm";
import Button from "@mui/material/Button";
import { medicinalUses } from "../../config/constants";

function MedicinesListPharmacist() {
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

  function handleEdit(id) {
    // Navigate to another route and pass the ID as a prop
    navigate(`/medicinesList/${id}`);
  }

  const handleArchiveB = async (medicineId) => {
    try {
      if (!medicineId) {
        console.error("Medicine or its ID is undefined.");
        return;
      }

      const response = await axios.post(
        "http://localhost:9000/medicine/updateArchiveStatus",
        {
          medicineId: medicineId,
          archivedStatus: "Archived",
        }
      );
      // navigate("/MedicinesListPharmacist");

      if (response.data) {
        let index = data.findIndex(item => item._id == response.data._id);
        data[index] = response.data;
        setData([...data]);
      }
    } catch (error) {
      console.error("Error Archive ", error);
    }
  };

  const handbleUnarchiveB = async (medicineId) => {
    try {
      if (!medicineId) {
        console.error("Medicine or its ID is undefined.");
        return;
      }

      const response = await axios.post(
        "http://localhost:9000/medicine/updateArchiveStatus",
        {
          medicineId: medicineId,
          archivedStatus: "Unarchived",
        }
      );

      if (response.data) {
        let index = data.findIndex(item => item._id == response.data._id);
        data[index] = response.data;
        setData([...data]);
      }
    } catch (error) {
      console.error("Error Archive ", error);
    }
  };

  const handleHome = () => {
    navigate("/HomePagePharm");
  };

  return (
    <div className="d-flex justify-content-center align-itelms-center vh-100 bg-light">
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
          style={{ width: "80%", borderRadius: "50px", left: "9%" }}
        >
          <div>
            <h1 className="text-center mt-4">List of Medicines</h1>
          </div>
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

                <th>Status</th>
                <th>Image</th>
                <th></th>
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
                    <td>{item.archiveStatus}</td>

                    <td>
                      <img
                        style={{ height: 200, width: 200 }}
                        src={config.STORAGE_URL + item.image}
                        alt="Medicine Image"
                      />
                    </td>
                    <td>
                      <button
                        style={{ margin: "5%" }} className="btn btn-primary rounded-2"
                        onClick={() => handleEdit(item._id)}
                      >
                        Edit
                      </button>
                      <button
                        style={{ margin: "5%" }}
                        className="btn btn-primary rounded-2"
                        onClick={() => handleArchiveB(item._id)}
                      >
                        Archive
                      </button>
                      <button
                        style={{ margin: "5%" }}
                        className="btn btn-primary rounded-2"
                        onClick={() => handbleUnarchiveB(item._id)}
                      >
                        Unarchive
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>

          <button
            className="btn btn-primary rounded-2"
            style={{
              position: "fixed",
              bottom: "5%",
              right: "5%",
              width: "5%",
              height: "40px",
            }}
            onClick={handleHome}
          >
            Back
          </button>
        </div>
      </AppBar>
    </div>
  );
}

export default MedicinesListPharmacist;
