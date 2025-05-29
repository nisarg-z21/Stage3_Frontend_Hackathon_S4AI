import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Box } from "@mui/material";
import "./App.css";
import SignIn from "./layouts/SignIn";
import { AuthProvider } from "./context/AuthContext";
import VerifyOtp from "./layouts/VerifyOtp";
import LoginHeader from "./components/LoginHeader";
import Complains from "./layouts/ComplainsTable";
import ComplaintDetails from "./layouts/ComplainScreen";
import Sidebar from "./components/Sidebar";
import Report from "./layouts/Report";
import Logs from "./layouts/Logs";
import KeywordGraphScreen from "./layouts/KeywordGraphScreen";
import KeywordDetailScreen from "./layouts/KeywordDetailScreen";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
          <LoginHeader />
          <Box sx={{ display: "flex", flexGrow: 1, marginTop: "145px" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, overflow: "auto", padding: "20px" }}>
              <Routes>
                <Route path="/" element={<Navigate to="/signin" />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/verifyOtp/:mobile" element={<VerifyOtp />} />
                <Route path="/complains" element={<Complains />} />
                <Route path="/reports" element={<Report />} />
                <Route path="/logs" element={<Logs />} />
                <Route
                  path="/keywordGraphScreen"
                  element={<KeywordGraphScreen />}
                />
                <Route
                  path="/keywordDetailScreen"
                  element={<KeywordDetailScreen />}
                />
                <Route
                  path="/complains/complainScreen/:complaintId"
                  element={<ComplaintDetails />}
                />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </AuthProvider>
  );
}

export default App;
