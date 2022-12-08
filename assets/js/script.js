var $submitButton = document.querySelector("#submit-button");
var $cityInput = document.querySelector("#city-input");
var $cityName = document.querySelector(".city-name");
var $currentDate = document.querySelector(".current-date");
var $currentInfo = document.querySelector(".current-info");
var $searchHistory = document.querySelector(".seach-history");
var $dayTwo = document.querySelector("#day-two");
var $dayThree = document.querySelector("#day-three");
var $dayFour = document.querySelector("#day-four");
var $dayFive = document.querySelector("#day-five");
var $daySix = document.querySelector("#day-six");

var city;

$submitButton.addEventListener('click', weatherToday);

function init() {

    localStorage.getItem("city")
    //$searchHistory.text = localStorage.getItem("city");
}
init()



function weatherToday() {

    localStorage.setItem("city", $cityInput.value);
    console.log($cityInput.value);
    //$searchHistory.innerHTML = `<li>${$cityInput.value}</li>`

    city = $cityInput.value;

    // "units=imperial" is to get results in fahrenheit
    var weatherTodayAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=48e33596e5a1232d3d02e65e8291a16d`

    fetch(weatherTodayAPI).then(response => {
        if (response.ok) response.json()

            .then(data => {

                if (data.length === 0) {
                    console.log("no link");
                } else {

                    $cityName.textContent = $cityInput.value + " " + (dayjs().format('MM/DD/YYYY'));

                    $currentInfo.innerHTML =
                    `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png"></img>
                    <li>Temperature: ${data.main.temp}</li>
                    <li>Humidity: ${data.main.humidity}</li>
                    <li>Wind Speed: ${data.wind.speed}</li>`;
                    weatherFive();

                }
            })
    })

}

function weatherFive() {

    city = $cityInput.value;

    var weatherFiveAPI = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&limit=1&units=imperial&appid=48e33596e5a1232d3d02e65e8291a16d`

    fetch(weatherFiveAPI).then(response => {
        if (response.ok) response.json()

            .then(data => {
                console.log(data)

                if (data.length === 0) {
                    console.log("no link");
                } else {

                    $dayTwo.textContent = $cityInput.value + " " + (dayjs().add(1, 'day').format('MM/DD/YYYY'));
                    $dayTwo.innerHTML +=
                    `<img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png"></img>
                    <li>Temperature: ${data.list[0].main.temp}</li>
                    <li>Humidity: ${data.list[0].main.humidity}</li>
                    <li>Wind Speed: ${data.list[0].wind.speed}</li>`;

                    $dayThree.textContent = $cityInput.value + " " + (dayjs().add(2, 'day').format('MM/DD/YYYY'));
                    $dayThree.innerHTML +=
                    `<img src="http://openweathermap.org/img/wn/${data.list[8].weather[0].icon}.png"></img>
                    <li>Temperature: ${data.list[8].main.temp}</li>
                    <li>Humidity: ${data.list[8].main.humidity}</li>
                    <li>Wind Speed: ${data.list[8].wind.speed}</li>`;

                    $dayFour.textContent = $cityInput.value + " " + (dayjs().add(3, 'day').format('MM/DD/YYYY'));
                    $dayFour.innerHTML +=
                    `<img src="http://openweathermap.org/img/wn/${data.list[16].weather[0].icon}.png"></img>
                    <li>Temperature: ${data.list[16].main.temp}</li>
                    <li>Humidity: ${data.list[16].main.humidity}</li>
                    <li>Wind Speed: ${data.list[16].wind.speed}</li>`;

                    $dayFive.textContent = $cityInput.value + " " + (dayjs().add(4, 'day').format('MM/DD/YYYY'));
                    $dayFive.innerHTML +=
                    `<img src="http://openweathermap.org/img/wn/${data.list[24].weather[0].icon}.png"></img>
                    <li>Temperature: ${data.list[24].main.temp}</li>
                    <li>Humidity: ${data.list[24].main.humidity}</li>
                    <li>Wind Speed: ${data.list[24].wind.speed}</li>`;

                    $daySix.textContent = $cityInput.value + " " + (dayjs().add(5, 'day').format('MM/DD/YYYY'));
                    $daySix.innerHTML +=
                    `<img src="http://openweathermap.org/img/wn/${data.list[32].weather[0].icon}.png"></img>
                    <li>Temperature: ${data.list[32].main.temp}</li>
                    <li>Humidity: ${data.list[32].main.humidity}</li>
                    <li>Wind Speed: ${data.list[32].wind.speed}</li>`;


                    


                }
            })
    })


}





function displayWeather(data) {





    



}


// function displayForcast ()




// function createPrevCityClick ()