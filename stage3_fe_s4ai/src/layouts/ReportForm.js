import React, { useState, useRef } from "react";
import useAxios from "../api/useAxios";
import {
  Button,
  Card,
  TextField,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import { motion } from "framer-motion";

const ComplaintForm = () => {
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);
  const [recording, setRecording] = useState(false);
  const [permissionError, setPermissionError] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [showCategory, setShowCategory] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleAudioRecord = async () => {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunks.current = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, {
            type: "audio/wav",
          });
          setAudioBlob(audioBlob);
        };

        mediaRecorder.start();
        setRecording(true);
        setPermissionError("");
      } catch (error) {
        console.error("Microphone access denied", error);
        setPermissionError(
          "Microphone access denied. Please allow microphone access in your browser settings."
        );
      }
    } else {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleRemoveAudio = () => {
    setAudioBlob(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError("Please describe your complaint.");
      return;
    }
    setError("");

    const formData = new FormData();
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("pincode", pincode);
    formData.append("state", state);
    const mobileNo = localStorage.getItem("mobileNo");
    formData.append("mobileNo", mobileNo);

    // Append uploaded files
    files.forEach((file) => {
      formData.append("uploadedFiles", file);
    });

    // Append audio file if exists
    if (audioBlob) {
      formData.append("audioFile", audioBlob, "recording.wav");
    }

    try {
      const response = await useAxios.post(
        "/complains/save_complain",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Complaint submitted successfully:", response);

      if (response.status === 201) {
        // Success message
        alert("Complaint submitted successfully!");

        // Clear form fields
        setDescription("");
        setFiles([]);
        setAudioBlob(null);
        setCategory("");
        setSubcategory("");
        setShowCategory(false);
        setPincode("");
        setState("");
      }
    } catch (err) {
      console.error("Error submitting complaint:", err);
      setError("Error submitting complaint. Please try again.");
    }
  };

  const handlePredictCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("description", description);
      const predictionResponse = await useAxios.post(
        "/predicttion/predict_cat_subcat",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Prediction response:", predictionResponse.data);
      const data = predictionResponse.data.data;
      console.log("Category:", data);
      // console.log("Subcategory:", data.sub_category);
      setCategory(data.category);
      setSubcategory(data.sub_category);
      setShowCategory(true);
    } catch (error) {
      console.error("Error predicting category:", error);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: "70%",
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
        Submit a Complaint
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div>
          <Typography variant="body1" sx={{ mb: 1, textAlign: "left" }}>
            Describe your complaint:
          </Typography>
          <TextField
            placeholder="Enter your complaint here"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          {/* Pincode & State Fields */}
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ mb: 1, textAlign: "left" }}>
                Pincode:
              </Typography>
              <TextField
                placeholder="Enter Pincode"
                fullWidth
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                required
                inputProps={{
                  maxLength: 6,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ mb: 1, textAlign: "left" }}>
                State:
              </Typography>
              <TextField
                placeholder="Enter State"
                fullWidth
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          {showCategory && (
            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ mb: 1, textAlign: "left" }}>
                  Category:
                </Typography>
                <TextField fullWidth value={category} disabled />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ mb: 1, textAlign: "left" }}>
                  Subcategory:
                </Typography>
                <TextField fullWidth value={subcategory} disabled />
              </Grid>
            </Grid>
          )}

          {files.length > 0 && (
            <Typography variant="body2" sx={{ mb: 2, textAlign: "left" }}>
              Uploaded Files ({files.length}):
              <ul style={{ paddingLeft: 16, margin: 0 }}>
                {files.map((file, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {file.name}
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </li>
                ))}
              </ul>
            </Typography>
          )}
          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor: "#0361ae",
              color: "white",
              mb: 2,
              float: "left",
            }}
          >
            Upload Evidence
            <input type="file" multiple hidden onChange={handleFileChange} />
          </Button>
        </div>
        <div>
          <Typography variant="body1" sx={{ mb: 1, textAlign: "left" }}>
            Record Audio:
          </Typography>
          <motion.div
            animate={{ scale: recording ? 1.2 : 1 }}
            transition={{
              duration: 0.5,
              repeat: recording ? Infinity : 0,
              repeatType: "reverse",
            }}
          >
            <IconButton
              onClick={handleAudioRecord}
              sx={{
                backgroundColor: recording ? "red" : "#0361ae",
                color: "white",
                mb: 2,
              }}
            >
              {recording ? <StopIcon /> : <MicIcon />}
            </IconButton>
          </motion.div>
          {audioBlob && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <audio controls src={URL.createObjectURL(audioBlob)} />
              <IconButton size="small" onClick={handleRemoveAudio}>
                <DeleteIcon fontSize="small" color="error" />
              </IconButton>
            </div>
          )}
          {permissionError && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {permissionError}
            </Typography>
          )}
        </div>
        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#0361ae", color: "white", flex: 1 }}
            onClick={handlePredictCategory}
          >
            Predict Category
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#0361ae", color: "white", flex: 1 }}
          >
            Submit Report
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ComplaintForm;
