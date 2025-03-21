import React, { useState, useRef } from "react";
import useAxios from "../api/useAxios";
import {
  Button,
  Card,
  TextField,
  Typography,
  IconButton,
  Grid,
  FormControl,
  Select,
  MenuItem, CircularProgress
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import { motion } from "framer-motion";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const ComplaintForm = () => {
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);
  const [recording, setRecording] = useState(false);
  const [uploadedAudio, setUploadedAudio] = useState(null); // To track uploaded audio
  const [permissionError, setPermissionError] = useState("");
  // const [category, setCategory] = useState("");
  // const [subcategory, setSubcategory] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);

  const [predictedCategory, setPredictedCategory] = useState(""); // From backend
  const [predictedAudioCategory, setPredictedAudioCategory] = useState(""); // From backend
  const [predictedImageCategory, setPredictedImageCategory] = useState(""); // From backend
  const [manualCategory, setManualCategory] = useState("");

  const [predictedSubcategory, setPredictedSubcategory] = useState(""); // From backend
  const [predictedAudioSubcategory, setPredictedAudioSubcategory] = useState(""); // From backend
  const [predictedImageSubcategory, setPredictedImageSubcategory] = useState(""); // From backend
  const [manualSubcategory, setManualSubcategory] = useState("");

  const [logs, setLogs] = useState([]); // Store change logs
  const mobileNo = localStorage.getItem("mobileNo");

  const categories = {
    "Crime Against Women & Children": [
      "Rape - Gang Rape",
      "Sexual Harassment",
      "Cyber Voyeurism",
      "Cyber Stalking",
      "Cyber Bullying",
      "Child Pornography - Child Sexual Abuse Material",
      "Child Sexual Exploitative Material",
      "Publishing and transmitting obscene material - sexually explicit material",
      "Fake Social Media Profile",
      "Defamation",
      "Cyber Blackmailing and Threatening",
      "Online Human Trafficking",
    ],
    "Financial Crimes": [
      "Investment Scam - Trading Scam",
      "Online Job Fraud",
      "Tech Support Scam - Customer Care Scam",
      "Online Loan Fraud",
      "Matrimonial - Romance Scam - Honey Trapping Scam",
      "Impersonation of Government Servant",
      "Cheating by Impersonation",
      "SIM Swap Fraud",
      "Sextortion - Nude Video",
      "Aadhar Enabled Payment System AEPS fraud - Biometric Cloning",
      "Identity Theft",
      "Courier Parcel Scam",
      "Phishing",
      "Online Shopping E-commerce Frauds",
      "Advance Fee",
      "Real Estate - Rental Payment",
    ],
    "Cyber Attack - Dependent Crimes": [
      "Malware Attack",
      "Ransomware Attack",
      "Hacking Defacement",
      "Data Breach Theft",
      "Tampering with computer source documents",
      "Denial of Service Distributed - Denial of Service DDOS attacks",
      "SQL Injection",
    ],
    "Other Cyber Crime": [
      "Fake profile",
      "Cyber Terrorism",
      "Social Media Account Hacking",
      "Online Gambling Betting Frauds",
      "Business Email Compromise Email Takeover",
      "Provocative Speech for unlawful acts",
      "Fake News",
      "Cyber Pornography",
      "Sending obscene material",
      "Intellectual Property IPR Thefts",
      "Cyber Enabled Human Trafficking - Cyber Slavery",
      "Online Piracy",
      "Spoofing",
    ],
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    if (selectedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

      // Log the uploaded files
      setLogs((prevLogs) => [
        ...prevLogs,
        {
          logs:
            "User uploaded files: " +
            selectedFiles.map((file) => file.name).join(", "),
          mobileNo: mobileNo,
        },
      ]);
    }
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
    setUploadedAudio(null); // Remove uploaded audio when recording is removed
  };

  // const handleUploadAudio = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setUploadedAudio(URL.createObjectURL(file)); // Store the uploaded audio as a URL
  //   }
  // };

  const handleUploadAudio = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedAudio(URL.createObjectURL(file)); // Store the uploaded audio as a URL
      const audioBlob = new Blob([file], { type: file.type }); // Create a Blob from the uploaded file
      setAudioBlob(audioBlob); // Store the audio Blob
    }
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
    // formData.append("category", category);
    // formData.append("subcategory", subcategory);
    formData.append("predictedCategory", predictedCategory);
    formData.append("predictedSubcategory", predictedSubcategory);
    formData.append("manualCategory", manualCategory);
    formData.append("manualSubcategory", manualSubcategory);
    formData.append("pincode", pincode);
    formData.append("state", state);
    formData.append("mobileNo", mobileNo);
    formData.append("predictedAudioCategory", predictedAudioCategory);
    formData.append("predictedImageCategory", predictedImageCategory);
    formData.append("predictedAudioSubcategory", predictedAudioSubcategory);
    formData.append("predictedImageSubcategory", predictedImageSubcategory);

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

      if (response.status === 201) {
        // Success message
        alert("Complaint submitted successfully!");

        // Clear form fields
        setDescription("");
        setFiles([]);
        setAudioBlob(null);
        // setCategory("");
        setPredictedCategory("");
        // setSubcategory("");
        setPredictedSubcategory("");
        setManualSubcategory("");
        setManualCategory("");
        setPredictedAudioCategory("");
        setPredictedImageCategory("");
        setPredictedAudioSubcategory("");
        setPredictedImageSubcategory("");
        setPincode("");
        setState("");
        setLogs([]);
      }
      const result = await useAxios.post("/logs/add_log", { logs });
    } catch (err) {
      console.error("Error submitting complaint:", err);
      setError("Error submitting complaint. Please try again.");
    }
  };

  // const handlePredictCategory = async () => {
  //   try {
  //     setLoading(true);
  //     const formData = new FormData();
  //     formData.append("description", description);
  //     // Append uploaded files
  //     files.forEach((file) => {
  //       formData.append("uploadedFiles", file);
  //     });

  //     // Append audio file if exists
  //     if (audioBlob) {
  //       formData.append("audioFile", audioBlob, "recording.wav");
  //     }


  //     const predictionResponse = await useAxios.post(
  //       "/predicttion/predict_cat_subcat",
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );

  //     console.log("Prediction response:", predictionResponse.data);
  //     const data = predictionResponse.data.data;

  //     // setCategory(data.category || "");
  //     setPredictedCategory(data.category || "");
  //     // setSubcategory(data.sub_category || "");
  //     setPredictedSubcategory(data.sub_category || "");
  //     if (data.sub_category && data.category) {
  //       setLogs((prevLogs) => [
  //         ...prevLogs,
  //         {
  //           logs: `Predicted Category from "${data.category}" and Ubcategory "${data.sub_category}"`,
  //           mobileNo: mobileNo,
  //         },
  //       ]);
  //     }
  //   } catch (error) {
  //     console.error("Error predicting category:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handlePredictCategory = async () => {
    const startTime = performance.now(); // Start time before API call

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("description", description);

      // Append uploaded files
      files.forEach((file) => {
        formData.append("uploadedFiles", file);
      });

      // Append audio file if exists
      if (audioBlob) {
        formData.append("audioFile", audioBlob, "recording.wav");
      }

      // API call
      const predictionResponse = await useAxios.post(
        "/predicttion/predict_cat_subcat",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const data = predictionResponse.data.data;

      // Set category and subcategory
      setPredictedCategory(data.category || "");
      setPredictedSubcategory(data.sub_category || "");
      setPredictedAudioCategory(data.audio_category || "")
      setPredictedImageCategory(data.image_category || "")
      setPredictedAudioSubcategory(data.audio_sub_category || "");
      setPredictedImageSubcategory(data.image_sub_category || "");

      // Log the prediction details along with time taken
      if (data.sub_category && data.category) {
        const endTime = performance.now(); // End time after API call
        const totalTime = (endTime - startTime) / 1000; // Convert time to seconds

        setLogs((prevLogs) => [
          ...prevLogs,
          {
            logs: `Predicted Category from "${data.category}" and Subcategory "${data.sub_category}". Inference Time: ${totalTime.toFixed(2)} s.`,
            mobileNo: mobileNo,
          },
        ]);
      }
    } catch (error) {
      console.error("Error predicting category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (<>
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
          <Typography variant="h5" sx={{ mb: 1, textAlign: "left" }}>
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
              <Typography variant="h5" sx={{ mb: 1, textAlign: "left" }}>
                Pincode:
              </Typography>
              <TextField
                placeholder="Enter Pincode"
                fullWidth
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                inputProps={{
                  maxLength: 6,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" sx={{ mb: 1, textAlign: "left" }}>
                State:
              </Typography>
              <TextField
                placeholder="Enter State"
                fullWidth
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            {/* Category Dropdown */}
            <Grid item xs={6}>
              <Typography variant="h5" sx={{ mb: 1, textAlign: "left" }}>
                Category:
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={manualCategory || predictedCategory} // Show manual if selected, else predicted
                  onChange={(event) => {
                    const newCategory = event.target.value;
                    if (newCategory !== predictedCategory) {
                      setManualCategory(newCategory);
                      setLogs((prevLogs) => [
                        ...prevLogs,
                        {
                          logs: `Changed Category from "${predictedCategory}" to "${newCategory}"`,
                          mobileNo: mobileNo,
                        },
                      ]);
                    } else {
                      setManualCategory(""); // Reset manual if same as predicted
                    }
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Category
                  </MenuItem>
                  {Object.keys(categories).map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Subcategory Dropdown */}
            <Grid item xs={6}>
              <Typography variant="h5" sx={{ mb: 1, textAlign: "left" }}>
                Subcategory:
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={manualSubcategory || predictedSubcategory} // Show manual if selected, else predicted
                  onChange={(event) => {
                    const newSubcategory = event.target.value;
                    if (newSubcategory !== predictedSubcategory) {
                      setManualSubcategory(newSubcategory);
                      setLogs((prevLogs) => [
                        ...prevLogs,
                        {
                          logs: `Changed Subcategory from "${predictedSubcategory}" to "${newSubcategory}"`,
                          mobileNo: mobileNo,
                        },
                      ]);
                    } else {
                      setManualSubcategory(""); // Reset manual if same as predicted
                    }
                  }}
                  displayEmpty
                  disabled={!manualCategory && !predictedCategory} // Disable if no category selected
                >
                  <MenuItem value="" disabled>
                    Select Subcategory
                  </MenuItem>
                  {categories[manualCategory || predictedCategory]?.map(
                    (subcat) => (
                      <MenuItem key={subcat} value={subcat}>
                        {subcat}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#0361ae", color: "white", flex: 1 }}
                onClick={handlePredictCategory}
                disabled={loading || description.trim() === ""} // Disable button when loading is true
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Predict Category"
                )}
              </Button>
            </Grid>
          </Grid>

          {files.length > 0 && (
            <Typography variant="h6" sx={{ mb: 2, textAlign: "left" }}>
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
          <Typography variant="h5" sx={{ mb: 1, textAlign: "left" }}>
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
                pointerEvents: uploadedAudio ? "none" : "auto", // Disable when audio is uploaded
              }}
            >
              {recording ? <StopIcon /> : <MicIcon />}
            </IconButton>
          </motion.div>

          {/* Upload Audio Button */}
          <div>
            <Button
              variant="contained"
              component="label"
              sx={{
                backgroundColor: "#0361ae",
                color: "white",
                mb: 2,
                float: "left",
              }}
              disabled={audioBlob || uploadedAudio} // Disable if audio is recorded or uploaded
            >
              Upload Audio
              <input
                type="file"
                accept="audio/*"
                onChange={handleUploadAudio}
                hidden
                disabled={audioBlob || uploadedAudio} // Disable if audio is recorded or uploaded
              /></Button>
          </div>

          {uploadedAudio && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <audio controls src={uploadedAudio} />
              <IconButton size="small" onClick={handleRemoveAudio}>
                <DeleteIcon fontSize="small" color="error" />
              </IconButton>
            </div>
          )}

          {audioBlob && !uploadedAudio && (
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
          {/* <Button
            variant="contained"
            sx={{ backgroundColor: "#0361ae", color: "white", flex: 1 }}
            onClick={handlePredictCategory}
            disabled={loading} // Disable button when loading is true
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Predict Category"
            )}
          </Button> */}
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#0361ae", color: "white", flex: 1 }}
            disabled={
              !(
                (manualCategory || predictedCategory) &&
                (manualSubcategory || predictedSubcategory)
              )
            }
          >
            Submit Report
          </Button>
        </div>
      </form>
    </Card>
    {(
      (predictedAudioCategory && predictedAudioCategory.trim() !== "") ||
      (predictedImageCategory && predictedImageCategory.trim() !== "") ||
      (predictedAudioSubcategory && predictedAudioSubcategory.trim() !== "") ||
      (predictedImageSubcategory && predictedImageSubcategory.trim() !== "")
    ) && (
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
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ mb: 1, textAlign: "left" }}>
                For Debug purpose
              </Typography>
            </Grid>
            {(
              (predictedAudioCategory && predictedAudioCategory.trim() !== "")
            ) &&
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ mb: 1, textAlign: "left" }}>
                  Audio Category: {predictedAudioCategory}
                </Typography>
              </Grid>
            }
            {(
              (predictedImageCategory && predictedImageCategory.trim() !== "")
            ) &&
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ mb: 1, textAlign: "left" }}>
                  OCR Category: {predictedImageCategory}
                </Typography>
              </Grid>
            }
            {(
              (predictedAudioSubcategory && predictedAudioSubcategory.trim() !== "")
            ) &&
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ mb: 1, textAlign: "left" }}>
                  Audio Subcategory: {predictedAudioSubcategory}
                </Typography>
              </Grid>
            }
            {(
              (predictedImageSubcategory && predictedImageSubcategory.trim() !== "")
            ) &&
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ mb: 1, textAlign: "left" }}>
                  OCR subcategory: {predictedImageSubcategory}
                </Typography>
              </Grid>
            }
          </Grid>
        </Card>
      )}
  </>
  );
};

export default ComplaintForm;
