import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, TextField, Typography } from "@mui/material";

const VerifyOtp = () => {
  const { mobile } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      // const response = await useAxios.post("/users/verify-otp", { mobile, otp });
      // const { success, message } = response.data;

      // if (success) {
      //   navigate("/dashboard");
      // } else {
      //   setError(message);
      // }

      console.log("OTP verified for", mobile);
      navigate("/complaintForm");
    } catch (err) {
      console.error("OTP verification error:", err);
      setError("Invalid OTP. Please try again.");
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
        Verify OTP
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 1, color: "black", textAlign: "left" }}
      >
        OTP sent to <strong>{mobile}</strong>
      </Typography>
      <form onSubmit={handleVerifyOtp}>
        <TextField
          placeholder="Enter OTP"
          type="text"
          fullWidth
          value={otp}
          onChange={(e) => {
            const input = e.target.value;
            if (/^\d*$/.test(input) && input.length <= 6) {
              setOtp(input);
            }
          }}
          inputProps={{
            maxLength: 6, // Restrict input to 6 digits
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
          onClick={handleVerifyOtp}
        >
          Verify OTP
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2, color: "black" }}>
        Didn't receive the OTP?{" "}
        <Button
          sx={{ color: "#0361ae", textTransform: "none" }}
          onClick={() => console.log("Resend OTP")}
        >
          Resend OTP
        </Button>
      </Typography>
    </Card>
  );
};

export default VerifyOtp;
