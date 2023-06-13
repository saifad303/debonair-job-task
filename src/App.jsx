import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

import { Container } from "@mui/material";
import User from "./components/Admin/User";
import Employee from "./components/Employee/Employee";

const App = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box
        paddingTop={`100px`}
        sx={{ width: "100%", typography: "body1", mt: "10px" }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
            >
              <Tab label="User" value="1" />
              <Tab label="Employee" value="2" />
            </TabList>
          </Box>
          <User></User>
          <Employee></Employee>
        </TabContext>
      </Box>
    </Container>
  );
};

export default App;
