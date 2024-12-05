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
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser Not Supporting Geolocation</p>"
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p></p>`;
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather (latitude, longitude);
}

// GET WEATHER FROM API
function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    // OTHER DATA THAT CAN BE FETCHED: COUTNRY, TIMEZONE, PRESSURE, HUMIDITY, WIND SPEED, WIND DIRECTION, FEELS LIKE, MAX/MIN TEMP, SUNRISE/SUNSET

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(((data.main.temp - KELVIN) * (9/5)) + 32); //Converts from Kelvin to Fahrenheit
            weather.description = data.weather[0].description; //MAIN INSTEAD OF DESCRIPTION?
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    temperatureElement.innerHTML = `${weather.temperature.value}°<span>F</span>`;
    descriptionElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// WHEN THE USER CLICKS ON THE .TEMPERATURE ELEMENT
temperatureElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "fahrenheit"){
        let celsius = fahrenheitToCelsius(weather.temperature.value);
        celsius = Math.floor(celsius);

        temperatureElement.innerHTML `${celsius}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }else{
        temperatureElement.innerHTML `${weather.temperature.value}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }
});