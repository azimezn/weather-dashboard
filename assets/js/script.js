// global variables
var $submitButton = document.querySelector("#submit-button");
var $cityInput = document.querySelector("#city-input");
var $cityName = document.querySelector(".city-name");
var $currentDate = document.querySelector(".current-date");
var $currentInfo = document.querySelector(".current-info");
var $searchHistory = document.querySelector(".search-history");
var $dayNumber = document.querySelector(".dayNumber");

// initial function
function init() {
    // goes to the function that gets from the local storage to the search history
    loadFromLS();
}

function weatherToday(city) {
    // API to get current weather
    // "units=imperial" is to get results in fahrenheit
    var weatherTodayAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=48e33596e5a1232d3d02e65e8291a16d`;

    // checking the response and then fetching
    fetch(weatherTodayAPI).then((response) => {
        // if response.ok is true, then the API link is working
        if (response.ok)
            response.json().then((data) => {
                // if the API link is working, but there is no data
                if (data.length === 0) {
                    console.log("no link");
                    // if there is data, then get these out of the data
                } else {
                    // function to save to local storage, taking the city name to it
                    saveToLS(data.name);
                    // display city name and current date
                    $cityName.textContent =
                        data.name + " " + dayjs().format("MM/DD/YYYY");

                    //display weather information
                    $currentInfo.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png"></img>
                    <li>Temperature: ${data.main.temp}</li>
                    <li>Humidity: ${data.main.humidity}</li>
                    <li>Wind Speed: ${data.wind.speed}</li>`;
                    // continue to the 5-day forecast with the same city
                    weatherFive(city);
                }
            });
    });
}

function weatherFive(city) {
    // API to get a 5 day weather forecast
    var weatherFiveAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&limit=1&units=imperial&appid=48e33596e5a1232d3d02e65e8291a16d`;

    fetch(weatherFiveAPI).then((response) => {
        if (response.ok)
            response.json().then((data) => {
                if (data.length === 0) {
                    console.log("no link");
                } else {
                    console.log(data);
                    // made a variable for the day becuase i increases by 8, but the day number should only increase by 1
                    var day = 0;
                    // clear previous weather info
                    $dayNumber.innerHTML = "";
                    // for loop to create a new list element and add weather information for the next 5-days
                    for (var i = 0; i < 33; i += 8) {
                        $dayNumber.innerHTML += `<section class="weather-box col">
                        <h4>${dayjs().add(day++, "day").format("MM/DD/YYYY")}</h4>
                        <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png"></img>
                        <li>Temperature: ${data.list[i].main.temp}</li>
                        <li>Humidity: ${data.list[i].main.humidity}</li>
                        <li>Wind Speed: ${data.list[i].wind.speed}</li></section>`;
                    }
                }
            });
    });
}

// function to save to local storage
function saveToLS(cityToSave) {
    // if there is a city, get it. if not, keep it empty
    var localArray = JSON.parse(localStorage.getItem("city")) || [];
    // if city name is already in the array, don't add it
    // cityToSave is the city name from the data
    for (var i = 0; i < localArray.length; i++) {
        if (localArray[i] === cityToSave) {
            return;
        }
    }

    // function to display the search history and take the city name to it
    createHistory(cityToSave);

    // add city to the beginning of the array of searched cities
    localArray.unshift(cityToSave);
    // if there is more than 5 cities, delete the last one
    if (localArray.length > 5) {
        localArray.pop();
    }

    // add city to the array in the local storage
    localStorage.setItem("city", JSON.stringify(localArray));
}

// get from local storage and display in search history
function loadFromLS() {
    var historyArray = JSON.parse(localStorage.getItem("city"));

    for (var i = 0; i < historyArray.length; i++) {
        createHistory(historyArray[i]);
    }
}

// display city in search history. its a separate function because I use it more than once
function createHistory(name) {
    $searchHistory.innerHTML += `<li class="history-tabs">${name}</li>`;
}

// make sure they're clicking specific cities in the search history
function searchHistory(event) {
    if (event.target.matches("li")) {
        weatherToday(event.target.textContent);
    }
}

// because im going through functions, I can't declare the variable in the weather function. i have to do it separately when adding a new one and using an old one
function searchNewCity() {
    var city = $cityInput.value;
    // check the weather
    weatherToday(city);
}

// submit button
$submitButton.addEventListener("click", searchNewCity);
// search history
$searchHistory.addEventListener("click", searchHistory);

// run initial function
init();
