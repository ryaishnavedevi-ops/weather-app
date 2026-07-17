import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = () => {
    if (!city.trim()) {
      alert("Please enter a city name.");
      return;
    }

    onSearch(city);
    setCity("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        maxWidth: 600,
        mx: "auto",
        mt: 4,
      }}
    >
      <TextField
        label="Enter city name"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
      />

      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={handleSubmit}
        sx={{ px: 3 }}
      >
        Search
      </Button>
    </Box>
  );
}

export default SearchBar;