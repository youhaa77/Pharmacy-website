import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { config } from "../config/config";
import axios from "axios";
function MedicineCard(props) {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const checkIfMedicineIsAdded = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/patient/checkIfMedicineIsAdded/${props.medicineId}`
        );

        if (response.data) {
          setIsAdded(response.data.isAdded);
        }
      } catch (error) {
        console.error("Error checking if medicine is added:", error);
      }
    };
    checkIfMedicineIsAdded();
  }, [props.medicineId]);

  const handleAddCard = async () => {
    try {
      if (!props.medicineId || isAdded) {
        console.log("Invalid medicineId or already added.");
        return;
      }

      console.log("Making request to add to cart...");

      const response = await axios.post(
        `http://localhost:9000/patient/addToCart`,
        { medicineId: props.medicineId }
      );

      console.log("Response from addToCart:", response.data);

      if (response.data) {
        setIsAdded(true);
      }
    } catch (error) {
      console.error("Error adding medicine to cart:", error);
    }
  };

  return (
    <Card sx={{ margin: "30px" }} style={{ height: "500px", width: "270px" }}>
      <img style={{ margin: "10px" }} src={props.image} alt="" />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <img
          style={{ height: 200, width: 200 }}
          src={config.STORAGE_URL + props.image}
          className="card-img-top"
        />
        <Typography variant="body2" color="text.secondary">
          {props.info}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.medicinalUse}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary">
          quantity:{props.quantity}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary">
          price: {props.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography
          style={{ marginRight: "", marginBottom: "5px", fontSize: "18px" }}
          variant="body2"
          color="text.primary"
        >
          Price: {props.price}
        </Typography>
        {props.requiresPrescription && (
          <Typography
            style={{ marginLeft: "40%", fontSize: "14px", color: "red" }}
            variant="body2"
            color="text.primary"
          >
            requires Prescription
          </Typography>
        )}
        {!props.requiresPrescription && (
          <Button
            style={{ marginLeft: "50%" }}
            size="small"
            onClick={handleAddCard}
            disabled={isAdded}
          >
            {" "}
            Add <AddCircleIcon />
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

MedicineCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  info: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  medicineId: PropTypes.string,
  setMedicine: PropTypes.func,
  requiresPrescription: PropTypes.bool,
  medicinalUse: PropTypes.string,
};
export default MedicineCard;
