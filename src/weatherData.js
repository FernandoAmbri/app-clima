const APP_ID = "492f84b14e4578c295a9db7ea82d3299";

function buildURL(urlString) {
  const url = `https://api.openweathermap.org/data/2.5/weather?${urlString}&units=metric&appid=${APP_ID}`;
  return url;
}

async function getDataFromAPI(url) {
  try {
    const response = await fetch(url);

    if (response.status === 404) {
      alert(`City not found.`);
    }

    const weatherData = await response.json();
    return {
      weather: weatherData.weather,
      main: weatherData.main,
      wind: weatherData.wind,
      cityName: weatherData.name,
    };
  } catch (err) {
    console.error(err);
  }
}

export { getDataFromAPI, buildURL };
