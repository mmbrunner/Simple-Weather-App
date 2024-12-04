// API KEY
const key = "0c109c0ba9a10c9cf2a2c3c04d37a7a5";

// APP CONSTS AND VARS
const KELVIN = 273;

// APP DATA
const weather = {};

weather.temperature = {
    unit : "fahrenheit"
}

// SELECTING ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const temperatureElement = document.querySelector(".temperature-value p");
const descriptionElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location");
const notificationElement = document.querySelector(".notification");