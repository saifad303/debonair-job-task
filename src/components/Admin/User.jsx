import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../../context/ContextProvider";
import EditAdminForm from "../../Pages/EditForm";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const User = ({ isAdmin }) => {
  const [users, refetchUsersData, isUsersLoading] = useFetchUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setUserId } = useContextProvider();
  const navigate = useNavigate();

  if (isUsersLoading) {
    return "Loading...";
  }

  const userDetailHandler = (e, empID) => {
    e.preventDefault();
    navigate(`/user-detail/${empID}`);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUpdateUser = (updatedUser) => {
    // Logic to update the user in the user list or send an API request
    console.log("Updated user:", updatedUser);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const editShowHandler = (e, id, type) => {
    e.preventDefault();
    navigate(`/edit-user/${id}/${type}`);
  };

  return (
    <TabPanel value="1">
      <Box
        display={`flex`}
        alignItems={`center`}
        justifyContent={`space-between`}
        mb={`20px`}
      >
        <Typography variant="h4">Admin user list</Typography>
        <MyModal isAdmin={isAdmin}></MyModal>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
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
                user.employeeType === "Admin" ||
                user.employeeType === "admin"
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
                          editShowHandler(e, user.empID, user.employeeType)
                        }
                        variant="outlined"
                      >
                        Edit
                      </Button>
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

export default User;
