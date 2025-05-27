import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import useAxios from "../api/useAxios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Report = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const fetchReports = async () => {
    try {
      const response = await useAxios.get("/reports/get_all_reports");
      const data = response.data;
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const fetchGraph = async (dataPath) => {
    try {
      navigate("/keywordGraphScreen", {
        state: {
          dataPath: dataPath,
        },
      });
    } catch (error) {
      console.error("Error fetching graph:", error);
    }
  };

  const fetchImage = async (filename) => {
    try {
      const response = await useAxios.get("/reports/get_reports", {
        params: { filename: filename },
        responseType: "blob",
      });

      const fileURL = window.URL.createObjectURL(response.data);
      window.open(fileURL, "_blank");
    } catch (error) {}
  };

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
              // onClick={() => fetchGraph(item.file_name)} // Add onClick event here
              onClick={() => {
                if (item.type === "image") {
                  fetchImage(item.file_name);
                } else if (item.type === "graph") {
                  fetchGraph(item.data_path);
                }
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {item.title}
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

export default Report;
