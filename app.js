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
const currentDescriptionElement = document.querySelector(".current-weather-description p");
const currentLocationElement = document.querySelector(".current-location");
const notificationElement = document.querySelector(".notification");

// SELECTING ELEMENTS FOR 3 DAY FORECAST ///////////////////////////////////////////////////////
const day1IconElement = document.querySelector(".day-weather-icon1");
const day2IconElement = document.querySelector(".day-weather-icon2");
const day3IconElement = document.querySelector(".day-weather-icon3");
const day1TemperatureElement = document.querySelector(".day-temperature-value1");
const day2TemperatureElement = document.querySelector(".day-temperature-value2");
const day3TemperatureElement = document.querySelector(".day-temperature-value3");
const day1DescriptionElement = document.querySelector(".day-weather-description1");
const day2DescriptionElement = document.querySelector(".day-weather-description2");
const day3DescriptionElement = document.querySelector(".day-weather-description3");
const dayLocationElement = document.querySelector(".day-location");
/////////////////////////////////////////////////////////////////////////////////////////////////

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
    notificationElement.innerHTML = `<p>${error.message}</p>`;
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
            return response.json();
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

// GET 3 DAY FORECAST FROM API ///////////////////////////////////////////////////////////////////
function dayGetWeather(latitude, longitude){
    let dayAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`;

    console.log(dayAPI); // just for being able to double check answers

    fetch(dayAPI)
        .then(function(response){
            return response.json();
        })
        .then(function(data){ // not sure if these data.list.etc are right
            weather.day1IconId = data.list[0].weather[0].icon;
            weather.day2IconId = data.list[1].weather[0].icon;
            weather.day3IconId = data.list[2].weather[0].icon;
            weather.temperature.day1Value = Math.floor(((data.list.main.temp - KELVIN) * (9/5)) + 32);
            weather.temperature.day2Value = Math.floor(((data.main.temp - KELVIN) * (9/5)) + 32);
            weather.temperature.day3Value = Math.floor(((data.main.temp - KELVIN) * (9/5)) + 32);
            weather.day1Description = data.weather[0].description;
            weather.day2Description = data.weather[0].description;
            weather.day3Description = data.weather[0].description;
            weather.dayCity = data.city.name;// also can't get the location to load properly
            weather.dayCountry = data.city.country;
        })
        .then(function(){
            displayDayWeather();
        });
}; /////////////////////////////////////////////////////////////////////////////////////////////////

// DISPLAY CURRENT WEATHER TO UI
function displayCurrentWeather(){
    currentIconElement.innerHTML = `<img src="icons/${weather.currentIconId}.png"/>`;
    currentTemperatureElement.innerHTML = `${weather.temperature.currentValue}°<span>F</span>`;
    currentDescriptionElement.innerHTML = weather.currentDescription;
    currentLocationElement.innerHTML = `${weather.currentCity}, ${weather.currentCountry}`;
}; 

// DISPLAY 3 DAY FORECAST TO UI ////////////////////////////////////////////////////////////////////
function displayDayWeather(){
    day1IconElement.innerHTML = `<img src="icons/${weather.day1IconId}.png"/>`;
    day2IconElement.innerHTML = `<img src="icons/${weather.day2IconId}.png"/>`;
    day3IconElement.innerHTML = `<img src="icons/${weather.day3IconId}.png"/>`;
    day1DescriptionElement.innerHTML = weather.day1Description;
    day2DescriptionElement.innerHTML = weather.day2Description;
    day3DescriptionElement.innerHTML = weather.day3Description;
    dayLocationElement.innerHTML = `${weather.dayCity}, ${weather.dayCountry}`;// also can't get the location to load properly
}; /////////////////////////////////////////////////////////////////////////////////////////////////

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