import React from "react";
import TabPanel from "@mui/lab/TabPanel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import MyModal from "../Modal/MyModal";
import useFetchUsers from "../../hooks/useFetchUsers";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const User = ({ isAdmin }) => {
  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const [users, refetchUsersData, isUsersLoading] = useFetchUsers();
  console.log("From admin = ", users.readEmployeeData);

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
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                User Name
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
