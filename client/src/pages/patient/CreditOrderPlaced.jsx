import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ResponsiveAppBar from "../../components/TopBar";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CreditOrderPlaced() {
  const navigate = useNavigate();
  const handlePlaceOrder = () => {
    axios
      .post(`http://localhost:9000/order/add`, {
        deliveryAddress: "Heliopolis",
        paymentMethod: "CreditCard",
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
    navigate("/orderPlaced");
  };
  return (
    <React.Fragment>
      <div style={{ marginRight: "-5%", marginLeft: "-5%" }}>
        <AppBar
          style={{
            height: "100%",
            backgroundColor: "#F0F0F0",
            overflowY: "auto",
          }}
        >
          <ResponsiveAppBar />
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <Typography component="h1" variant="h4" align="center">
                Payment Successful
              </Typography>
              <React.Fragment>
                <CheckCircleOutlineIcon
                  style={{ fontSize: "300px", color: "green" }}
                ></CheckCircleOutlineIcon>
              </React.Fragment>
              <Grid item xs={12}>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                </div>
              </Grid>
            </Paper>
          </Container>
        </AppBar>
      </div>
    </React.Fragment>
  );
}
