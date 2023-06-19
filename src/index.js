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

displayCurrentTime();

let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", searchCity);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", retrievePosition);
