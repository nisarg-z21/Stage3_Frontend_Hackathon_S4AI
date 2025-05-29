import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import {
  FaUser,
  FaCog,
  FaBars,
  FaClipboardList,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";
import FileInputModal from "./FileInputModal";

const Sidebar = () => {
  const location = useLocation(); // Get current route
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Hide sidebar if the route is "/signin"
  if (location.pathname === "/signin") {
    return null;
  }

  const menuItems = [
    {
      to: "/complains",
      icon: <FaClipboardList size={20} />,
      label: "Complaints",
    },
    {
      to: "/logs",
      icon: <FaUserShield size={20} />,
      label: "Logs",
    },
    {
      to: "/errors",
      icon: <FaUser size={20} />,
      label: "Errors",
    },
    {
      // to: "#", // Prevent default navigation
      icon: <FaCog size={20} />,
      label: "Reports",
      onClick: () => setIsModalOpen(true), // Open modal
    },
    {
      to: "/signin",
      icon: <FaSignOutAlt size={20} />,
      label: "Logout",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#0361ae" }}>
      <IconButton
        onClick={toggleDrawer}
        style={{
          color: "#fff",
          // backgroundColor: "#0361ae", // added background color blue
          position: "fixed",
          // top: 160, // Adjust based on header height
          left: open ? 200 : 10,
          transition: "left 0.3s",
          zIndex: 1300,
          borderRadius: "50%",
          padding: "8px",
        }}
      >
        <FaBars size={20} />
      </IconButton>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 240 : 60,
          flexShrink: 0,
          // mt: "160px", // Push below header
          // height: "calc(100vh - 160px)", // Adjust height dynamically
          "& .MuiDrawer-paper": {
            width: open ? 240 : 60,
            backgroundColor: "#0361ae",
            color: "#fff",
            overflowX: "hidden",
            transition: "width 0.3s",
            mt: "160px", // Match header height
            pt: "36px", // Adjust based on header height
            // height: "calc(100vh - 195px)",
          },
        }}
      >
        <List sx={{ padding: 0 }}> 
          {menuItems.map(({ to, icon, label, onClick }) => (
            <Tooltip
              title={!open ? label : ""}
              placement="right"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    fontSize: "1rem", // ⬅️ increase this value as needed
                  },
                },
              }}
            >
              <ListItem
                button
                key={label}
                component={onClick ? "button" : Link}
                to={!onClick ? to : undefined}
                onClick={onClick}
                sx={{
                  backgroundColor: location.pathname.startsWith(to)
                    ? "#3ba1f5"
                    : "transparent",
                  color: "#fff",
                  borderRadius: "5px",
                  "&:hover": { backgroundColor: "#3ba1f5" },
                  p: 2,
                }}
              >
                <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
                  {icon}
                </ListItemIcon>
                {open && <ListItemText primary={label} />}
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>
      {/* Modal Component */}
      <FileInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => navigate("/reports")}
      />
    </Box>
  );
};

export default Sidebar;
