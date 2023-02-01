import "./styles.css";
import { getDataFromAPI, buildURL } from "./weatherData";
import {
  displayWeatherInfo,
  resetUnitsMetric,
  toggleUnits,
} from "./weatherContent";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-search");
  const metricUnit = document.getElementById("metric-unit");
  const imperialUnit = document.getElementById("imperial-unit");
  const searchInput = document.getElementById("search-weather-input");

  async function displayCurrentLocationWeather(latitude, longitude) {
    const query = `lat=${latitude}&lon=${longitude}`;
    const url = buildURL(query);
    const weatherData = await getDataFromAPI(url);
    displayWeatherInfo(weatherData);
  }

  async function manageWeatherData() {
    const cityName = searchInput.value;
    const query = `q=${cityName}`;
    const url = buildURL(query.trim());
    const weatherData = await getDataFromAPI(url);
    if (weatherData) {
      resetUnitsMetric();
      displayWeatherInfo(weatherData);
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (searchInput.value.trim()) manageWeatherData();
  });

  function success(position) {
    if (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      displayCurrentLocationWeather(latitude, longitude);
    }
  }

  function error(err) {
    console.error(err);
  }

  navigator.geolocation.getCurrentPosition(success, error);

  imperialUnit.addEventListener("click", toggleUnits);
  metricUnit.addEventListener("click", toggleUnits);
});
