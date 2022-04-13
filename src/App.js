import { useState } from "react";
import { Stack, Paper, Box } from "@mui/material";
import PackageCard from "./components/Card/PackageCard";
import PackageForm from "./components/Form/PackageForm";
import { packages } from "./variables";
import "./App.css";

function App() {
  const [isshow, setIsshow] = useState(false);
  const [selectedPack, setSelectedPack] = useState();

  const handleChange = (data) => {
    setSelectedPack(data)
    setIsshow(true)
  };

  const handleCallback = (data) => {
    setIsshow(false)
    let info = Object.assign(data, selectedPack)
    info = JSON.stringify(info, null, 2)
    alert(info)
  }

  const handleBack = (data) => {
    setIsshow(false)
  }

  return (
    <Box sx={{ p: "4rem", height: "90vh" }}>
      <Paper
        sx={{ p: "4rem", height: "100%", borderRadius: ".5rem" }}
        elevation={10}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent='center'
        >
          {isshow ? (
            <PackageForm callback={handleCallback} onBack={handleBack} selectedPack={selectedPack}/>
          ) : (
            packages.map((pack) => (
              <PackageCard pack={pack} onSelected={handleChange} />
            ))
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

export default App;
