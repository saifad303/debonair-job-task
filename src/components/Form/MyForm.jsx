import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";

const MyForm = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [divisionId, setDivisionId] = useState(0);
  const [distId, setDistrictId] = useState(0);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      employeeType: "",
      divisionId: divisionId,
      districeID: distId,
      disvision: "",
      district: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const divisionIdHandler = (e, divID) => {
    e.preventDefault();
    console.log(divID);
    formik.setFieldValue("divisionId", divID);
    setDivisionId(divID);
  };

  const districtIdHandler = (e, distID) => {
    e.preventDefault();
    formik.setFieldValue("districeID", distID);
    setDistrictId(distID);
  };

  useEffect(() => {
    axios.get("http://59.152.62.177:8085/api/Employee/Division").then((res) => {
      console.log(res.data.readDivisionData);
      setDivisions(res.data.readDivisionData);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://59.152.62.177:8085/api/Employee/District/${divisionId}`)
      .then((res) => {
        console.log(res.data.readDistrictData);
        setDistricts(res.data.readDistrictData);
      });
  }, [divisionId]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box
          display={`flex`}
          justifyContent={`center`}
          alignItems={`center`}
          sx={{ gap: "20px" }}
        >
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Box>
        <Box
          mt={`20px`}
          display={`flex`}
          justifyContent={`space-between`}
          sx={{ gap: "20px" }}
        >
          <Box width={"50%"}>
            <InputLabel id="demo-simple-select-label">Division</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              name="disvision"
              value={formik.values.disvision}
              onChange={formik.handleChange}
            >
              {divisions.map((division, idx) => (
                <MenuItem
                  value={division.divisionName}
                  key={idx}
                  onClick={(e) => divisionIdHandler(e, division.divID)}
                >
                  {division.divisionName}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box width={"50%"}>
            <InputLabel id="demo-simple-select-label">District</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              name="district"
              value={formik.values.district}
              onChange={formik.handleChange}
            >
              {districts.map((district, idx) => (
                <MenuItem
                  onClick={(e) => districtIdHandler(e, district.districtID)}
                  value={district.districtName}
                  key={idx}
                >
                  {district.districtName}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <FormControl sx={{ mt: "20px" }}>
          <FormLabel id="demo-radio-buttons-group-label">User Type</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="employeeType"
            value={formik.values.employeeType}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              label="Employee"
              value="Employee"
              control={<Radio />}
            />
            <FormControlLabel label="Admin" value="Admin" control={<Radio />} />
          </RadioGroup>
        </FormControl>
        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default MyForm;
