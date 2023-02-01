const metricUnit = document.getElementById("metric-unit");
const imperialUnit = document.getElementById("imperial-unit");

const weatherCondition = {
  clearD: "clear-day",
  clearN: "clear-night",
  cloudsD: "clouds-day",
  cloudsN: "clouds-night",
  rain: "rain",
  drizzle: "rain",
  thunderstorm: "thunderstorm",
  snow: "snow",
};

function showImageBackground(main, icon) {
  const imgBackground = document.querySelector(".weather-background");
  imgBackground.classList.remove(imgBackground.classList[1]);
  main = main.toLowerCase();
  icon = icon[2];
  const background = `${main}${icon.toUpperCase()}`;

  if (weatherCondition.hasOwnProperty(main)) {
    imgBackground.classList.add(weatherCondition[main]);
  } else {
    imgBackground.classList.add(weatherCondition[background]);
  }
}

function displayWeatherInfo(weatherObj) {
  const cityName = document.getElementById("city-name");
  const weatherMain = document.getElementById("weather-main");
  const imageIcon = document.getElementById("weather-icon");
  const temperature = document.getElementById("main-temp");
  const feelsLike = document.getElementById("feels-like");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");

  const { main } = weatherObj.weather[0];
  const { icon } = weatherObj.weather[0];

  cityName.textContent = weatherObj.cityName;
  weatherMain.textContent = main;

  imageIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  imageIcon.alt = main;

  temperature.textContent = Math.round(Number(weatherObj.main.temp));
  feelsLike.textContent = `${Math.round(
    Number(weatherObj.main.feels_like)
  )} °C`;

  humidity.textContent = `${weatherObj.main.humidity}%`;
  wind.textContent = `${Math.round(Number(weatherObj.wind.speed))} km/h`;

  showImageBackground(main, icon);
}

function resetUnitsMetric() {
  imperialUnit.classList.remove("active");
  metricUnit.classList.add("active");
}

const convertFarenheitToCelsius = (temp) => Math.round((temp - 32) * (5 / 9));
const convertCelsiusToFarenheit = (temp) => Math.round(temp * (9 / 5) + 32);

function toggleUnits() {
  const mainTemp = this.parentElement.parentElement.children[0];
  const feelsLike =
    this.parentElement.parentElement.parentElement.nextElementSibling
      .children[1];

  let temp = 0;
  let feelsLikeTemp = 0;
  temp = Number(mainTemp.textContent);
  feelsLikeTemp = Number(feelsLike.textContent.split(" ")[0]);

  if (
    this.textContent === "°F" &&
    feelsLike.textContent.split(" ")[1] === "°C"
  ) {
    mainTemp.textContent = convertCelsiusToFarenheit(temp);
    feelsLike.textContent = `${convertCelsiusToFarenheit(feelsLikeTemp)} ${
      this.textContent
    }`;

    metricUnit.classList.remove("active");
  } else if (
    this.textContent === "°C" &&
    feelsLike.textContent.split(" ")[1] === "°F"
  ) {
    mainTemp.textContent = convertFarenheitToCelsius(temp);
    feelsLike.textContent = `${convertFarenheitToCelsius(feelsLikeTemp)} ${
      this.textContent
    }`;

    imperialUnit.classList.remove("active");
  }
  this.classList.add("active");
}

export { displayWeatherInfo, resetUnitsMetric, toggleUnits };
