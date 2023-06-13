import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MyForm from "../Form/MyForm";

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

const MyModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Add User
      </Button>
      <Modal
        open={open}
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
              Add User Information
            </Typography>
            <Button onClick={handleClose} variant="contained" color="error">
              Close
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <MyForm></MyForm>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default MyModal;
