import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EmployeeForm from "../Form/EmployeeForm";
import AdminUserForm from "../Form/AdminUserForm";
import EditAdminForm from "../../Pages/EditForm";
import { useContextProvider } from "../../context/ContextProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MyModal = ({ isAdmin }) => {
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
  const [isAdminUserOpen, setIsAdminUserOpen] = useState(false);

  const handleEmployeeModalOpen = () => setIsEmployeeOpen(true);
  const handleEmployeeModalClose = () => setIsEmployeeOpen(false);

  const handleAdminModalOpen = () => setIsAdminUserOpen(true);
  const handleAdminModalClose = () => setIsAdminUserOpen(false);

  return (
    <div>
      {isAdmin || (
        <Button onClick={handleEmployeeModalOpen} variant="contained">
          Add Employee User
        </Button>
      )}

      {isAdmin && (
        <Button onClick={handleAdminModalOpen} variant="contained">
          Add Admin User
        </Button>
      )}

      <Modal
        open={isEmployeeOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            display={`flex`}
            justifyContent={`space-between`}
            alignItems={`center`}
            marginBottom={`30px`}
          >
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Add Employee User Information
            </Typography>
            <Button
              onClick={handleEmployeeModalClose}
              variant="contained"
              color="error"
            >
              Close
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <EmployeeForm
              handleEmployeeModalClose={handleEmployeeModalClose}
            ></EmployeeForm>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isAdminUserOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            display={`flex`}
            justifyContent={`space-between`}
            alignItems={`center`}
            marginBottom={`30px`}
          >
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Add Admin User Information
            </Typography>
            <Button
              onClick={handleAdminModalClose}
              variant="contained"
              color="error"
            >
              Close
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <AdminUserForm
              handleAdminModalClose={handleAdminModalClose}
            ></AdminUserForm>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default MyModal;
