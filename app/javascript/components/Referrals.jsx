import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";
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
        { headers: { Authorization: getCookie("userToken") } }
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

  const handleLogout = async () => {
    try {
      const response = await axios.delete("/users/sign_out", {
        headers: { Authorization: getCookie("userToken") },
      });
      console.log(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  return (
    <Box sx={{ maxWidth: 500, margin: "auto" }}>
      <Box component="span">
        <Typography variant="h4" component="h1" sx={{ float: "left" }} gutterBottom>
          Referrals
        </Typography>
        <Button variant="outlined" size="small" sx={{ float: "right" }} endIcon={<LogoutIcon />} onClick={handleLogout}>
          Logout
        </Button>
      </Box>
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
