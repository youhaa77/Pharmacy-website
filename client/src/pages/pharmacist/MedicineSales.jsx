import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import ResponsiveAppBar from "../../components/TopBarPharm";
import BottomBar from "../../components/BottomBar";
import { useNavigate } from "react-router-dom";

function MedicineSales() {
  const navigate = useNavigate();

  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const apiUrl = "http://localhost:9000/medicine/medicineDetails";
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("Data received:", response.data);
        setOriginalData(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    console.log("Selected Month State:", selectedMonth);
    if (selectedMonth) {
      console.log("dcdcd");
      const apiUrl = `http://localhost:9000/pharmacist/sales/${selectedMonth}`;
      axios
        .get(apiUrl)
        .then((response) => {
          console.log("Data received:", response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching pharmacist sales:", error);
        });
    } else {
      fetchData();
    }
  }, [selectedMonth]);

  const handleSearch = (value) => {
    setSearch(value);
    if (value === "") {
      // If the search value is empty, use the original data
      setData(originalData);
    } else {
      // If there is a search value, filter the data
      setData((prevData) =>
        prevData.filter((item) =>
          item.medicineName.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };
  const fetchData = async () => {
    try {
      const apiUrl = "http://localhost:9000/medicine/medicineDetails";
      const response = await axios.get(apiUrl);
      console.log("Data received:", response.data);
      setOriginalData(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (selectedDate === "") {
      fetchData();
    } else {
      const apiUrl = `http://localhost:9000/pharmacist/salesdate/${selectedDate}`;
      axios
        .get(apiUrl)
        .then((response) => {
          console.log("Data received for date:", response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching pharmacist sales for date:", error);
        });
    }
  }, [selectedDate]);
  const handleHome = () => {
    navigate("/HomePagePharm");
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
            <PaidIcon
              fontSize="large"
              sx={{ color: "white", marginRight: "20px" }}
            />
            Sales Report{" "}
          </h1>
        </div>

        <div
          className="card m-3 col-12"
          style={{ width: "80%", borderRadius: "50px", left: "9%" }}
        >
          <Form>
            <InputGroup className="my-3" style={{ width: "80%" }}>
              <Form.Control
                style={{ color: "black", backgroundColor: "white" }}
                sx={{
                  marginLeft: "-10%",
                  width: 500,
                  maxWidth: "100%",
                  borderRadius: "100px",
                  borderColor: "rgba(0, 140, 990, 0.1)",
                }}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search medicine"
              />
            </InputGroup>
          </Form>
          <Form>
            <InputGroup className="my-3" style={{ width: "80%" }}>
              <Form.Control
                style={{ color: "black", backgroundColor: "white" }}
                sx={{
                  marginLeft: "-10%",
                  width: 500,
                  maxWidth: "100%",
                  borderRadius: "100px",
                  borderColor: "rgba(0, 140, 990, 0.1)",
                }}
                onChange={(e) => {
                  const monthValue = parseInt(e.target.value);
                  setSelectedMonth(monthValue);
                }}
                placeholder="Search by month"
              />
            </InputGroup>
          </Form>
          <Form>
            <InputGroup className="my-3" style={{ width: "80%" }}>
              <Form.Control
                type="date"
                style={{ color: "black", backgroundColor: "white" }}
                sx={{
                  marginLeft: "-10%",
                  width: 500,
                  maxWidth: "100%",
                  borderRadius: "100px",
                  borderColor: "rgba(0, 140, 990, 0.1)",
                }}
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  setSelectedDate(selectedDate);
                }}
              />
            </InputGroup>
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Quantity</th>
                <th>TotalSales</th>
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
                    <td>{item.quantity}</td>
                    <td>{item.totalSales}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
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
        <BottomBar />
      </AppBar>
    </div>
  );
}

export default MedicineSales;
