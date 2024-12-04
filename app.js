// API KEY
const key = "0c109c0ba9a10c9cf2a2c3c04d37a7a5";

// APP CONSTS AND VARS
const KELVIN = 273;

// APP DATA
const weather = {};

weather.temperature = {
    unit : "fahrenheit"
}

// F to C CONVERSION
function fahrenheitToCelsius(temperature){
    return (temperature - 32) * (5/9);
}


// SELECTING ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const temperatureElement = document.querySelector(".temperature-value p");
const descriptionElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location");
const notificationElement = document.querySelector(".notification");

// CHECK IF BROWSER SUPPORTS GEOLOCATION


// SET USER'S POSITION


// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE


// GET WEATHER FROM API PROVIDER


// DISPLAY WEATHER TO UI


// WHEN THE USER CLICKS ON THE .TEMPERATURE ELEMENT
