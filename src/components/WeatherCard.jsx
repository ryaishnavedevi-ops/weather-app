import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";

function WeatherCard({ weather }) {
  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <Card
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        borderRadius: 3,
      }}
      elevation={4}
    >
      <CardContent>
        {/* City */}
        <Typography variant="h4" gutterBottom>
          <LocationOnIcon
            sx={{
              verticalAlign: "middle",
              mr: 1,
            }}
          />
          {weather.city}, {weather.country}
        </Typography>

        {/* Temperature and Weather Icon */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 2,
          }}
        >
          <Typography variant="h2" color="primary">
            {weather.temperature}°C
          </Typography>

          <img
            src={iconUrl}
            alt={weather.condition}
            width={90}
            height={90}
          />
        </Box>

        {/* Weather Condition */}
        <Typography
          variant="h6"
          textTransform="capitalize"
          gutterBottom
        >
          {weather.condition}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Feels Like */}
        <Typography sx={{ mb: 1 }}>
          <ThermostatIcon
            fontSize="small"
            sx={{
              mr: 1,
              verticalAlign: "middle",
            }}
          />
          Feels Like: {weather.feelsLike}°C
        </Typography>

        {/* Humidity */}
        <Typography sx={{ mb: 1 }}>
          <WaterDropIcon
            fontSize="small"
            sx={{
              mr: 1,
              verticalAlign: "middle",
            }}
          />
          Humidity: {weather.humidity}%
        </Typography>

        {/* Wind Speed */}
        <Typography>
          <AirIcon
            fontSize="small"
            sx={{
              mr: 1,
              verticalAlign: "middle",
            }}
          />
          Wind Speed: {weather.windSpeed} km/h
        </Typography>
      </CardContent>
    </Card>
  );
}

export default WeatherCard;