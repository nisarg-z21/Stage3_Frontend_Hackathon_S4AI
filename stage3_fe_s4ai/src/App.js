import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import SignIn from "./layouts/SignIn";
import { AuthProvider } from "./context/AuthContext";
import VerifyOtp from "./layouts/VerifyOtp";
import LoginHeader from "./components/LoginHeader";
import ComplaintForm from "./layouts/ReportForm";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          {/* Main App Routes */}
          <Route
            path="/*"
            element={
              <div className="container">
                <div className="main">
                  <LoginHeader />
                  <Routes>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/verifyOtp/:mobileNo" element={<VerifyOtp />} />
                    <Route path="/complaintForm" element={<ComplaintForm />} />
                  </Routes>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
