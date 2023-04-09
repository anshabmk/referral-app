import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState([]);

  const fetchReferrals = async () => {
    try {
      const response = await axios.get("/api/v1/referrals");
      setReferrals(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>There are {referrals.length} referrals.</h1>
    </div>
  );
};

export default Home;
