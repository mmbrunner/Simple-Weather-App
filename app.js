// API KEY
const key = "0c109c0ba9a10c9cf2a2c3c04d37a7a5";

// APP CONSTS AND VARS
const KELVIN = 273;

// APP DATA
const weather = {};

weather.temperature = {
    unit : "fahrenheit"
};

// F to C CONVERSION
function fahrenheitToCelsius(temperature){
    return (temperature - 32) * (5/9);
};

// SELECTING ELEMENTS FOR CURRENT WEATHER
const currentIconElement = document.querySelector(".current-weather-icon");
const currentTemperatureElement = document.querySelector(".current-temperature-value p");
const currentDescriptionElement = document.querySelector(".current-temperature-description p");
const currentLocationElement = document.querySelector(".current-location");
const notificationElement = document.querySelector(".notification");

// SELECTING ELEMENTS FOR 3 DAY FORECAST

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser Not Supporting Geolocation</p>"
};

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p></p>`;
};

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    currentGetWeather (latitude, longitude);
    dayGetWeather (latitude, longitude);
};

// GET CURRENT WEATHER FROM API
function currentGetWeather(latitude, longitude){
    let currentAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(currentAPI)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.currentValue = Math.floor(((data.main.temp - KELVIN) * (9/5)) + 32); //Converts from Kelvin to Fahrenheit
            weather.currentDescription = data.weather[0].description; //MAIN INSTEAD OF DESCRIPTION?
            weather.currentIconId = data.weather[0].icon;
            weather.currentCity = data.name;
            weather.currentCountry = data.sys.country;
        })
        .then(function(){
            displayCurrentWeather();
        });
};

// GET 3 DAY FORECAST FROM API
function dayGetWeather(latitude, longitude){
    let dayAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(dayAPI)
        .then

};

// DISPLAY CURRENT WEATHER TO UI
function displayCurrentWeather(){
    currentIconElement.innerHTML = `<img src="icons/${weather.currentIconId}.png"/>`;
    currentTemperatureElement.innerHTML = `${weather.temperature.currentValue}°<span>F</span>`;
    currentDescriptionElement.innerHTML = weather.currentDescription;
    currentLocationElement.innerHTML = `${weather.currentCity}, ${weather.currentCountry}`;
};

// DISPLAY 3 DAY FORECAST TO UI


// WHEN THE USER CLICKS ON THE CURRENT TEMPERATURE ELEMENT
currentTemperatureElement.addEventListener("click", function(){
    if(weather.temperature.currentValue === undefined) return;

    if(weather.temperature.unit == "fahrenheit"){
        let celsius = fahrenheitToCelsius(weather.temperature.currentValue);
        celsius = Math.floor(celsius);

        currentTemperatureElement.innerHTML = `${celsius}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }else{
        currentTemperatureElement.innerHTML = `${weather.temperature.currentValue}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }
});