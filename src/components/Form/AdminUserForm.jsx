import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Box, Button } from "@mui/material";
import { UseInputField, Validation } from "../../hooks/UseInputField";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminUserForm = ({ handleAdminModalClose }) => {
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
    onSubmit: (values, { resetForm }) => {
      axios
        .post(
          `http://59.152.62.177:8085/api/Employee/SaveEmployeeInformation`,
          { ...values },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          handleAdminModalClose(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Admin Information has successfully entered.",
            showConfirmButton: false,
            timer: 2500,
          });
        });
    },
    validationSchema,
  });

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
