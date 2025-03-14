// eslint-disable-next-line
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import useAxios from "../api/useAxios";
import { Button, Card, TextField, Typography } from "@mui/material";

const SignIn = () => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState(""); // State for error message
  // const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error message

    if (!mobile || mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      // const response = await useAxios.post("/users/send-otp", {
      //   mobile,
      // });
      // const { success, message } = response.data;

      // if (success) {
      //   // Redirect to the OTP verification page
      //   navigate(`/verify-otp/${mobile}`);
      // } else {
      //   setError(message);
      // }
      console.log("OTP sent to", mobile);
      navigate(`/verifyOtp/${mobile}`);
    } catch (err) {
      console.error("Send OTP error:", err);
      setError("Failed to send OTP. Please try again.");
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        textAlign: "center",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 2, color: "#0361ae", fontWeight: "bold" }}
      >
        Mobile OTP Login
      </Typography>
      <form onSubmit={handleSendOtp}>
        <Typography
          variant="body1"
          sx={{
            mb: 1,
            color: "black",
            textAlign: "left",
            fontWeight: "bold",
          }}
        >
          Enter Mobile Number:
        </Typography>
        <TextField
          type="tel"
          fullWidth
          placeholder="eg. 9090901212"
          value={mobile}
          onChange={(e) => {
            const input = e.target.value;
            if (/^\d*$/.test(input) && input.length <= 10) {
              setMobile(input);
            }
          }}
          inputProps={{
            maxLength: 10, // Restrict input to 10 digits
          }}
          required
          sx={{ mb: 2 }}
        />

        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#0361ae", color: "white", mt: 1 }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#444")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#0361ae")}
          onClick={handleSendOtp}
        >
          Send OTP
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2, color: "black" }}>
        Don't have an account? <Link style={{ color: "black" }}>Sign Up</Link>
      </Typography>
    </Card>
  );
};

export default SignIn;
