function displayCurrentTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
        <div>${formatDay(forecastDay.time)}</div>
        <img
          src="${forecastDay.condition.icon_url}"
          alt="${forecastDay.condition.description}"
        />
        <div>
        <strong>
        <span class="temperature">${Math.round(
          forecastDay.temperature.maximum
        )}</span>
        <span class="temperature-unit">°C</span>
        </strong>
        <br />
        <span class="temperature">${Math.round(
          forecastDay.temperature.minimum
        )}</span>
        <span class="temperature-unit">°C</span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  let apiKey = "d9t2b62704cb0bc0f7548a68c3a2fo46";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayCurrentTemperature(response) {
  let currentCity = response.data.city;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentCity}`;

  let currentDescription = response.data.condition.description;
  let currentConditions = document.querySelector("#current-conditions");
  currentConditions.innerHTML = `${currentDescription}`;

  let weatherIconUrl = response.data.condition.icon_url;
  let weatherIcon = document.querySelector("#current-weather-icon");
  weatherIcon.src = `${weatherIconUrl}`;
  weatherIcon.alt = `${currentDescription}`;

  let currentTemp = Math.round(response.data.temperature.current);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${currentTemp}`;

  let currentHumidity = response.data.temperature.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${currentHumidity}`;

  let currentWindSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `${currentWindSpeed}`;

  getForecast(response.data.coordinates);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  cityInput = cityInput.value.trim();

  let apiKey = "d9t2b62704cb0bc0f7548a68c3a2fo46";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentTemperature);
}

function displayCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "d9t2b62704cb0bc0f7548a68c3a2fo46";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentTemperature);
}

function retrievePosition() {
  navigator.geolocation.getCurrentPosition(displayCurrentPosition);
}

function calculateTemperatureInCelsius(temperature) {
  temperature.innerHTML = Math.round(((temperature.textContent - 32) * 5) / 9);
}

function calculateTemperatureInFahrenheit(temperature) {
  temperature.innerHTML = Math.round((temperature.textContent * 9) / 5 + 32);
}

function changeUnitsToCelsius(unit) {
  unit.innerHTML = unit.textContent.replace("F", "C");
  document.querySelector("#celsius-link").classList.add("active");
  document.querySelector("#fahrenheit-link").classList.remove("active");
}

function changeUnitsToFahrenheit(unit) {
  unit.innerHTML = unit.textContent.replace("C", "F");
  document.querySelector("#fahrenheit-link").classList.add("active");
  document.querySelector("#celsius-link").classList.remove("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  let currentUnit = document.querySelector(".temperature-unit");
  if (currentUnit.textContent === "°F") {
    let temperatures = document.querySelectorAll(".temperature");
    temperatures.forEach(calculateTemperatureInCelsius);
    let units = document.querySelectorAll(".temperature-unit");
    units.forEach(changeUnitsToCelsius);
  }
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentUnit = document.querySelector(".temperature-unit");
  if (currentUnit.textContent === "°C") {
    let temperatures = document.querySelectorAll(".temperature");
    temperatures.forEach(calculateTemperatureInFahrenheit);
    let units = document.querySelectorAll(".temperature-unit");
    units.forEach(changeUnitsToFahrenheit);
  }
}

displayCurrentTime();
retrievePosition();

let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", searchCity);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", retrievePosition);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
