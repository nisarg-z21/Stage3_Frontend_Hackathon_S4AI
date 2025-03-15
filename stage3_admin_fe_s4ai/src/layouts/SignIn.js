// eslint-disable-next-line
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, TextField, Typography } from "@mui/material";

const SignIn = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!userId || !password) {
      setError("Please enter both User ID and Password.");
      return;
    }

    try {
      // Add API call for authentication here
      console.log("Logging in with:", userId, password);
      navigate("/complains"); // Navigate to dashboard after successful login
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
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
        Admin User Login
      </Typography>
      <form onSubmit={handleLogin}>
        <Typography
          variant="body1"
          sx={{
            mb: 1,
            color: "black",
            textAlign: "left",
            fontWeight: "bold",
          }}
        >
          User ID:
        </Typography>
        <TextField
          type="text"
          fullWidth
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        <Typography
          variant="body1"
          sx={{
            mb: 1,
            color: "black",
            textAlign: "left",
            fontWeight: "bold",
          }}
        >
          Password:
        </Typography>
        <TextField
          type="password"
          fullWidth
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          type="submit"
        >
          Sign In
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2, color: "black" }}>
        Don't have an account? <Link style={{ color: "black" }}>Sign Up</Link>
      </Typography>
    </Card>
  );
};

export default SignIn;
