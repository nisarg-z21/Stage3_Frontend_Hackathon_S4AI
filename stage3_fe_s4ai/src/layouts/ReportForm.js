import React, { useState, useRef } from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError("Please describe your complaint.");
      return;
    }
    setError("");
    console.log("Complaint submitted with description:", description);
    console.log("Uploaded files:", files);
    if (audioBlob) {
      console.log("Audio file:", audioBlob);
    }
  };

  const handlePredictCategory = async () => {
    try {
      //   const response = await fetch("/api/predict-category", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ description }),
      //   });
      // const data = await response.json();
      //   setCategory(data.category || "");
      //   setSubcategory(data.subcategory || "");
      setCategory("Financial Crimes");
      setSubcategory("Online Shopping/E-commerce Frauds");
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
