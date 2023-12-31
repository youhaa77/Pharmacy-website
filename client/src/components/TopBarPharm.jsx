import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import axios from "axios";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { config } from "../config/config";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WalletIcon from "@mui/icons-material/Wallet";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CircularProgress from "@mui/material/CircularProgress";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useEffect, useState } from "react";
import VaccinesIcon from "@mui/icons-material/Vaccines";

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [unseenNotifications, setunseenNotifications] = useState();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [popoverAnchorEl, setPopoverAnchorEl] = React.useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [notfications, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:9000/pharmacist/getNotfication")
      .then((response) => {
        var num = 0;
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].state === "Unread") {
            num++;
          }
        }
        setunseenNotifications(num);
        setData(response.data.reverse());
        setDataFetched(true);
      })
      .catch((error) => {
        console.log(error);
        setDataFetched(true);
      });
  }, []);

  const handleOpenPopover = (event) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    console.log("9999");
    axios
      .get("http://localhost:9000/pharmacist/sawNotfication")
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
    console.log("out");
    setPopoverAnchorEl(null);
  };

  const openPopover = Boolean(popoverAnchorEl);

  const logOut = (event) => {
    sessionStorage.removeItem("token");
    window.location.pathname = "/";
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handelSales = () => {
    navigate("/MedicineSales");
  };
  const Change = () => {
    window.location.pathname = "/ChangePasswordPharm";
  };
  const handleHome = () => {
    navigate("/HomePagePharm");
  };
  const handleMyWallet = () => {
    navigate("/PharmacistWallet");
  };
  const handleMedicine = () => {
    navigate("/medicinesListPharmacist");
  };
  const handleAddMed = () => {
    navigate("/AddMedicine");
  };
  const handleCloseNavMenu = () => {
    //   navigate("/cart");
    setAnchorElNav();
  };

  const handleChatNavigate = () => {
    navigate("/ChatChoicePH");
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
            href="/HomePagePharm"
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
              {" "}
              Medicines{" "}
            </Button>
            <Button
              onClick={handleAddMed}
              sx={{
                color: "white",
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              {" "}
              Add Medicine{" "}
            </Button>
            <Button
              onClick={handelSales}
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
            <Button
              onClick={Change}
              sx={{
                color: "white",
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              {" "}
              Change Password
            </Button>
          </Box>
          {/* Popover with Notification Data */}
          <Popover
            open={openPopover}
            anchorEl={popoverAnchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <div>
              {dataFetched ? (
                <div>
                  {notfications.map((notifi, index) => (
                    <Card
                      sx={{
                        display: "flex",
                        maxWidth: 500,
                        backgroundColor: "skyblue",
                        border: "solid",
                        borderBlockWidth: "1px",
                      }}
                    >
                      {/* Smaller image and align to the left */}
                      <CardMedia
                        component="img"
                        alt="Notification Image"
                        height="70"
                        src={config.STORAGE_URL + notifi.img}
                        sx={{ alignSelf: "center", marginLeft: 1 }}
                      />
                      <CardContent>
                        <div>
                          {/* Title */}
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ marginBottom: 1 }}
                          >
                            Medicine Out Of Stock
                          </Typography>
                          {/* Text */}
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ marginBottom: 1 }}
                          >
                            {notifi.data}
                          </Typography>
                          {/* Boolean value (example: true) */}
                          <Typography
                            variant="body2"
                            style={{ color: "black" }}
                            color="text.secondary"
                          >
                            {notifi.state}----{notifi.time} UK
                          </Typography>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </Popover>
          <Box sx={{ flexGrow: 0 }}>
            <Badge
              style={{ transform: "none" }}
              overlap="circular"
              badgeContent={unseenNotifications}
              color="secondary"
            >
              <IconButton
                style={{ color: "white" }}
                aria-label="notifications"
                onClick={handleOpenPopover}
              >
                <NotificationsIcon style={{ fontSize: "2rem" }} />
              </IconButton>
            </Badge>
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
            <Tooltip title=" Logout">
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
