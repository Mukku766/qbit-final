import React, { useState, useEffect } from "react";

import {
  Button,
  FormControl,
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const UpdatePassword = () => {
  const [inputs, setInputs] = useState({
    CurrentPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleTogglePasswordVisibility = (passwordType) => {
    switch (passwordType) {
      case "CurrentPassword":
        setShowCurrentPassword((prevShowCurrentPassword) => !prevShowCurrentPassword);
        break;
      case "NewPassword":
        setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword);
        break;
      case "ConfirmPassword":
        setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to update password (communicate with backend)
    console.log("Updating password...");
    console.log(inputs);
  };

  useEffect(() => {
    // Check if all fields are filled
    setIsFormFilled(
      inputs.CurrentPassword !== "" &&
      inputs.NewPassword !== "" &&
      inputs.ConfirmPassword !== ""
    );
  
    // Check if passwords match
    setIsPasswordMatch(inputs.NewPassword === inputs.ConfirmPassword);
  }, [inputs]);

  return (
    <Container>
      <Box p={3} mt={15} ml={2} mr={2}
        sx={{
          maxWidth: "400px",
          backgroundColor: "transparent",
          borderRadius: "20px",
          backdropFilter: "blur(12px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem 3rem",
        }}
      >
        <section>
          <form onSubmit={handleSubmit}>
            <Typography color={"#fff"} sx={{ my: 1 }}>
              Current Password
            </Typography>
            <FormControl sx={{ width: "100%", marginBottom: "30px" }}>
              <TextField
                type={showCurrentPassword ? "text" : "password"}
                name="CurrentPassword"
                required
                variant="standard"
                autoComplete="off"
                inputProps={{ maxLength: 35 }}
                value={inputs.CurrentPassword}
                onChange={handleInputChange}
                sx={{ color: "#fff" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleTogglePasswordVisibility("CurrentPassword")}
                        edge="end"
                        aria-label={showCurrentPassword ? "hide password" : "show password"}
                      >
                        {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <Typography color={"#fff"} sx={{ my: 1 }}>
              New Password
            </Typography>
            <FormControl sx={{ width: "100%", marginBottom: "30px" }}>
              <TextField
                type={showNewPassword ? "text" : "password"}
                name="NewPassword"
                required
                variant="standard"
                autoComplete="off"
                inputProps={{ maxLength: 35 }}
                value={inputs.NewPassword}
                onChange={handleInputChange}
                sx={{ color: "#fff" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleTogglePasswordVisibility("NewPassword")}
                        edge="end"
                        aria-label={showNewPassword ? "hide password" : "show password"}
                      >
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <Typography color={"#fff"} sx={{ my: 1 }}>
              Confirm Password
            </Typography>
            <FormControl sx={{ width: "100%", marginBottom: "30px" }}>
              <TextField
                type={showConfirmPassword ? "text" : "password"}
                name="ConfirmPassword"
                required
                variant="standard"
                autoComplete="off"
                inputProps={{ maxLength: 35 }}
                value={inputs.ConfirmPassword}
                onChange={handleInputChange}
                sx={{ color: "#fff" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleTogglePasswordVisibility("ConfirmPassword")}
                        edge="end"
                        aria-label={showConfirmPassword ? "hide password" : "show password"}
                      >
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {!isPasswordMatch && inputs.ConfirmPassword && (
                <Typography sx={{ color: "red" }}>
                  Passwords do not match
                </Typography>
              )}
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "100%",
                height: "40px",
                borderRadius: "30px",
                fontSize: "1rem",
                fontWeight: "600",
                transition: "background-color 0.4s ease",
                backgroundColor: isPasswordMatch ? "#858BC5" : "grey",
              }}
              disabled={!isFormFilled || !isPasswordMatch}
            >
              Confirm
            </Button>
          </form>
        </section>
      </Box>
    </Container>
  );
};

export default UpdatePassword;
