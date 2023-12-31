import "../../App.css";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";

/////
import { useState } from "react";
import "../../App.css";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { config } from "../../config/config";

function order(props) {
  const navigate = useNavigate();
  const handleRemoveOrder = async () => {
    try {
      if (!props.orderId) {
        console.error("order or its ID is undefined.");
        return;
      }
      const response = await axios.put(`http://localhost:9000/order/cancel`, {
        orderId: props.orderId,
      });
      window.location.reload(true);
    } catch (error) {
      console.error("Error decrementing medicine:", error);
    }
  };

  function handleDetails(id) {
    // Navigate to another route and pass the ID as a prop
    navigate(`/myorders/${props.orderId}`);
  }

  return (
    <div>
      <Card
        sx={{
          maxWidth: "80%",
          margin: "30px",
          display: "grid",
          marginLeft: "10%",
          borderRadius: "50px",
        }}
      >
        <CardContent>
          <Tooltip title="Remove Order">
            <IconButton
              style={{ marginLeft: "95%" }}
              onClick={handleRemoveOrder}
              sx={{ p: 0 }}
            >
              <RemoveCircleIcon fontSize="large" sx={{ color: "Red" }} />
            </IconButton>
          </Tooltip>

          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ fontWeight: "bold" }}
          >
            Order ID: {props.orderId}{" "}
          </Typography>
          <Typography
            variant="h6"
            color="text.primary"
            style={{ margin: "1%" }}
          >
            Delivery Address: {props.deliveryAddress}
          </Typography>
          <Typography
            variant="h6"
            color="text.primary"
            style={{ margin: "1%" }}
          >
            Payment Method: {props.paymentMethod}
          </Typography>
          <Typography
            variant="h6"
            color="text.primary"
            style={{ margin: "1%" }}
          >
            Status: {props.status}
          </Typography>
          <Typography
            variant="h6"
            color="text.primary"
            style={{ margin: "1%" }}
          >
            Total: {props.total}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            style={{
              marginLeft: "43.5%",
              backgroundColor: "DarkGreen",
              width: "150px",
              height: "40px",
              marginBottom: "30px",
            }}
            variant="contained"
            onClick={handleDetails}
          >
            {" "}
            View Details
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
export default order;
