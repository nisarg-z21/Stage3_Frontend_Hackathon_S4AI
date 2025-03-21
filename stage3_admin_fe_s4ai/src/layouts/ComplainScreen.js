import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { Phone, ConfirmationNumber, LocationOn } from "@mui/icons-material";
import useAxios from "../api/useAxios";
import { useParams } from "react-router-dom";

const ComplaintDetails = () => {
  const { complaintId } = useParams();
  const [complain, setComplain] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [ocrText, setOcrText] = useState();
  const [audioText, setAudioText] = useState();

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
    fetchOCRText();
    fetchAudioext();
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

  const fetchOCRText = async () => {
    try {
      const response = await useAxios.get(`/OCR/get_ocr_text`, {
        params: { complain_id: complaintId }
      });
      const data = response.data.data;
      setOcrText(data);
      // // Create a Blob URL
      // const fileURL = window.URL.createObjectURL(response.data);
      // setAudioUrl(fileURL);
    } catch (error) {
      console.error("Error fetching audio file:", error);
    }
  };

  const fetchAudioext = async () => {
    try {
      const response = await useAxios.get(`/audio/get_audio_text`, {
        params: { complain_id: complaintId }
      });
      const data = response.data.data;
      setAudioText(data);
      // // Create a Blob URL
      // const fileURL = window.URL.createObjectURL(response.data);
      // setAudioUrl(fileURL);
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
            justifyContent: "left",
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
            justifyContent: "left",
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
            justifyContent: "left",
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
              <strong>Predicted Description Category:</strong>{" "}
              {complain?.predictedCategory ?? "N/A"}
            </Typography>
            <Typography>
              <strong>Predicted Description Subcategory:</strong>{" "}
              {complain?.predictedSubcategory ?? "N/A"}
            </Typography>
            {complain?.manualCategory && (
              <Typography>
                <strong>Manual Category:</strong>{" "}
                {complain?.manualCategory ?? "N/A"}
              </Typography>
            )}
            {complain?.manualSubcategory && (
              <Typography>
                <strong>Manual Subcategory:</strong>{" "}
                {complain?.manualSubcategory ?? "N/A"}
              </Typography>
            )}
            {/* Added the new fields */}
            {complain?.predictedAudioCategory && (
              <Typography>
                <strong>Predicted Audio Category:</strong>{" "}
                {complain?.predictedAudioCategory ?? "N/A"}
              </Typography>
            )}

            {complain?.predictedImageCategory && (
              <Typography>
                <strong>Predicted Image Category:</strong>{" "}
                {complain?.predictedImageCategory ?? "N/A"}
              </Typography>
            )}

            {complain?.predictedAudioSubcategory && (
              <Typography>
                <strong>Predicted Audio Subcategory:</strong>{" "}
                {complain?.predictedAudioSubcategory ?? "N/A"}
              </Typography>
            )}

            {complain?.predictedImageSubcategory && (
              <Typography>
                <strong>Predicted Image Subcategory:</strong>{" "}
                {complain?.predictedImageSubcategory ?? "N/A"}
              </Typography>
            )}
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
      {ocrText?.File &&
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                OCR Result
              </Typography>
              {ocrText ? (
                // Iterate through the 'File' and 'original_text_list' arrays in the JSON object
                <div>
                  {ocrText.File && ocrText.original_text_list ? (
                    ocrText.File.map((file, index) => {
                      const ocrTextContent = ocrText.original_text_list[index] || "";  // Get corresponding text for the file
                      return (
                        <div key={index}>
                          {/* File name display */}
                          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                            {file}
                          </Typography>

                          {/* Corresponding text display */}
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {ocrTextContent}
                          </Typography>

                          {/* Divider after each file-text pair */}
                          <Divider sx={{ mb: 1 }} />
                        </div>
                      );
                    })
                  ) : (
                    <Typography>No files or OCR text available.</Typography>
                  )}
                </div>
              ) : (
                <Typography>No OCR data available.</Typography>
              )}
            </CardContent>
          </Card>
        </div>
      }
      {ocrText?.File &&
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                OCR Translated Result
              </Typography>
              {ocrText ? (
                // Iterate through the 'File' and 'translated_text_list' arrays in the JSON object
                <div>
                  {ocrText.File && ocrText.translated_text_list ? (
                    ocrText.File.map((file, index) => {
                      const ocrTextContent = ocrText.translated_text_list[index] || "";  // Get corresponding text for the file

                      return (
                        <div key={index}>
                          {/* File name display */}
                          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                            {file}
                          </Typography>

                          {/* Corresponding text display */}
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {ocrTextContent}
                          </Typography>

                          {/* Divider after each file-text pair */}
                          <Divider sx={{ mb: 1 }} />
                        </div>
                      );
                    })
                  ) : (
                    <Typography>No files or OCR text available.</Typography>
                  )}
                </div>
              ) : (
                <Typography>No OCR data available.</Typography>
              )}
            </CardContent>
          </Card>
        </div>
      }

      {audioText?.File &&
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                Audio Result
              </Typography>
              {audioText ? (
                // Iterate through the 'File' and 'original_text_list' arrays in the JSON object
                <div>
                  {audioText.File && audioText.original_text_list ? (
                    audioText.File.map((file, index) => {
                      const audioTextContent = audioText.original_text_list[index] || "";  // Get corresponding text for the file

                      return (
                        <div key={index}>
                          {/* File name display */}
                          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                            {file}
                          </Typography>

                          {/* Corresponding text display */}
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {audioTextContent}
                          </Typography>

                          {/* Divider after each file-text pair */}
                          <Divider sx={{ mb: 1 }} />
                        </div>
                      );
                    })
                  ) : (
                    <Typography>No files or Audio text available.</Typography>
                  )}
                </div>
              ) : (
                <Typography>No Audio data available.</Typography>
              )}
            </CardContent>
          </Card>
        </div>
      }
      {audioText?.File &&
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                Audio Translated Result
              </Typography>
              {audioText ? (
                // Iterate through the 'File' and 'translated_text_list' arrays in the JSON object
                <div>
                  {audioText.File && audioText.translated_text_list ? (
                    audioText.File.map((file, index) => {
                      const audioTextContent = audioText.translated_text_list[index] || "";  // Get corresponding text for the file

                      return (
                        <div key={index}>
                          {/* File name display */}
                          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                            {file}
                          </Typography>

                          {/* Corresponding text display */}
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {audioTextContent}
                          </Typography>

                          {/* Divider after each file-text pair */}
                          <Divider sx={{ mb: 1 }} />
                        </div>
                      );
                    })
                  ) : (
                    <Typography>No files or Audio text available.</Typography>
                  )}
                </div>
              ) : (
                <Typography>No Audio data available.</Typography>
              )}
            </CardContent>
          </Card>
        </div>
      }
    </div>
  );
};

export default ComplaintDetails;
