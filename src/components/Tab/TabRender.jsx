import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function TabRender({ tabList }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mt: 3,
          // "& .MuiTab-root": { lineHeight: 3 },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="secondary"
          indicatorColor="secondary"
          variant="fullWidth"
          // sx={{ backgroundColor: "background.main" }}
        >
          {tabList?.map((e, i) => (
            <Tab
              key={i}
              label={e.title}
              {...a11yProps(i)}
              sx={{
                textTransform: "capitalize",
                fontWeight: value === i && "bold",
                // alignItems:  "start",
              }}
            />
          ))}
        </Tabs>
      </Box>
      {tabList?.map((e, i) => (
        <CustomTabPanel key={i} value={value} index={i}>
          {e.component}
        </CustomTabPanel>
      ))}
    </>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}
