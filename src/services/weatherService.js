const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeather(city) {
  const cityName = city.trim();

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      cityName
    )}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch weather data");
  }

  return response.json();
}