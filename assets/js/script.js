$(document).ready(function () {

    //Initialize state
    var indexLastClick = 0;
    var cities = [];
    var searchBtnEl = $("#searchBtn");
    var citiesBtnEl = $("#citiesBtn");
    // localStorage.clear();

    // Push city name to cities array from LocalStorage
    for (var i = 0; i < localStorage.length; i++) {
        let index = localStorage.key(i);
        let value = localStorage.getItem(localStorage.key(i));

        if (index === "lastClick") {
            indexLastClick = value;
        } else {
            cities.splice(index, 0, value);
            console.log(cities);
        }
    }
    console.log("LastIndex: " + indexLastClick);
    // console.log(cities);

    // Initial implement
    if (cities.length === 0) {

    } else {
        // console.log(cities);
        displayWeather(cities[indexLastClick]);
        createButton(cities);
    }

    searchBtnEl.on("click", function () {
        var cityName = $("#searchInput").val().trim();

        // City Name - Change First letter into Uppercase, the rest into Lowercase.
        var cityNameReset = "";
        for (let i = 0; i < cityName.length; i++) {
            if (i === 0) {
                cityNameReset += cityName[i].toUpperCase();
            } else {
                cityNameReset += cityName[i].toLowerCase();
            }
        }


        indexLastClick = cities.length;
        localStorage.setItem("lastClick", indexLastClick);

        // Push city name to LocalStorage
        localStorage.setItem(localStorage.length, cityNameReset);
        cities.push(cityNameReset);

        // Run CreateButton Function
        createButton(cities);

        // Display Weather
        displayWeather(cities[cities.length - 1]);

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

    function displayWeather(cityName) {
        var apiKey = "55b9b01153577ab02bdcfe93626df0e5";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
        var cityNameEl = $("#cityName");
        var weatherIconEl = $("#weatherIcon");
        var temperatureEl = $("#temperature");
        var humidityEl = $("#humidity");
        var windspeedEl = $("#windspeed");

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Weather Icon
            var iconNum = response.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + iconNum + "@2x.png";

            // Convert Unit (Temp Kevin to F, Wind m/s to MPH)
            var degreeF = (response.main.temp - 273.15) * 9 / 5 + 32;
            var windSpeedMPH = response.wind.speed * 2.237;
            var timeZoneSecond = response.timezone;
            var timeUTC = response.dt;
            var yearUnixEpoch = 1970;
            var monthUnixEpoch = 1;
            var dayUnixEpoch = 1;
            var thisSeconds = timeUTC + timeZoneSecond;
            var thisMinutes = thisSeconds / 60;
            // var timeZoneHour = (response.timezone / 60) / 60;
            // var today = new Date();
            // console.log(today.toGMTString());
            // console.log("TimeZone: " + timeZoneHour + " Hours");

            console.log(response);

            // Top right Box
            cityNameEl.text(cityName);
            weatherIconEl.attr("src", iconURL);
            temperatureEl.text(degreeF.toFixed(1) + " \xBAF");
            humidityEl.text(response.main.humidity + " %");
            windspeedEl.text(windSpeedMPH.toFixed(1) + " MPH");

            // UV Display
            function displayUV(cityName) {
                // UV Index
                var apiKey = "55b9b01153577ab02bdcfe93626df0e5";
                var lat = response.coord.lat;
                var lon = response.coord.lon;
                var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
                var uvEl = $("#uv");
                uvEl.css({"color": "white", "background": "red", "padding": "5px", "border-radius":"3px"});

                $.ajax({
                    url: uvURL,
                    method: "GET"
                }).then(function (response) {
                    uvEl.text(response.value);
                });
            }
            displayUV();
        });
    }




            // var apiKey = "55b9b01153577ab02bdcfe93626df0e5";
            // var FiveDaysQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + "Seattle" + "&appid=" + apiKey;

            // $.ajax({
            //     url: FiveDaysQueryURL,
            //     method: "GET"
            // }).then(function (response) {
            //     console.log(response);
            // });






        });