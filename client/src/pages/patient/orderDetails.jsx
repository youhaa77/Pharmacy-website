import AppBar from "@mui/material/AppBar";
import "../../App.css";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import ResponsiveAppBar from "../../components/TopBar";
import Card from "@mui/material/Card";
import BottomBar from "../../components/BottomBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function orderDetails() {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id);

  useEffect(() => {
    const apiUrl = `http://localhost:9000/order/orderDetails/${id}`;

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data) {
          console.log(response.data); // Log the response to the console
          setOrder(response.data);
          console.log("order length:", response.data.length);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleHome = () => {
    navigate("/MyOrders");
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

        <div style={{ maxWidth: "80%", marginLeft: "10%", marginTop: "5%" }}>
          <Card>
            {order && (
              <div>
                <p>Status: {order.status}</p>
                <p>Payment Method: {order.paymentMethod}</p>
                <p>Delivery Address: {order.deliveryAddress}</p>
              </div>
            )}
            {order &&
              order.items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    height: "50px",
                    backgroundColor: "#e2e3e5", // Set the background color to green
                    color: "black", // Set the text color to white
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "10px",
                  }}
                  className="alert d-flex align-items-center"
                  role="alert"
                >
                  <div>{item.medicine.medicineName}</div>
                  <div>price: {item.medicine.price}</div>
                  <div>quantity: {item.quantity}</div>
                </div>
              ))}
            {order && (
              <div
                style={{
                  fontSize: "25px",
                  fontWeight: "500",
                  margin: "10px",
                }}
              >
                <p>Total: {order.total}</p>
              </div>
            )}
          </Card>
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
export default orderDetails;
