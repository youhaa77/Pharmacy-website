import AppBar from "@mui/material/AppBar";
import "../../App.css";
import ResponsiveAppBar from "../../components/TopBar";
import MedicineCard from "../../components/MedicineCard";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { medicinalUses } from "../../config/constants";

function listMedicine() {
  const [medicine, setMedicine] = useState([]);
  const [search, setSearch] = useState("");
  const [medicinalUse, setMedicinalUse] = useState("");

  useEffect(() => {
    console.log(medicinalUse);
    const apiUrl = `http://localhost:9000/medicine/filter?medicinalUse=${medicinalUse}`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("Data received:", response.data);
        setMedicine(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [medicinalUse]);
  useEffect(() => {
    const apiUrl = `http://localhost:9000/medicine/listMedicines`;

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data) {
          console.log(response.data); // Log the response to the console
          setMedicine(response.data);
          console.log("Medicine length:", response.data.length);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
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
          <div
            style={{
              backgroundColor: "",
              display: "flex",
              flexWrap: "wrap",
              width: "90%",
              margin: "0px auto",
            }}
          >
            {medicine
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.medicineName.toLowerCase().includes(search.toLowerCase());
              })
              .map((item) => (
                <MedicineCard
                  key={item._id}
                  name={item.medicineName}
                  image={item.image} // Assuming your backend sends the image URL
                  info={item.description}
                  quantity={item.quantity}
                  price={item.price}
                  medicineId={item._id}
                  setMedicine={setMedicine}
                  requiresPrescription={item.requiresPrescription}
                  medicinalUse={item.medicinalUse}
                />
              ))}
          </div>
        </div>
      </AppBar>
    </div>
  );
}
export default listMedicine;
