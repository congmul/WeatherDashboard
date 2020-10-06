$(document).ready(function () {

var cities = ["Seattle", "Seoul"];
var searchBtnEl = $("#searchBtn");
var citiesBtnEl = $("#citiesBtn");

searchBtnEl.on("click", function () {
    var cityName = $("#searchInput").val().trim();
    var cityNameReset = "";
    for (let i = 0; i < cityName.length; i++) {
        if (i === 0) {
            cityNameReset += cityName[i].toUpperCase();
        } else {
            cityNameReset += cityName[i].toLowerCase();
        }
    }
    cities.push(cityNameReset);
    createButton(cities);
})

function createButton(arrCities) {
    citiesBtnEl.empty();

    arrCities.forEach(function (data) {
        var buttonEl = $("<button>");
        buttonEl.addClass("btn cities");
        buttonEl.attr("city-name", data);
        buttonEl.text(data);
        citiesBtnEl.prepend(buttonEl);
    })
}

createButton(cities);

var apiKey = "55b9b01153577ab02bdcfe93626df0e5";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cities[1]+"&appid="+apiKey;
var cityNameEl = $("#cityName");
var temperatureEl = $("#temperature");
var humidityEl = $("#humidity");
var windspeedEl = $("#windspeed");
var uvEl = $("#uv");

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    // Convert Unit (Temp Kevin to F, Wind m/s to MPH)
    var degreeF = (response.main.temp - 273.15) * 9/5 + 32;
    var windSpeedMPH = response.wind.speed * 2.237;
    var timeZoneHour = (response.timezone / 60) / 60;

    cityNameEl.text(cities[1]);
    temperatureEl.text(degreeF.toFixed(1) + " \xBAF");
    humidityEl.text(response.main.humidity +" %");
    windspeedEl.text(windSpeedMPH.toFixed(1) +" MPH");
    // uvEl.text(respond.);
    // cityNameEl.text(response.);
    console.log(response);
    var today = new Date();
    console.log(today.toGMTString());
    console.log("TimeZone: " + timeZoneHour + " Hours");

}); 



});