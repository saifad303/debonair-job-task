import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Box, Button } from "@mui/material";
import { UseInputField, Validation } from "../../hooks/UseInputField";

const AdminUserForm = () => {
  const validationSchema = Yup.object().shape({
    firstName: Validation(" Name Required"),
    lastName: Validation("Last Name Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      employeeType: "Admin",
      divisionId: 0,
      districeID: 0,
      disvision: "",
      district: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema,
  });

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
        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AdminUserForm;
