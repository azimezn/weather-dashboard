var $submitButton = document.querySelector("#submit-button");
var $cityInput = document.querySelector("#city-input");
var $cityName = document.querySelector(".city-name");
var $currentDate = document.querySelector(".current-date");
var $currentInfo = document.querySelector(".current-info");

$submitButton.addEventListener('click', getCoordinates);

function getCoordinates () {
    var city = $cityInput.value;
    $cityName.textContent = city;

    var cityWeatherApi = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=48e33596e5a1232d3d02e65e8291a16d`
    
    fetch(cityWeatherApi).then(response=> {

        if(response.ok) response.json().then(data=>{

            if (data.length === 0) {
                console.log("no link");
            } else {
                var newCity = {
                    name: data[0].name,
                    lat: data[0].lat,
                    lon: data[0].lon,
                }
                weatherInfo(newCity);
            }
        })
    })

}



function weatherInfo({lat, lon}) {

    // "units=imperial" is to get results in fahrenheit
    var currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=48e33596e5a1232d3d02e65e8291a16d`;

  
    
    fetch(currentWeatherApi).then(response=> {
        console.log(response);
        if(response.ok) response.json().then(data=> {
            console.log(data);
            displayWeather(data);
        })


    })

}

function displayWeather (data) {

    $currentInfo.innerHTML =
    `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png"></img>
    <li>Temperature: ${data.main.temp}</li>
    <li>Humidity: ${data.main.humidity}</li>
    <li>Wind Speed: ${data.wind.speed}</li>`;

    

}


// function displayForcast ()

// function saveToLS ()

// function createPrevCityClick ()