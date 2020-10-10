$(document).ready(function () {

    //Initialize state
    var indexLastClick = 0;
    var cities = [];
    var searchBtnEl = $("#searchBtn");
    var citiesBtnEl = $("#citiesBtn");
    var sortedArray = [];
    var citiesObjects = new Object;
    var isCityRemoved = "";
    var countRemovingCities = 0;
    var checkNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    // localStorage.clear();

    // Take cities from localStrage to citiesObjects
    if (localStorage.length > 0) {
        var localStorageArray = new Array();
        for (let i = 0; i < localStorage.length; i++) {
            localStorageArray[i] = localStorage.key(i) + localStorage.getItem(localStorage.key(i));
        }
        sortedArray = localStorageArray.sort();

        for (let i = 0; i < sortedArray.length; i++) {
            if (sortedArray[i].slice(0, 9) === "lastClick") {
                citiesObjects["lastClick"] = sortedArray[i].slice(9, sortedArray[i].length);
            } else if (sortedArray[i].slice(0, 13) === "isCityRemoved") {
                citiesObjects["isCityRemoved"] = sortedArray[i].slice(12, sortedArray[i].length);
            } else if (sortedArray[i].slice(0, 19) === "countRemovingCities") {
                citiesObjects["countRemovingCities"] = sortedArray[i].slice(19, sortedArray[i].length);
            }
            else {
                if (checkNum.indexOf(sortedArray[i][1]) > -1) {
                    citiesObjects[sortedArray[i].slice(0, 2)] = sortedArray[i].slice(2, sortedArray[i].length);
                } else {
                    citiesObjects[sortedArray[i][0]] = sortedArray[i].slice(1, sortedArray[i].length);
                }
            }
        }
        // console.log("citiesObjects " + JSON.stringify(citiesObjects));
    }

    // Push cities to cities Array
    for (keys in citiesObjects) {
        let value = citiesObjects[keys];
        if (keys === "lastClick") {
            indexLastClick = value;
        } else if (keys === "isCityRemoved") {
            isCityRemoved = value;
        } else if (keys === "countRemovingCities") {
            countRemovingCities = value;
        } else {
            cities.push(value);
        }
    }

    // Check Initial Cities in cities Array.
    console.log("initial cities : " + cities);

    // Initial implement
    if (cities.length === 0) {
        // alert("Enter a city where you want to know weather");
    } else {
        displayWeather(cities[indexLastClick]);
        createButton(cities);
    }

    // Search cities
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

        // Check cities repeated
        if (cities.indexOf(cityNameReset) > -1) {
            console.log("Repeated City!!")
            alert("You alread have " + cityNameReset + " button");
            return;
        }

        // Save Last clicked city's Index
        indexLastClick = cities.length;

        // Push city name to LocalStorage
        if (localStorage.length === 0) {
            localStorage.setItem("lastClick", indexLastClick);
            localStorage.setItem("isCityRemoved", "false");
            localStorage.setItem((parseInt(localStorage.length)), cityNameReset);
            localStorage.setItem("countRemovingCities", 0);
        } else {
            localStorage.setItem("lastClick", indexLastClick);
            localStorage.setItem("isCityRemoved", "false");
            localStorage.setItem((parseInt(localStorage.length) + parseInt(countRemovingCities)), cityNameReset);
        }

        // Push cityName to cities Array
        cities.push(cityNameReset);

        // Run CreateButton Function
        createButton(cities);

        // Display Weather
        displayWeather(cities[cities.length - 1]);
    });


    // Create City Button on the left
    function createButton(arrCities) {
        citiesBtnEl.empty();

        arrCities.forEach(function (data) {
            var buttonEl = $("<button>");
            var spanEl = $("<span>");

            spanEl.addClass("close");
            buttonEl.addClass("btn cities");
            buttonEl.attr("city-name", data);

            spanEl.text("x");
            buttonEl.text(data);

            buttonEl.append(spanEl);
            citiesBtnEl.prepend(buttonEl);
        });
    }

    // Display Weather
    function displayWeather(cityName) {
        var apiKey = "55b9b01153577ab02bdcfe93626df0e5";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
        var cityNameEl = $("#cityName");
        var currentTimeEl = $("#currentTime");
        var weatherIconEl = $("#weatherIcon");
        var temperatureEl = $("#temperature");
        var humidityEl = $("#humidity");
        var windspeedEl = $("#windspeed");

        cityNameEl.css({ "font-size": "30px", "color": "black", "margin": "3px 5px 5px 5px", "padding-top": "10px" });
        currentTimeEl.css({ "font-size": "27px", "color": "black", "margin": "0 5px 5px 5px", "padding-top": "10px" });

        // Display Current Weather
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Weather Icon
            var iconNum = response.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconNum + ".png";

            // Convert Unit (Temp Kevin to F, Wind m/s to MPH)
            var degreeF = (response.main.temp - 273.15) * 9 / 5 + 32;
            var windSpeedMPH = response.wind.speed * 2.237;
            var currentDate = new Date(response.dt * 1000);
            var currentDateFormat = currentDate.toLocaleString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });

            // Top right Box
            cityNameEl.text(cityName);
            currentTimeEl.text("(" + currentDateFormat + ")");
            weatherIconEl.attr("src", iconURL);
            temperatureEl.text(degreeF.toFixed(1) + " \xBAF");
            humidityEl.text(response.main.humidity + " %");
            windspeedEl.text(windSpeedMPH.toFixed(1) + " MPH");

            // UV Display Color index- 1-2:green, 3-5:yellow, 6-7:orange, 8-10:red, more than 11:violet.
            function displayUV() {
                // UV Index
                var apiKey = "55b9b01153577ab02bdcfe93626df0e5";
                var lat = response.coord.lat;
                var lon = response.coord.lon;
                var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
                var uvEl = $("#uv");
                uvEl.css({ "color": "white", "padding": "5px", "border-radius": "3px" });

                $.ajax({
                    url: uvURL,
                    method: "GET"
                }).then(function (response) {
                    // console.log(response.value);
                    if (response.value > 10) {
                        uvEl.css({ "background": "rgb(190,0,190)" });
                        // uvEl.text(response.value);
                    } else if (response.value >= 8) {
                        uvEl.css({ "background": "red" });
                        // uvEl.text(response.value);
                    } else if (response.value >= 6) {
                        uvEl.css({ "background": "rgb(255,143,0)" });
                        // uvEl.text(response.value);
                    } else if (response.value >= 3) {
                        uvEl.css({ "background": "rgb(255,213,0)" });
                        // uvEl.text(response.value);
                    } else {
                        uvEl.css({ "background": "green" });
                        // uvEl.text(response.value);
                    }
                    uvEl.text(response.value);

                });
            }

            // Display 5days Weather
            function displayFivedays() {
                var apiKey = "55b9b01153577ab02bdcfe93626df0e5";
                var lat = response.coord.lat;
                var lon = response.coord.lon;
                var FiveDaysURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&units=imperial&appid=" + apiKey;
                var fiveDayForecastEl = $("#fiveDayForecast");
                fiveDayForecastEl.empty();
                $.ajax({
                    url: FiveDaysURL,
                    method: "GET"
                }).then(function (response) {
                    // console.log(response);
                    var dateFiveDays;
                    var iconIdFiveDays;
                    var iconFiveDaysURL;

                    // Get 7days data
                    for (let i = 1; i < 6; i++) {
                        var divEl = $("<div>");
                        var h5El = $("<h5>");
                        var imgEl = $("<img>");

                        divEl.attr("class", "card bg-primary");

                        // Get Date
                        dateFiveDays = new Date(response.daily[i].dt * 1000);
                        // Get icon
                        iconIdFiveDays = response.daily[i].weather[0].icon;
                        iconFiveDaysURL = "http://openweathermap.org/img/w/" + iconIdFiveDays + ".png";

                        // Display Date
                        h5El.text(dateFiveDays.toLocaleString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }));
                        divEl.append(h5El);

                        // Display Icon
                        imgEl.attr("src", iconFiveDaysURL);
                        imgEl.attr("class", "weatherIconClass");
                        divEl.append(imgEl);

                        // Diplay Temp
                        var pTempEl = $("<p>");
                        pTempEl.text("Temp: " + response.daily[i].temp.day + " \xBAF");
                        divEl.append(pTempEl);

                        // Display Humidity
                        var pHumidityEl = $("<p>");
                        pHumidityEl.attr('class', "mb-0");
                        pHumidityEl.text("Humidity: " + response.daily[i].humidity + "%");
                        divEl.append(pHumidityEl);

                        fiveDayForecastEl.append(divEl);
                    }
                });
            }
            displayUV();
            displayFivedays();
        });
    }

    // City Button Clicking Function
    $("#citiesBtn").on("click", "button", function (e) {
        e.preventDefault();

        var CityName = $(this).attr("city-name");
        for (let i = 0; i < cities.length; i++) {
            if (cities[i] === CityName) {
                localStorage.setItem("lastClick", i);
            }
        }
        indexLastClick = localStorage.getItem("lastClick");

        displayWeather(CityName);
    });

    // Function for Close button
    $("#citiesBtn").on("click", "button .close", function (e) {
        e.preventDefault();

        console.log($(this).parent().attr("city-name"));
        console.log(cities);

        var removeCityName = $(this).parent().attr("city-name");
        for (let i = 0; i < localStorage.length; i++) {
            let keyName = localStorage.key(i);
            if (removeCityName === localStorage.getItem(keyName)) {
                localStorage.removeItem(keyName);

                let index = cities.indexOf(removeCityName);
                cities.splice(index, 1);
                removeCityName = "";

                countRemovingCities = parseInt(countRemovingCities) + 1;
                
                localStorage.setItem("lastClick", 0);
                localStorage.setItem("isCityRemoved", "true");
                localStorage.setItem("countRemovingCities", countRemovingCities);
            }
        }
        $(this).parent().css("display", "none");
    })

    $(".resetBtn").on("click", function (e) {
        e.preventDefault();
        localStorage.clear();
        cities = [];
        console.log("cities" + cities);
        $("#citiesBtn").text("");
    })
});