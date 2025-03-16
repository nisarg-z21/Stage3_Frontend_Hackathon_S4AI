// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   IconButton,
//   Box,
//   Typography,
// } from "@mui/material";
// import {
//   FaUser,
//   FaCog,
//   FaUserTie,
//   FaTachometerAlt,
//   FaBars,
//   FaSignal,
//   FaTable,
//   FaList,
// } from "react-icons/fa";
// import { FaCheckToSlot } from "react-icons/fa6";

// const Sidebar = () => {
//   const location = useLocation(); // Get current route
//   const [open, setOpen] = useState(false);

//   const toggleDrawer = () => {
//     setOpen(!open);
//   };

//   return (
//     <Box>
//       <IconButton
//         onClick={toggleDrawer}
//         style={{
//           color: "#fff", // Change to a more visible color
//           position: "fixed", // Fix the icon position
//           top: 15,
//           left: open ? 200 : 10,
//           transition: "left 0.3s",
//           zIndex: 1300, // Ensure it stays on top
//           borderRadius: "50%", // Make it circular for better UI
//           padding: "8px",
//         }}
//       >
//         <FaBars size={20} />
//       </IconButton>
//       <Drawer
//         variant="permanent"
//         open={open}
//         sx={{
//           width: open ? 240 : 60,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: open ? 240 : 60,
//             backgroundColor: "#0361ae",
//             color: "#fff",
//             overflowX: "hidden",
//             transition: "width 0.3s",
//           },
//         }}
//       >
//         <Box sx={{ pt: 2, px: 2, textAlign: "center" }}>
//           {/* {open && <Typography variant="h6">Algo Trading</Typography>} */}
//           {open ? (
//             <Typography variant="h6">Algo Trading</Typography>
//           ) : (
//             <Typography variant="h6">&nbsp;</Typography>
//           )}
//         </Box>
//         <List>
//           {[
//             {
//               to: "/dashboard",
//               icon: <FaTachometerAlt size={20} />,
//               label: "Dashboard",
//             },
//             { to: "/admin", icon: <FaUserTie size={20} />, label: "Admin" },
//             { to: "/profile", icon: <FaUser size={20} />, label: "Profile" },
//             { to: "/settings", icon: <FaCog size={20} />, label: "Settings" },
//             {
//               to: "/positions",
//               icon: <FaTable size={20} />,
//               label: "Positions",
//             },
//             { to: "/signals", icon: <FaSignal size={20} />, label: "Signals" },
//             {
//               to: "/decisionLogs",
//               icon: <FaList size={20} />,
//               label: "DecisionLogs",
//             },
//             {
//               to: "/orders",
//               icon: <FaCheckToSlot size={20} />,
//               label: "Orders",
//             },
//           ].map(({ to, icon, label }) => (
//             <ListItem
//               button
//               key={to}
//               component={Link}
//               to={to}
//               sx={{
//                 backgroundColor:
//                   location.pathname === to ? "#444" : "transparent",
//                 color: "#fff",
//                 borderRadius: "5px",
//                 "&:hover": { backgroundColor: "#444" },
//                 p: 2,
//               }}
//             >
//               <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
//                 {icon}
//               </ListItemIcon>
//               {open && <ListItemText primary={label} />}
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//     </Box>
//   );
// };

// export default Sidebar;

// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   IconButton,
//   Box,
//   Typography,
// } from "@mui/material";
// import {
//   FaUser,
//   FaCog,
//   FaUserTie,
//   FaTachometerAlt,
//   FaBars,
//   FaSignal,
//   FaTable,
//   FaList,
// } from "react-icons/fa";
// import { FaCheckToSlot } from "react-icons/fa6";

// const Sidebar = () => {
//   const location = useLocation();
//   const [open, setOpen] = useState(false);

//   const toggleDrawer = () => {
//     setOpen(!open);
//   };

//   return (
//     <Box>
//       <IconButton
//         onClick={toggleDrawer}
//         sx={{
//           color: "#fff",
//           position: "fixed",
//           top: 15,
//           left: open ? 200 : 10,
//           transition: "left 0.3s",
//           zIndex: 1300,
//           borderRadius: "50%",
//           padding: "8px",
//         }}
//       >
//         <FaBars size={20} />
//       </IconButton>
//       <Drawer
//         variant="permanent"
//         open={open}
//         sx={{
//           width: open ? 240 : 60,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: open ? 240 : 60,
//             backgroundColor: "#0361ae",
//             color: "#fff",
//             overflowX: "hidden",
//             transition: "width 0.3s",
//           },
//         }}
//       >
//         <Box sx={{ pt: 2, px: 2, textAlign: "center" }}>
//           {open ? (
//             <Typography variant="h6">Algo Trading</Typography>
//           ) : (
//             <Typography variant="h6">&nbsp;</Typography>
//           )}
//         </Box>
//         <List>
//           {[
//             {
//               to: "/dashboard",
//               icon: <FaTachometerAlt size={20} />,
//               label: "Dashboard",
//             },
//             { to: "/admin", icon: <FaUserTie size={20} />, label: "Admin" },
//             { to: "/profile", icon: <FaUser size={20} />, label: "Profile" },
//             { to: "/settings", icon: <FaCog size={20} />, label: "Settings" },
//             {
//               to: "/positions",
//               icon: <FaTable size={20} />,
//               label: "Positions",
//             },
//             { to: "/signals", icon: <FaSignal size={20} />, label: "Signals" },
//             {
//               to: "/decisionLogs",
//               icon: <FaList size={20} />,
//               label: "DecisionLogs",
//             },
//             {
//               to: "/orders",
//               icon: <FaCheckToSlot size={20} />,
//               label: "Orders",
//             },
//           ].map(({ to, icon, label }) => (
//             <ListItem
//               button
//               key={to}
//               component={Link}
//               to={to}
//               sx={{
//                 backgroundColor:
//                   location.pathname === to ? "#444" : "transparent",
//                 color: "#fff",
//                 borderRadius: "5px",
//                 "&:hover": { backgroundColor: "#444" },
//                 p: 2,
//               }}
//             >
//               <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
//                 {icon}
//               </ListItemIcon>
//               {open && <ListItemText primary={label} />}
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//     </Box>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import {
  FaUser,
  FaCog,
  FaBars,
  FaClipboardList,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation(); // Get current route
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Hide sidebar if the route is "/signin"
  if (location.pathname === "/signin") {
    return null;
  }

  return (
    <Box>
      <IconButton
        onClick={toggleDrawer}
        style={{
          color: "#fff",
          backgroundColor: "#0361ae", // added background color blue
          position: "fixed",
          top: 160, // Adjust based on header height
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
          mt: "160px", // Push below header
          height: "calc(100vh - 160px)", // Adjust height dynamically
          "& .MuiDrawer-paper": {
            width: open ? 240 : 60,
            backgroundColor: "#0361ae",
            color: "#fff",
            overflowX: "hidden",
            transition: "width 0.3s",
            mt: "160px", // Match header height
            pt: "36px", // Adjust based on header height
            height: "calc(100vh - 195px)",
          },
        }}
      >
        <List>
          {[
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
              to: "/reports",
              icon: <FaCog size={20} />,
              label: "Reports",
            },
            {
              to: "/signin",
              icon: <FaSignOutAlt size={20} />,
              label: "Logout",
            },
          ].map(({ to, icon, label }) => (
            <ListItem
              button
              key={to}
              component={Link}
              to={to}
              sx={{
                backgroundColor:
                  location.pathname === to ? "#3ba1f5" : "transparent",
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
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
