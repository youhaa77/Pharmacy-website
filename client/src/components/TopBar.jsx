import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import ShoppingBasketSharpIcon from "@mui/icons-material/ShoppingBasketSharp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";
import WalletIcon from "@mui/icons-material/Wallet";
const pages = ["Home", "Medicine", "My Cart", "My Orders"];

function ResponsiveAppBar() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const logOut = (event) => {
    sessionStorage.removeItem("token");
    window.location.pathname = "/";
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCart = () => {
    navigate("/cart");
  };
  const Change = () => {
    window.location.pathname = "/ChangePassword";
  };
  const handleHome = () => {
    navigate("/HomePage");
  };
  const handleMyWallet = () => {
    navigate("/PatientWallet");
  };
  const handleMedicine = () => {
    navigate("/ListMedicine");
  };
  const handleOrders = () => {
    navigate("/MyOrders");
  };
  const handlePrescription = () => {
    navigate("/PrescriptionList");
  };
  const handleOutOfStock = () => {
    navigate("/OutOfStock");
  };
  const handleCloseNavMenu = () => {
    //   navigate("/cart");
    setAnchorElNav();
  };
  const handleChatNavigate = () => {
    navigate("/ChatChoice");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar style={{ backgroundColor: "rgb(65, 105, 225)" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <VaccinesIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/HomePage"
            sx={{
              mr: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 1000,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            El7a2ny
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleMedicine}
              sx={{
                color: "white",
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Medicine
            </Button>
            <Button
              onClick={handleOrders}
              sx={{
                color: "white",
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Orders
            </Button>
            <Button
              onClick={handlePrescription}
              sx={{
                color: "white",
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Prescriptions
            </Button>
            <Button
              onClick={handleOutOfStock}
              sx={{
                color: "white",
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Medecines OutOfStock
            </Button>
            <Button
              onClick={Change}
              sx={{
                color: "white",
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Change Password
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title=" Chat">
              <IconButton onClick={handleChatNavigate}>
                <ChatIcon fontSize="large" sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="My Wallet">
              <IconButton style={{}} onClick={handleMyWallet}>
                <WalletIcon fontSize="large" sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open Your Shopping Cart">
              <IconButton onClick={handleCart}>
                <ShoppingBasketSharpIcon
                  fontSize="large"
                  sx={{ color: "white" }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton onClick={logOut}>
                <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
