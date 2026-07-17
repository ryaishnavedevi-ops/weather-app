import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import { getWeather } from "../services/weatherService";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import SearchHistory from "../components/SearchHistory";

function Dashboard() {
  const [weather, setWeather] = useState(null);

  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("weatherSearchHistory");

    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "weatherSearchHistory",
      JSON.stringify(history)
    );
  }, [history]);

  const handleSearch = async (city) => {
    const cityName = city.trim();

    if (!cityName) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await getWeather(cityName);

      const newWeather = {
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].description,
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: (data.wind.speed * 3.6).toFixed(1),
        icon: data.weather[0].icon,
      };

      setWeather(newWeather);

      setHistory((previousHistory) => {
        const filteredHistory = previousHistory.filter(
          (item) =>
            item.toLowerCase() !== newWeather.city.toLowerCase()
        );

        return [newWeather.city, ...filteredHistory].slice(0, 5);
      });
    } catch (error) {
      console.error(error);
      setError("City not found. Please enter a valid city name.");
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryClick = (city) => {
    handleSearch(city);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f8fb",
        pb: 5,
      }}
    >
      <Navbar />

      <Container maxWidth="md">
        <Typography
          variant="h4"
          align="center"
          sx={{
            mt: 4,
            fontWeight: "bold",
          }}
        >
          Check the Weather
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Search for any city to view its current weather
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          {new Date().toDateString()}
        </Typography>

        <SearchBar
          onSearch={handleSearch}
          disabled={loading}
        />

        {error && (
          <Alert
            severity="error"
            onClose={() => setError("")}
            sx={{
              maxWidth: 600,
              mx: "auto",
              mt: 3,
            }}
          >
            {error}
          </Alert>
        )}

        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 5,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {!loading && weather && (
          <WeatherCard weather={weather} />
        )}

        {history.length > 0 && (
          <SearchHistory
            history={history}
            onCityClick={handleHistoryClick}
            onClearHistory={handleClearHistory}
          />
        )}
      </Container>
    </Box>
  );
}

export default Dashboard;