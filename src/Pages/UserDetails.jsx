import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import axios from "axios";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const UserDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://59.152.62.177:8085/api/Employee/IndividualEmployeeData/${id}`
      )
      .then((res) => {
        console.log(res.data.readEmployeeData[0]);
        setUser(res.data.readEmployeeData[0]);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <Box
      sx={{ backgroundColor: "lightGray", height: "100vh" }}
      display={`flex`}
      justifyContent={`center`}
      alignItems={`center`}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          Name: {user.firstName} {user.lastName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Role: {user.employeeType}
        </Typography>
        <Typography variant="body2">Division: {user.disvision}</Typography>
        <Typography variant="body2">District: {user.district}</Typography>
      </CardContent>
    </Box>
  );
};

export default UserDetails;
