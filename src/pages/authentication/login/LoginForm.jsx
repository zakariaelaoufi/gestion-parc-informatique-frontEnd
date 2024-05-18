import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../../redux/Authslice";
import axios from "axios";

import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import logo from "/src/assets/radeef_logo.png";

import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user = {
      userNumber: formData.get("userNbr").trim(),
      password: formData.get("userPassword"),
    };
    if (!user.nbr && !user.password) setShowError(true);
    else {
      authUser(user);
      setShowError(false);
    }
  };
  const authUser = async (userData) => {
    console.log(userData);
    try {
      const url = "/auth/login";
      const {
        data: { access_token, user },
      } = await axios.post(url, userData);
      dispatch(setUser(user));
      dispatch(setToken(access_token));
      navigate("/dashboard/");
    } catch (e) {
      setShowError(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          mb: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ m: 1, opacity: 0.8 }}>
          <img src={logo} alt="" width={"180px"} />

          {/* <LoginRoundedIcon sx={{ color: "secondary.main", fontSize: 48 }} /> */}
        </Box>
        <Typography component="h1" variant="h4">
          Se connecter
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userNbr"
            label="Votre Matricule"
            name="userNbr"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="userPassword"
            label="Votre mot de passe"
            type="password"
            id="userPassword"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="rememberSession"
                value="rememberSession"
                color="primary"
                checked
              />
            }
            label="garder ma session ouverte"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Se connecter
          </Button>
          {showError && (
            <Alert severity="error" sx={{ my: 1 }}>
              le matricule ou le mot de passe est incorrect
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
}
