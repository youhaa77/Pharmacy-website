import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import VaccinesIcon from "@mui/icons-material/Vaccines";

function ResponsiveAppBar() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleHome = () => {
    navigate("/HomePageAdmin");
  };
  const handleAddAdmin = () => {
    navigate("/addAdmin");
  };
  const handleSalesReport = () => {
    navigate("/salesreport");
  };
  const handleRemoveUser = () => {
    navigate("/removeUser");
  };
  const handleMedList = () => {
    navigate("/medicinesListAdmin");
  };
  const handlePharmList = () => {
    navigate("/pharmacists");
  };
  const handlePatList = () => {
    navigate("/patients");
  };
  const handlePharmPend = () => {
    navigate("/pharmacistsListPending");
  };
  const handleCloseNavMenu = () => {
    //   navigate("/cart");
    setAnchorElNav();
  };
  const logOut = (event) => {
    sessionStorage.removeItem("token");
    window.location.pathname = "/";
  };
  const Change = () => {
    window.location.pathname = "/ChangePassAdm";
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleChangePassword = () => {
    navigate("/ChangePassAdm");
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
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            El7a2ny
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handlePatList}
              sx={{
                color: "white",
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Patients
            </Button>
            <Button
              onClick={handlePharmList}
              sx={{
                color: "white",
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Pharmacist
            </Button>
            <Button
              onClick={handleMedList}
              sx={{
                color: "white",
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Medicines
            </Button>
            <Button
              onClick={handlePharmPend}
              sx={{
                color: "white",
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Pending Pharmacist
            </Button>
            <Button
              onClick={handleRemoveUser}
              sx={{
                color: "white",
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              {" "}
              Remove User{" "}
            </Button>
            <Button
              onClick={handleAddAdmin}
              sx={{
                color: "white",
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              {" "}
              Add Admin{" "}
            </Button>
            <Button
              onClick={handleSalesReport}
              sx={{
                color: "white",
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              {" "}
              Sales Report{" "}
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
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
