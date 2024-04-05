import * as React from "react";
import logo from "./logo1.png";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import ListAltIcon from "@mui/icons-material/ListAlt";
import UpdateIcon from "@mui/icons-material/Update";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AllLog from "./AllLogs";
import UpdateLogsComponent from "./UpdateLogComponent";
import UpdatePassword from "./UpdatePassword";
import Profile from "./Profile";

import { Cookie } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const drawerWidth = 250;

function PageAllLogs() {
  return (
    <div>
      <AllLog />
    </div>
  );
}

function PageAddLogs() {
  return (
    <div>
      <UpdateLogsComponent />
    </div>
  );
}

function PageUpdatePassword() {
  return (
    <div>
      <UpdatePassword />
    </div>
  );
}

function PageProfile() {
  return (
    <div>
      <Profile />
    </div>
  );
}

function MenuComponent(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("All Logs");

  const nav = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleMenuItemClick = (text) => {
    setSelectedItem(text);
    handleDrawerClose();
  };

  const logoutHandler = ()=>{ Cookies.remove('token');  
  nav('/');}

  const drawer = (
    <div>
      <Toolbar />
      <div className="logo">
        <img src={logo} alt="Your Logo" width="150vw" height="auto" />
      </div>
      <List
        sx={{
          p: 2,
          mt: 2,
          color: "white",
          fontSize: "2.2rem",
          justifyContent: "center",
        }}
      >
        {[
          "All Logs",
          "Add Logs",
          "Update Password",
          "Profile",
          // "Log out",
        ].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            sx={{ width: "220px" }}
            onClick={() => handleMenuItemClick(text)}
          >
            <ListItemButton
              sx={{
                "&:hover": { backgroundColor: "#858BC5", borderRadius: "300px" },
              }}
            >
              <ListItemIcon>
                {index === 0 && <ListAltIcon sx={{ color: "white" }} />}
                {index === 1 && <UpdateIcon sx={{ color: "white" }} />}
                {index === 2 && <VpnKeyIcon sx={{ color: "white" }} />}
                {index === 3 && <AccountCircleIcon sx={{ color: "white" }} />}
                {/* {index === 4 && <ExitToAppIcon sx={{ color: "white" }} />} */}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
         <ListItem
           
            disablePadding
            sx={{ width: "220px" }}
            onClick={logoutHandler}
          >
            <ListItemButton
              sx={{
                "&:hover": { backgroundColor: "#858BC5", borderRadius: "300px" },
              }}
            >
              <ListItemIcon>
               <ExitToAppIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={'Log Out'} />
            </ListItemButton>
          </ListItem>
      </List>
    </div>
  );

  const renderPage = () => {
    switch (selectedItem) {
      case "All Logs":
        return <PageAllLogs />;
      case "Add Logs":
        return <PageAddLogs />;
      case "Update Password":
        return <PageUpdatePassword />;
      case "Profile":
        return <PageProfile />;
        case "Log out":
         
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#021529",
          "& .MuiToolbar-root": {
            minHeight: "80px", // Change the minimum height as per your requirement
          },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
            {selectedItem}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
         
          ".css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
            backgroundColor: "#021529",
          },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#021529",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
     
        {renderPage()}
      
    </Box>
  );
}

MenuComponent.propTypes = {
  window: PropTypes.func,
};

export default MenuComponent;
