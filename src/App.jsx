import React, { useState, Suspense, lazy } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Container } from "@mui/material";

const AdminUserComponent = lazy(() => import("./components/Admin/User"));
const EmployeeUserComponent = lazy(() =>
  import("./components/Employee/Employee")
);

const App = () => {
  const [value, setValue] = useState("1");
  const [isAdmin, setIsAdmin] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const showAdminHandler = (bool) => {
    setIsAdmin(bool);
  };

  return (
    <Container>
      <Box
        paddingTop={`100px`}
        sx={{ width: "100%", typography: "body1", mt: "10px" }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label="User"
                value="1"
                onClick={() => showAdminHandler(true)}
              />
              <Tab
                label="Employee"
                value="2"
                onClick={() => showAdminHandler(false)}
              />
            </TabList>
          </Box>

          <AdminUserComponent isAdmin={isAdmin}></AdminUserComponent>
          <EmployeeUserComponent isAdmin={isAdmin}></EmployeeUserComponent>
        </TabContext>
      </Box>
    </Container>
  );
};

export default App;
