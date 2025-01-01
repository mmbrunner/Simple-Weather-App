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

// SELECTING ELEMENTS FOR 3 DAY FORECAST
    // Using a for loop to iterate over the number of days and selects the elements
    // Selected elements are then added to the weatherDays object as properties of the day object
const days = 3;
const weatherDays = {};

for (let i = 1; i <= days; i++) {
    const iconElement = document.querySelector(`.day-weather-icon${i}`);
    const temperatureElement = document.querySelector(`.day-temperature-value${i}`);
    const descriptionElement = document.querySelector(`.day-weather-description${i}`);

    if (iconElement && temperatureElement && descriptionElement) {
        weatherDays[`day${i}`] = {
            icon: iconElement,
            temperature: temperatureElement,
            description: descriptionElement
        };
    }
};

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
        .then(function(data) {
            weather.temperature.currentValue = Math.floor(((data.main.temp - KELVIN) * (9/5)) + 32); //Converts from Kelvin to Fahrenheit
            weather.currentDescription = data.weather[0].description;
            weather.currentIconId = data.weather[0].icon;
            weather.currentCity = data.name;
            weather.currentCountry = data.sys.country;
            displayCurrentWeather()
        });
};

// GET 3 DAY FORECAST FROM API 
function dayGetWeather(latitude, longitude){
    let dayAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`;

    console.log(dayAPI); // just for being able to double check answers

    fetch(dayAPI)
        .then(function(response){
            return response.json();
        })
        .then(function(data){ 
            weather.day1IconId = data.list[7].weather[0].icon;
            weather.day2IconId = data.list[15].weather[0].icon;
            weather.day3IconId = data.list[23].weather[0].icon;
            weather.temperature.day1Value = Math.floor(((data.list[7].main.temp - KELVIN) * (9/5)) + 32);
            weather.temperature.day2Value = Math.floor(((data.list[15].main.temp - KELVIN) * (9/5)) + 32);
            weather.temperature.day3Value = Math.floor(((data.list[23].main.temp - KELVIN) * (9/5)) + 32);
            weather.day1Description = data.list[7].weather[0].description;
            weather.day2Description = data.list[15].weather[0].description;
            weather.day3Description = data.list[23].weather[0].description;
            displayDayWeather();
        });
}; 

// DISPLAY CURRENT WEATHER TO UI
function displayCurrentWeather(){
    currentIconElement.innerHTML = `<img src="icons/${weather.currentIconId}.png"/>`;
    currentTemperatureElement.innerHTML = `${weather.temperature.currentValue}°<span>F</span>`;
    currentDescriptionElement.innerHTML = weather.currentDescription;
    currentLocationElement.innerHTML = `${weather.currentCity}, ${weather.currentCountry}`;
}; 

// DISPLAY 3 DAY FORECAST TO UI 
    // Weather information for each day is retrieved from the weatherDays object and displayed on the corresponding elements in the UI
function displayDayWeather(){
    weatherDays.day1.icon.innerHTML = `<img src="icons/${weather.day1IconId}.png"/>`;
    weatherDays.day2.icon.innerHTML = `<img src="icons/${weather.day2IconId}.png"/>`;
    weatherDays.day3.icon.innerHTML = `<img src="icons/${weather.day3IconId}.png"/>`;
    weatherDays.day1.temperature.innerHTML = `${weather.temperature.day1Value}°<span>F</span>`;
    weatherDays.day2.temperature.innerHTML = `${weather.temperature.day2Value}°<span>F</span>`;
    weatherDays.day3.temperature.innerHTML = `${weather.temperature.day3Value}°<span>F</span>`;
    weatherDays.day1.description.innerHTML = weather.day1Description;
    weatherDays.day2.description.innerHTML = weather.day2Description;
    weatherDays.day3.description.innerHTML = weather.day3Description;
}; 

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