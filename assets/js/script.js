// figure out the weather api and how to link it

// need a form and a button maybe statically---done

var cityName = document.querySelector("#cityName");
var searchBtn = document.querySelector("#searchBtn");
var mainCard = document.querySelector(".main-weather");
var weatherKey = "741a923767f4a3255ecec817ac51aa4b";

searchBtn.addEventListener("click", searchWeather);

function searchWeather() {
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${weatherKey}&units=imperial`;

  fetch(currentWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (currentWeatherData) {
      console.log(currentWeatherData);

      var uvUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentWeatherData.coord.lat}&lon=${currentWeatherData.coord.lon}&appid=${weatherKey}`;
      console.log(uvUrl);
      fetch(uvUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (uvData) {
          console.log(uvData);
          mainCard.innerHTML = `
           <h2>
            ${currentWeatherData.name} (${moment(
            currentWeatherData.dt,
            "X"
          ).format("MM/DD/YYYY")})
            <img src="http://openweathermap.org/img/w/${
              currentWeatherData.weather[0].icon
            }.png" alt="" />
          </h2>
          <div class="main-card-info">
            <article>temp:${currentWeatherData.main.temp}</article>
            <article>wind:${currentWeatherData.wind.speed}</article>
            <article>humidity:${currentWeatherData.main.humidity}</article>
            <article>UV index:${uvData.current.uvi}</article>
          </div>
    
      `;
        });
    });
}

//need the button to talk to the weather api with the users input

// need the input of the user to go to the api and store the data in the browser

// need to display the data from storage that was retrieved by the api on the screen in a weather widget

//need the weather of the searched area to display a 5 day forecast under the today forecast maybe with cards, not statically? or statically?

//need all of the previous searches to display under the search bar as buttons to be pressed
