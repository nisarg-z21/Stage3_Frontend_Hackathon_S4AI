import React, { useEffect, useState } from "react";
import useAxios from "../api/useAxios";
import DataTable from "../components/DataTable";
import { Typography, Box } from "@mui/material";

const Complains = () => {
  const [complains, setComplains] = useState([]);

  const fetchComplains = async () => {
    try {
      const response = await useAxios.get("/complains/get_all_complains");
      console.log("response:", response);
      const data = response.data.data.data;
      setComplains(data);
    } catch (error) {
      console.error("Error fetching decisionLogs:", error);
    }
  };

  useEffect(() => {
    fetchComplains();
  }, []);

  const columnOrder = [
    "complainId",
    "mobileNo",
    "description",
    "uploadedFiles",
    "category",
    "subcategory",
  ];

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
        Complain Table :
      </Typography>
      <DataTable
        data={complains}
        columnOrder={columnOrder}
        message="No orders found."
      />
    </Box>
  );
};

export default Complains;
