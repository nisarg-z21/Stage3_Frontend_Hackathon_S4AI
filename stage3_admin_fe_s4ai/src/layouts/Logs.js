import React, { useEffect, useState } from "react";
import useAxios from "../api/useAxios";
import DataTable from "../components/DataTable";
import { Typography, Box } from "@mui/material";

const Logs = () => {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const response = await useAxios.get("/logs/get_all_logs");
      const data = response.data;
      setLogs(data);
    } catch (error) {
      console.error("Error fetching Logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const columnOrder = ["logs", "mobileNo", "timestamp"];

  return (
    <Box
      id="complain"
      sx={{
        margin: "20px",
        padding: "20px",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        sx={{ marginTop: "20px", marginBottom: "20px" }}
        gutterBottom
      >
        Logs Table :
      </Typography>
      <DataTable
        data={logs}
        columnOrder={columnOrder}
        message="No orders found."
      />
    </Box>
  );
};

export default Logs;
