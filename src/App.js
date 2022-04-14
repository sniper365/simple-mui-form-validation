import { useState } from "react";
import { Stack, Paper, Box } from "@mui/material";
import PackageCard from "./components/Card/PackageCard";
import PackageForm from "./components/Form/PackageForm";
import { packages } from "./variables";
import "./App.css";

function App() {
  const [isShow, setIsShow] = useState(false);
  const [selectedPack, setSelectedPack] = useState();

  const handleChange = (data) => {
    setSelectedPack(data);
    setIsShow(true);
  };

  const handleCallback = () => {
    setIsShow(false);
  };

  const handleBack = () => {
    setIsShow(false);
  };

  return (
    <Box sx={{ p: { sx: ".5rem", sm: "1rem", lg: "4rem" }, minHeight: "90vh" }}>
      <Paper
        sx={{
          p: { sx: ".5rem", sm: "1rem", lg: "4rem" },
          height: "100%",
          borderRadius: ".5rem",
        }}
        elevation={8}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent="space-around"
          p={1}
        >
          {isShow ? (
            <PackageForm
              callback={handleCallback}
              onBack={handleBack}
              selectedPack={selectedPack}
            />
          ) : (
            packages.map((pack) => (
              <PackageCard
                key={pack?.insurer_name}
                pack={pack}
                onSelected={handleChange}
              />
            ))
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

export default App;
