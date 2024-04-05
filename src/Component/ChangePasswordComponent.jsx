import React, { useState } from "react";
import logo from "./logo1.png";
import {
  Button,
  Input,
  FormControl,
  InputLabel,
  Link,
  Container,
  Typography,
  Box,
} from "@mui/material";

const ChangePasswordComponent = () => {
  const [inputs, setInputs] = useState({
    NewPassword: "",
    ConfirmPassword: "",
  });

  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });

    // Check if passwords match
    setIsPasswordMatch(inputs.NewPassword === value);
  };

  const UpdatePassword = (event) => {
    event.preventDefault();

    console.log(inputs);
    // Add logic to update password
  };

  return (
    <Container>
      <div className="logo">
        <img src={logo} alt="Your Logo" width="150vw" height="auto" />
      </div>
      <Box
        sx={{
          maxWidth: "400px",
          backgroundColor: "transparent",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem 3rem",
        }}
      >
        <section>
          <form>
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                textAlign: "center",
                marginBottom: "30px",
                fontWeight: "bold",
              }}
            >
              Change Password{" "}
            </Typography>

            <FormControl sx={{ width: "100%", marginBottom: "30px" }}>
              <InputLabel sx={{ color: "#fff" }}>New Password</InputLabel>
              <Input
                type="password"
                name="NewPassword"
                required
                autoComplete="off"
                inputProps={{ maxLength: 35 }}
                value={inputs.NewPassword}
                onChange={handleInputChange}
                sx={{ color: "#fff" }}
              />
            </FormControl>
            <FormControl sx={{ width: "100%", marginBottom: "30px" }}>
              <InputLabel sx={{ color: "#fff" }}>Confirm Password</InputLabel>
              <Input
                type="password"
                name="ConfirmPassword"
                required
                autoComplete="off"
                inputProps={{ maxLength: 35 }}
                value={inputs.ConfirmPassword}
                onChange={handleInputChange}
                sx={{ color: "#fff" }}
              />
              {!isPasswordMatch && inputs.ConfirmPassword && (
                <Typography sx={{ color: "red" }}>
                  Passwords do not match
                </Typography>
              )}
            </FormControl>

            <Button
              onClick={UpdatePassword}
              variant="contained"
              sx={{
                width: "100%",
                height: "40px",
                borderRadius: "40px",
                fontSize: "1rem",
                fontWeight: "600",
                transition: "background-color 0.4s ease",
                backgroundColor: isPasswordMatch ? "#858BC5" : "grey",
              }}
              color="primary"
              disabled={!isPasswordMatch}
            >
              Confirm
            </Button>
          </form>
        </section>
      </Box>
    </Container>
  );
};

export default ChangePasswordComponent;
