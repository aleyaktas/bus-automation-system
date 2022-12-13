import { AppBar, Button, Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import styleFn from "./Navbar.styles";
import { Box } from "@mui/system";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Navbar = () => {
  const styles = styleFn();

  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" style={styles.container}>
      <Grid container flexGrow={1}>
        <Grid height="75%" alignContent="center" container>
          <Button>
            <AcUnitIcon sx={styles.navIcon} />
          </Button>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              sx={{ fontSize: "1.4rem" }}
              label="Otobüs Tanımla"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ fontSize: "1.4rem" }}
              label="Sefer Tanımla"
              {...a11yProps(1)}
            />
            <Tab
              sx={{ fontSize: "1.4rem" }}
              label="Bilet Al"
              {...a11yProps(2)}
            />
          </Tabs>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Navbar;
