import React, { useEffect, useState } from "react";
import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import useAxios from "../api/useAxios";

const MainReport = () => {
  const [reports, setReports] = useState({});
  const fetchReports = async () => {
    try {
      const response = await useAxios.get("/reports/get_all_reports");
      const data = response.data;
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };
  console.log("reports : ",reports);


  const fetchGraph = async (filename) => {
    try {
      const response = await useAxios.get("/reports/get_reports", {
        params: { filename: filename },
        responseType: "blob",
      });

      const fileURL = window.URL.createObjectURL(response.data);
      window.open(fileURL, "_blank");
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchReports();
  }, []);
  return (
    <div>
      <Grid container spacing={3} sx={{ marginTop: "20px" }}>
        {reports.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{ height: "100%", cursor: "pointer" }}
              onClick={() => fetchGraph(item.file_name)} // Add onClick event here
            >
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                  {item[index]}
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>

  );
};

export default MainReport;
