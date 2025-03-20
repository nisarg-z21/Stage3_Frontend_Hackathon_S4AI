import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import useAxios from "../api/useAxios";

const Report = () => {
  const [reports, setReports] = useState([]);
  const fetchReports = async () => {
    try {
      const response = await useAxios.get("/reports/get_all_reports");
      const data = response.data;
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);
  return (
    <Grid container spacing={3} sx={{ marginTop: "20px" }}>
      {reports.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ height: "100%", cursor: "pointer" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                {item.title}
              </Typography>
              <Typography variant="body2">{item.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Report;
