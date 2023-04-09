import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Link,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import axios from "axios";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const referralToken = searchParams.get("referral_token");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/users", {
        user: {
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
        referral_token: referralToken,
      });

      navigate("/login");
      setLoading(false);
    } catch (error) {
      setError(error.response.data.error.join(" ,"));
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography component="h1" variant="h5" align="center">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSignup} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordConfirmation"
            label="Confirm Password"
            type="password"
            id="password_confirmation"
            autoComplete="current-password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress color="inherit" size={25} /> : "Sign up"}
          </Button>
          <Link href="/login" variant="body2">
            Already signed up? Click here to login
          </Link>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
