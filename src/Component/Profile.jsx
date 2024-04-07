import React, { useState } from "react";
import {
  Button,
  FormControl,
  Container,
  Typography,
  Box,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ProfilePage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true); // Default to true
  const [profilePicture, setProfilePicture] = useState(null);

  // Function to handle input change for full name
  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
    setIsFormFilled(event.target.value !== "" && email !== "");
  };

  // Function to handle input change for email
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setIsEmailValid(validateEmail(value)); // Validate email
    setIsFormFilled(value !== "" && fullName !== "");
  };

  // Function to check if email is valid
  const validateEmail = (email) => {
    if (email.trim() === "") {
      return true; // If email is empty, consider it valid
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to handle profile picture change
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to save profile
  const saveProfile = () => {
    // Logic to save profile
    console.log("Saving profile...");
  };

  return (
    <Container>
      <Box
        p={3}
        boxShadow={6}
        borderRadius={4}
        style={{ backdropFilter: "blur(12px)", color: "#ffffff" }}
      >
        <Typography variant="h5" color={"#fff"} sx={{ marginBottom: "2px" }}>
          Personal Information
        </Typography>
        <Typography
          variant="subtitle1"
          color={"#fff"}
          sx={{ marginBottom: "20px", fontSize: "0.8rem" }}
        >
          Details about your personal information
        </Typography>
        
          {/* Left side with profile picture and change option */}
          <Grid container spacing={4}>
            {/* Left side with profile picture */}
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "170px",
                  height: "170px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <AccountCircleIcon
                    sx={{ color: "white", width: "100%", height: "100%" }}
                  />
                )}
              </div>
              <label htmlFor="profile-picture-input">
                <Button
                  variant="contained"
                  component="span" // This makes the button act as a label
                  startIcon={<UploadIcon />}
                  sx={{
                    width: "100%",
                    height: "40px",
                    borderRadius: "40px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    transition: "background-color 0.4s ease",
                    backgroundColor: "#858BC5",
                    mt: "13px",
                  }}
                >
                  Change Profile
                </Button>
                <input
                  type="file"
                  id="profile-picture-input"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  style={{ display: "none" }}
                />
              </label>
            </Grid>
        

          {/* Right side with input fields */}
          <Grid item xs={12} sm={12} md={6}>
            <Typography color={"#fff"} sx={{ my: 1 }}>
              Full Name{" "}
            </Typography>
            <FormControl fullWidth sx={{ marginBottom: "20px" }}>
              <TextField
                type="text"
                name="fullName"
                variant="standard"
                autoComplete="off"
                value={fullName}
                onChange={handleFullNameChange}
              />
            </FormControl>
            <Typography color={"#fff"} sx={{ my: 1 }}>
              Email{" "}
            </Typography>
            <FormControl fullWidth sx={{ marginBottom: "20px" }}>
              <TextField
                type="email"
                name="email"
                autoComplete="off"
                variant="standard"
                inputProps={{ maxLength: 35 }}
                value={email}
                onChange={handleEmailChange}
              />
              {!isEmailValid && (
                <Typography sx={{ color: "red" }}>
                  Invalid email format
                </Typography>
              )}
            </FormControl>
            <Button
              variant="contained"
              onClick={saveProfile}
              disabled={!isFormFilled || !isEmailValid}
              sx={{
                width: "100%",
                height: "40px",
                borderRadius: "40px",
                fontSize: "1rem",
                fontWeight: "600",
                transition: "background-color 0.4s ease",
                backgroundColor: "#858BC5",
              }}
            >
              Save Profile
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProfilePage;
