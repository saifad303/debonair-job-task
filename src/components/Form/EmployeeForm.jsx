import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  makeStyles,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import { UseInputField, Validation } from "../../hooks/UseInputField";

const EmployeeForm = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [divisionId, setDivisionId] = useState(0);
  const [distId, setDistrictId] = useState(0);

  const validationSchema = Yup.object().shape({
    firstName: Validation(" Name Required"),
    lastName: Validation("Last Name Required"),
    divisionId: Yup.number()
      .test("is-not-zero", "Value cannot be Empty", (value) => value !== 0)
      .required(),
    districeID: Yup.number()
      .test("is-not-zero", "Value can not be empty", (value) => value !== 0)
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      employeeType: "Employee",
      divisionId: divisionId,
      districeID: distId,
      disvision: "",
      district: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema,
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
          <UseInputField
            id="firstName"
            name="firstName"
            label="First Name"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />

          <UseInputField
            id="lastName"
            name="lastName"
            label="Last Name"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
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
              onBlur={formik.handleBlur}
              error={
                formik.touched.divisionId && formik.errors.divisionId
                  ? true
                  : false
              }
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
            <Typography color="error">
              {formik.touched.divisionId && formik.errors.divisionId}
            </Typography>
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
              error={
                formik.touched.districeID && formik.errors.districeID
                  ? true
                  : false
              }
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
            <Typography color="error">
              {formik.touched.districeID && formik.errors.districeID}
            </Typography>
          </Box>
        </Box>
        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default EmployeeForm;
