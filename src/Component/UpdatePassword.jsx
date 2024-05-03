import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";

const UpdatePassword = () => {
  const [inputs, setInputs] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const token = Cookies.get("token");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleTogglePasswordVisibility = (passwordType) => {
    switch (passwordType) {
      case "password":
        setShowCurrentPassword((prevShow) => !prevShow);
        break;
      case "newPassword":
        setShowNewPassword((prevShow) => !prevShow);
        break;
      case "confirmPassword":
        setShowConfirmPassword((prevShow) => !prevShow);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        "https://qbitlog-trainee.onrender.com/api/update-password",
        {
          password: inputs.password,
          newPassword: inputs.newPassword,
          confirmPassword: inputs.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Password updated successfully");
        console.log("Password updated successfully");
      }

      setInputs({
        password: "",
        newPassword: "",
        confirmPassword: "",
      });

     
    } catch (error) {
      

      if (error.response && error.response.status === 401) {
        alert("Failed to update password");
        console.error("Failed to update password");
      }

      else if (error.response && error.response.status === 400) {
        alert("Current password is incorrect");
        console.error("current password is incorrect");
      }

      

    }
  };

  useEffect(() => {
    setIsFormFilled(
      inputs.password !== "" &&
        inputs.newPassword !== "" &&
        inputs.confirmPassword !== ""
    );
    setIsPasswordMatch(inputs.newPassword === inputs.confirmPassword);
  }, [inputs]);

  return (
    <Box className="Inner-Box-Layout" maxWidth={700}>
      <form>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography color="#fff" sx={{ my: 1 }}>
              Current Password
            </Typography>
            <FormControl fullWidth>
              <TextField
                type={showCurrentPassword ? "text" : "password"}
                name="password"
                required
                variant="standard"
                autoComplete="off"
                inputProps={{ maxLength: 35 }}
                value={inputs.password}
                onChange={handleInputChange}
                sx={{ color: "#fff" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          handleTogglePasswordVisibility("password")
                        }
                        edge="end"
                        aria-label={
                          showCurrentPassword
                            ? "hide password"
                            : "show password"
                        }
                      >
                        {showCurrentPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography color="#fff" sx={{ my: 1 }}>
              New Password
            </Typography>
            <FormControl fullWidth>
              <TextField
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                required
                variant="standard"
                autoComplete="off"
                inputProps={{ maxLength: 35 }}
                value={inputs.newPassword}
                onChange={handleInputChange}
                sx={{ color: "#fff" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          handleTogglePasswordVisibility("newPassword")
                        }
                        edge="end"
                        aria-label={
                          showNewPassword ? "hide password" : "show password"
                        }
                      >
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography color="#fff" sx={{ my: 1 }}>
              Confirm Password
            </Typography>
            <FormControl fullWidth>
              <TextField
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                variant="standard"
                autoComplete="off"
                inputProps={{ maxLength: 35 }}
                value={inputs.confirmPassword}
                onChange={handleInputChange}
                sx={{ color: "#fff" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          handleTogglePasswordVisibility("confirmPassword")
                        }
                        edge="end"
                        aria-label={
                          showConfirmPassword
                            ? "hide password"
                            : "show password"
                        }
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {!isPasswordMatch && inputs.confirmPassword && (
                <Typography sx={{ color: "red" }}>
                  Passwords do not match
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                width: "100%",
                height: "40px",
                borderRadius: "30px",

                fontSize: "1rem",
                fontWeight: "600",
                backgroundColor: isPasswordMatch ? "#858BC5" : "grey",
              }}
              disabled={!isFormFilled || !isPasswordMatch}
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdatePassword;
