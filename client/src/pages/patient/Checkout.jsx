import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import ResponsiveAppBar from "../../components/TopBar";
import BottomBar from "../../components/BottomBar";

export default function Checkout() {
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
                Checkout
              </Typography>
              <React.Fragment>
                <AddressForm />
              </React.Fragment>
            </Paper>
          </Container>
          <BottomBar />
        </AppBar>
      </div>
    </React.Fragment>
  );
}
