var $submitButton = document.querySelector("#submit-button");
var $cityInput = document.querySelector("#city-input")
var $cityName = document.querySelector(".city-name")

$submitButton.addEventListener('click', getCoordinates);

function getCoordinates () {
    var city = $cityInput.value

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

    var currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=48e33596e5a1232d3d02e65e8291a16d`;
  
    
    fetch(currentWeatherApi).then(response=> {
        console.log(response);
        if(response.ok) response.json().then(data=> {
            console.log(data);
        })


    })

}

function displayWeather () {
    data.main.temp
}


function displayForcast ()

function saveToLS ()

function createPrevCityClick ()