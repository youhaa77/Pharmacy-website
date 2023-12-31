import { useState } from "react";
import "../../App.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";
import { config } from "../../config/config";

function card(props) {
  console.log(props);
  const [quantity, setQuantity] = useState(props.quantity);
  const [totalPrice, setTotalPrice] = useState(props.price * props.quantity);
  const handleIncrementCard = async () => {
    try {
      if (!props.medicineId) {
        console.error("Medicine or its ID is undefined.");
        return;
      }

      const response = await axios.put(
        `http://localhost:9000/patient/incMed`,
        { medicineId: props.medicineId, quantity: quantity + 1 }
      );

      if (response.data) {
        setQuantity((prevQuantity) => prevQuantity + 1);
        updateTotalPrice(quantity + 1);
      }
    } catch (error) {
      console.error("Error incrementing medicine:", error);
    }
  };

  const handleDecrementCard = async () => {
    try {
      if (!props.medicineId) {
        console.error("Medicine or its ID is undefined.");
        return;
      }

      const response = await axios.put(
        `http://localhost:9000/patient/65212c32f90a57e39e26a1c2/decMed`,
        { medicineId: props.medicineId, quantity: quantity - 1 }
      );

      if (response.data) {
        setQuantity((prevQuantity) => prevQuantity - 1);
        updateTotalPrice(quantity - 1);
      }
    } catch (error) {
      console.error("Error decrementing medicine:", error);
    }
  };
  const handleRemoveCard = async () => {
    try {
      if (!props.medicineId) {
        console.error("Medicine or its ID is undefined.");
        return;
      }

      const response = await axios.delete(
        `http://localhost:9000/patient/65212c32f90a57e39e26a1c2/removeFromCart`,
        { data: { medicineId: props.medicineId } }
      );

      if (response.data) {
        // Update state to remove the item from the cartItems array
        props.setCartItems((prevItems) =>
          prevItems.filter((item) => item.medicine._id !== props.medicineId)
        );
      }
    } catch (error) {
      console.error("Error decrementing medicine:", error);
    }
  };
  const updateTotalPrice = (newQuantity) => {
    const newTotalPrice = props.price * newQuantity;
    setTotalPrice(newTotalPrice);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: "30px" }}>
      <img
        style={{ height: 200, width: 200 }}
        src={config.STORAGE_URL + props.image}
        className="card-img-top"
      />
      <Button
        style={{ left: "12%", marginBottom: '45%' }}
        size="large"
        onClick={handleRemoveCard}
      >
        <HighlightOffIcon />
      </Button>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.info}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleIncrementCard}>
          Add <AddCircleIcon />
        </Button>
        <Button size="small" onClick={handleDecrementCard}>
          Remove <RemoveCircleIcon />
        </Button>
        <Typography
          style={{ marginLeft: "10px" }}
          variant="body2"
          color="text.secondary"
        >
          Price: {props.price} x {quantity} = {totalPrice}
        </Typography>
      </CardActions>
    </Card>
  );
}
export default card;
