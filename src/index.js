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

function displayCurrentTemperature(response) {
  let currentCity = response.data.city;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentCity}`;

  let currentTemp = Math.round(response.data.temperature.current);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${currentTemp}`;

  let currentDescription = response.data.condition.description;
  let currentConditions = document.querySelector("#current-conditions");
  currentConditions.innerHTML = `${currentDescription}`;

  let currentHumidity = response.data.temperature.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${currentHumidity}`;

  let currentWindSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `${currentWindSpeed}`;
  console.log(response.data);
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
  let currentUnit = document.querySelector("#current-unit");
  if (currentUnit.textContent === "°F") {
    let temperatures = document.querySelectorAll(".temperature");
    temperatures.forEach(calculateTemperatureInCelsius);
    let units = document.querySelectorAll(".temperature-unit");
    units.forEach(changeUnitsToCelsius);
  }
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentUnit = document.querySelector("#current-unit");
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
