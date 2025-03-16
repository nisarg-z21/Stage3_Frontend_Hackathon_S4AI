import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Phone, ConfirmationNumber, LocationOn } from "@mui/icons-material";
import useAxios from "../api/useAxios";
import { useParams } from "react-router-dom";

const ComplaintDetails = () => {
  const { complaintId } = useParams();
  const [complain, setComplain] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const fetchComplain = async () => {
    try {
      const response = await useAxios.get("/complains/get_complain_by_id", {
        params: { complain_id: complaintId },
      });
      const data = response.data.data.data;

      setComplain(data);
      if (data.audioFile) {
        setAudioFile(data.audioFile);
      }
    } catch (error) {
      console.error("Error fetching decisionLogs:", error);
    }
  };

  useEffect(() => {
    fetchComplain();
    // eslint-disable-next-line
  }, []);

  const fetchFile = async (filename) => {
    console.log("FetchFiles", filename);
    try {
      const response = await useAxios.get("/complains/get_uploaded_file", {
        params: { filename: filename },
        responseType: "blob",
      });
      // Create a Blob URL
      const fileURL = window.URL.createObjectURL(response.data);

      // Get file type from response headers (if available)
      const fileType = response.headers["content-type"];

      // Open in new tab only for previewable types (image, PDF, audio, etc.)
      if (
        fileType?.startsWith("image") ||
        fileType?.startsWith("audio") ||
        fileType === "application/pdf"
      ) {
        window.open(fileURL, "_blank");
      } else {
        // Trigger download for non-previewable files
        const link = document.createElement("a");
        link.href = fileURL;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error fetching decisionLogs:", error);
    }
  };

  const fetchAudioFile = async (filename) => {
    try {
      const response = await useAxios.get(`/complains/get_uploaded_file`, {
        params: { filename: filename },
        responseType: "blob", // Important for handling binary data
      });

      // Create a Blob URL
      const fileURL = window.URL.createObjectURL(response.data);
      setAudioUrl(fileURL);
    } catch (error) {
      console.error("Error fetching audio file:", error);
    }
  };

  useEffect(() => {
    if (audioFile) {
      fetchAudioFile(audioFile);
    }
  }, [audioFile]);

  return (
    <div style={{ padding: "20px" }}>
      {/* Background Section */}
      <div
        style={{
          background: "#0361ae",
          padding: "40px",
          borderRadius: "10px",
          color: "white",
          textAlign: "left",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h3"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          <Phone fontSize="inherit" style={{ marginRight: "8px" }} />{" "}
          {complain?.mobileNo ?? "N/A"}
        </Typography>
        <Typography
          variant="h6"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          <ConfirmationNumber
            fontSize="inherit"
            style={{ marginRight: "8px" }}
          />
          Complaint ID: {complaintId ?? "N/A"}
        </Typography>
        <Typography
          variant="body1"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          <LocationOn fontSize="inherit" style={{ marginRight: "8px" }} />
          Pincode: {complain?.pincode ?? "N/A"} | State:{" "}
          {complain?.state ?? "N/A"}
        </Typography>
      </div>

      {/* Category and Description Section */}
      <div style={{ display: "flex", gap: "20px" }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Category Details
            </Typography>
            <Typography>
              <strong>Category:</strong> {complain?.predicted_category ?? "N/A"}
            </Typography>
            <Typography>
              <strong>Subcategory:</strong>{" "}
              {complain?.predicted_subcategory ?? "N/A"}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Description
            </Typography>
            <Typography>
              {complain?.description ?? "No description available."}
            </Typography>
          </CardContent>
        </Card>
      </div>

      {/* Files and Audio Section */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Uploaded Files
            </Typography>
            {complain?.uploadedFiles?.length > 0 ? (
              complain.uploadedFiles.map((file, index) => {
                const fileName = file.split("/").pop();
                return (
                  <Typography
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={() => fetchFile(file)}
                  >
                    📄 {fileName}
                  </Typography>
                );
              })
            ) : (
              <Typography>No files uploaded.</Typography>
            )}
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Audio File
            </Typography>
            {audioUrl ? (
              <audio controls style={{ width: "100%" }}>
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <Typography>No audio file uploaded.</Typography>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComplaintDetails;
