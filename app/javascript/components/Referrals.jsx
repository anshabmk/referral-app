import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Text,
} from "@mui/material";

import { getCookie } from "../utils";

const Referrals = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [referrals, setReferrals] = useState([]);
  const [loggingOut, setLoggingOut] = useState(false);
  const [fetchingReferrals, setFetchingReferrals] = useState(false);
  const [sendingReferral, setSendingReferral] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNewReferral = async () => {
    try {
      setSendingReferral(true);
      await axios.post(
        "/api/v1/referrals",
        { email },
        { headers: { Authorization: getCookie("userToken") } }
      );
      setEmail("");
      fetchReferrals();
      setSendingReferral(false);
    } catch (error) {
      console.error(error);
      setSendingReferral(false);
    }
  };

  const fetchReferrals = async () => {
    try {
      setFetchingReferrals(true);
      const userToken = getCookie("userToken");
      const response = await axios.get("/api/v1/referrals", {
        headers: { Authorization: userToken },
      });

      setReferrals(response.data.referrals);
      setFetchingReferrals(false);
    } catch (error) {
      console.error(error);
      navigate("/login");
      setFetchingReferrals(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const response = await axios.delete("/users/sign_out", {
        headers: { Authorization: getCookie("userToken") },
      });
      console.log(response.data.message);
      navigate("/login");
      setLoggingOut(false);
    } catch (error) {
      console.error(error);
      setLoggingOut(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  return (
    <Box sx={{ maxWidth: 500, margin: "auto" }}>
      <Box alignItems="center" display="flex" justifyContent="space-between">
        <Typography variant="h4" component="h1">
          Referrals
        </Typography>
        <Button
          disabled={loggingOut}
          variant="outlined"
          size="small"
          endIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
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
        disabled={sendingReferral}
        variant="contained"
        color="primary"
        sx={{ mt: 2, mb: 2, minWidth: 140 }}
        onClick={handleNewReferral}
      >
        {sendingReferral ? (
          <CircularProgress color="inherit" size={25} />
        ) : (
          "Send Referral"
        )}
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Referred email</TableCell>
            <TableCell>Referral accepted</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fetchingReferrals ? (
            <TableRow>
              <TableCell colSpan={2}>
                <div
                  style={{
                    height: 100,
                    display: "grid",
                    placeContent: "center",
                  }}
                >
                  <CircularProgress size={25} />
                </div>
              </TableCell>
            </TableRow>
          ) : referrals.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2}>
                <div
                  style={{
                    height: 100,
                    display: "grid",
                    placeContent: "center",
                  }}
                >
                  No referrals sent.
                </div>
              </TableCell>
            </TableRow>
          ) : (
            <>
              {referrals.map((referral) => (
                <TableRow key={referral.id}>
                  <TableCell>{referral.email}</TableCell>
                  <TableCell>{referral.pending ? "No" : "Yes"}</TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Referrals;
