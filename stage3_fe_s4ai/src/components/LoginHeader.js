import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import TranslateIcon from "@mui/icons-material/Translate";
const emblem = require("../assets/emblem-dark.png");
const i4c = require("../assets/i4cpng.png");

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle language menu open/close
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#0361ae", color: "white" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          p: 1,
        }}
      >
        {/* Left Section - Government & Cyber Crime Logos */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              भारतीय सरकार | गृह मंत्रालय
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
              GOVERNMENT OF INDIA | MINISTRY OF HOME AFFAIRS
            </Typography>
          </Box>
        </Box>

        {/* Right Section - Language & Social Media Icons */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Language Dropdown */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <TranslateIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>English</MenuItem>
            <MenuItem onClick={handleMenuClose}>हिंदी</MenuItem>
          </Menu>

          {/* Social Media Icons */}
          <IconButton color="inherit">
            <Facebook />
          </IconButton>
          <IconButton color="inherit">
            <Instagram />
          </IconButton>
          <IconButton color="inherit">
            <LinkedIn />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Divider Line */}
      <Divider sx={{ backgroundColor: "white", opacity: 0.5 }} />

      {/* Main Header */}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 1,
          backgroundColor: "white", // Set background color to white
          gap: 4,
        }}
      >
        {/* Left Section - Government & Cyber Crime Logos */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img src={emblem} alt="Gov Logo" style={{ height: 50 }} />
          <img src={i4c} alt="I4C Logo" style={{ height: 50 }} />
        </Box>

        {/* Center - Portal Title */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "black" }}>
            राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल
          </Typography>
          <Typography variant="h6" sx={{ color: "black" }}>
            National Cyber Crime Reporting Portal
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
