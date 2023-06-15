import React, { useEffect, useState } from "react";
import TabPanel from "@mui/lab/TabPanel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import MyModal from "../Modal/MyModal";
import useFetchUsers from "../../hooks/useFetchUsers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Employee = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [users, refetchUsersData, isUsersLoading] = useFetchUsers();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isUsersLoading) {
    return "Loading...";
  }

  const userDetailHandler = (e, empID) => {
    navigate(`/user-detail/${empID}`);
  };

  const editShowHandler = (e, id, type, data) => {
    e.preventDefault();

    navigate(`/edit-user/${id}/${type}`, { state: { data: data } });
  };

  return (
    <TabPanel value="2">
      <Box
        display={`flex`}
        alignItems={`center`}
        justifyContent={`space-between`}
        mb={`20px`}
      >
        <Typography variant="h4">Employee user list</Typography>
        <MyModal isAdmin={isAdmin}></MyModal>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Employee Name
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="right"
              >
                Division
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="right"
              >
                District
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="right"
              >
                User Detail
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "16px" }}
                align="right"
              >
                Edit detail
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.readEmployeeData.map((user, idx) => {
              if (
                user.employeeType === "Employee" ||
                user.employeeType === "employee"
              ) {
                return (
                  <TableRow
                    key={idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell align="right">{user.disvision}</TableCell>
                    <TableCell align="right">{user.district}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={(e) => userDetailHandler(e, user.empID)}
                        variant="contained"
                      >
                        Detail
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={(e) =>
                          editShowHandler(
                            e,
                            user.empID,
                            user.employeeType,
                            user
                          )
                        }
                        variant="outlined"
                      >
                        Edit
                      </Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            Text in a modal
                          </Typography>
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                          >
                            Duis mollis, est non commodo luctus, nisi erat
                            porttitor ligula.
                          </Typography>
                        </Box>
                      </Modal>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </TabPanel>
  );
};

export default Employee;
