import AppBar from "@mui/material/AppBar";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../../components/TopBarAdmin";
import BottomBar from "../../components/BottomBar";

function PharmacistsList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = "http://localhost:9000/pharmacist";
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

  function handleView(id) {
    // Navigate to another route and pass the ID as a prop
    navigate(`/pharmacists/${id}`);
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
            Pharmacist List
          </h1>
        </div>
        <div
          className="card m-3 col-12"
          style={{ width: "80%", left: "8%", borderRadius: "20px" }}
        >
          <div className="card-body">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => handleView(item._id)}
                        >
                          view
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <BottomBar />
      </AppBar>
    </div>
  );
}

export default PharmacistsList;
