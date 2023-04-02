import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

import { getCookie } from "../utils";

const Referrals = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [referrals, setReferrals] = useState([]);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNewReferral = async () => {
    try {
      await axios.post(
        "/api/v1/referrals",
        { email },
        { withCredentials: true }
      );
      setEmail("");
      fetchReferrals();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReferrals = async () => {
    try {
      const userToken = getCookie("userToken");
      const response = await axios.get("/api/v1/referrals", {
        headers: { Authorization: userToken },
      });

      setReferrals(response.data.referrals);
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  return (
    <Box sx={{ maxWidth: 500, margin: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Referrals
      </Typography>
      <TextField
        id="email"
        label="Email"
        value={email}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleNewReferral}
      >
        Send Referral
      </Button>
      <List sx={{ mt: 2 }}>
        {referrals.map((referral) => (
          <ListItem key={referral.id}>
            <ListItemText primary={referral.email} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Referrals;
