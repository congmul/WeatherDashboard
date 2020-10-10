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
    // console.log("localStorage.length + countRemovingCities : "+ (parseInt(localStorage.length)+countRemovingCities));
    // console.log(countRemovingCities);

    if (localStorage.length > 0) {
        var localStorageArray = new Array();
        for (let i = 0; i < localStorage.length; i++) {
            localStorageArray[i] = localStorage.key(i) + localStorage.getItem(localStorage.key(i));
        }
        sortedArray = localStorageArray.sort();
        console.log(sortedArray);

        for (let i = 0; i < sortedArray.length; i++) {
            // console.log(sortedArray[i].slice(0, sortedArray[i].length - 1));
            if (sortedArray[i].slice(0, 9) === "lastClick") {
                // console.log("lastClick");
                citiesObjects["lastClick"] = sortedArray[i].slice(9, sortedArray[i].length);
            } else if (sortedArray[i].slice(0, 13) === "isCityRemoved") {
                citiesObjects["isCityRemoved"] = sortedArray[i].slice(12, sortedArray[i].length);
            } else if (sortedArray[i].slice(0, 19) === "countRemovingCities"){
                citiesObjects["countRemovingCities"] = sortedArray[i].slice(19, sortedArray[i].length);
            }
            else {
                console.log(sortedArray[i][0]);
                console.log("checkNum : " + checkNum.indexOf(sortedArray[i][1]));
                if(checkNum.indexOf(sortedArray[i][1]) > -1){
                    citiesObjects[sortedArray[i].slice(0,2)] = sortedArray[i].slice(2, sortedArray[i].length);
                }else{
                    citiesObjects[sortedArray[i][0]] = sortedArray[i].slice(1, sortedArray[i].length);
                }
                // console.log("sortedArray[i][0] : " + typeof sortedArray[i][0]);
                
               
            }
        }

        console.log("citiesObjects " + JSON.stringify(citiesObjects));
    }

    for (keys in citiesObjects) {
        console.log("keys: " + keys);
        let value = citiesObjects[keys];
        console.log("value of Objects: " + value);
        if (keys === "lastClick") {
            indexLastClick = value;
        } else if (keys === "isCityRemoved") {
            isCityRemoved = value;
        } else if(keys === "countRemovingCities"){
            countRemovingCities = value;
        }else {
            console.log("Else: " + value)
            cities.push(value);
            // cities.splice(keys - 1, 0, value);
        }
    }

    // Push city name to cities array from LocalStorage
    // for (var i = 0; i < localStorage.length; i++) {
    //     let index = localStorage.key(i);
    //     // console.log("index: " + index);

    //     let value = localStorage.getItem(localStorage.key(i));
    //     if (index === "lastClick") {
    //         indexLastClick = value;
    //     } else if (index === "isCityRemoved") {
    //         countRemovingCities = value;
    //     } else {
    //         // console.log("Else: " + value)
    //         cities.splice(index - 1, 0, value);
    //     }
    // }

    console.log("initial cities : " + cities);
    console.log("testtest : "+ (parseInt(localStorage.length) + countRemovingCities));
    // Initial implement
    if (cities.length === 0) {
        // alert("Enter a city where you want to know weather");
    } else {
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
        

        // Push city name to LocalStorage
        console.log("Push city name: "+ localStorage.getItem("isCityRemoved"));
        
        if(localStorage.length === 0){
            localStorage.setItem("lastClick", indexLastClick);
            localStorage.setItem("isCityRemoved", "false");
            localStorage.setItem((parseInt(localStorage.length)), cityNameReset);
            localStorage.setItem("countRemovingCities", 0);
            console.log("length: 0");
        }else{
            localStorage.setItem("lastClick", indexLastClick);
            localStorage.setItem("isCityRemoved", "false");
            localStorage.setItem((parseInt(localStorage.length) + parseInt(countRemovingCities)), cityNameReset);
            console.log("isCityRemoved: true");
        }
        // else{
        //     localStorage.setItem("lastClick", indexLastClick);
        //     localStorage.setItem("isCityRemoved", "false");
        //     localStorage.setItem((parseInt(localStorage.length)), cityNameReset);
        //     localStorage.setItem("countRemovingCities", 0);
        //     console.log("isCityRemoved: false");
        // }


        // if(localStorage.length === 0 || localStorage.getItem("isCityRemoved") === "false"){
        //     localStorage.setItem("lastClick", indexLastClick);
        //     localStorage.setItem("isCityRemoved", "false");
        //     localStorage.setItem((parseInt(localStorage.length)), cityNameReset);
        //     localStorage.setItem("countRemovingCities", 0);
        //     console.log("length: 0");
        // }else if(localStorage.getItem("isCityRemoved") === "true"){
        //     localStorage.setItem("lastClick", indexLastClick);
        //     localStorage.setItem("isCityRemoved", "false");
        //     localStorage.setItem((parseInt(localStorage.length) + parseInt(countRemovingCities)), cityNameReset);
        //     localStorage.setItem("countRemovingCities", 0);
        //     countRemovingCities = 0;
        //     console.log("isCityRemoved: true");
        // }else{
        //     localStorage.setItem("lastClick", indexLastClick);
        //     localStorage.setItem("isCityRemoved", "false");
        //     localStorage.setItem((parseInt(localStorage.length)), cityNameReset);
        //     localStorage.setItem("countRemovingCities", 0);
        //     console.log("isCityRemoved: false");
        // }
       
        

        // // Push city name to LocalStorage
        // if(localStorage.getItem("isCityRemoved")){
        //     localStorage.setItem((parseInt(localStorage.length) + 1), cityNameReset);
        // }else{
        //     localStorage.setItem((parseInt(localStorage.length)), cityNameReset);
        // }
        
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
            var spanEl = $("<span>");

            spanEl.addClass("close");
            buttonEl.addClass("btn cities");
            buttonEl.attr("city-name", data);

            spanEl.text("x");
            buttonEl.text(data);

            buttonEl.append(spanEl);
            citiesBtnEl.prepend(buttonEl);
        })
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
        for (let i = 0; i < cities.length; i++){
            if(cities[i] === CityName){
                localStorage.setItem("lastClick", i);
            }
        }

        // for (let i = 0; i < localStorage.length; i++) {
        //     var key = localStorage.key(i);
        //     var value = localStorage.getItem(key);
        //     if (value === CityName) {
        //         localStorage.setItem("lastClick", (parseInt(key) - 2));
        //     }
        // }
        indexLastClick = localStorage.getItem("lastClick");

        displayWeather(CityName);
    });

    // // City Button Clicking Function
    // $("#citiesBtn").on("click", "button", function (e) {
    //     e.preventDefault();
    //     // console.log(this.children[0]);
    //     var CityName = $(this).attr("city-name");

    //     for (let i = 0; i < localStorage.length; i++) {
    //         var key = localStorage.key(i);
    //         var value = localStorage.getItem(key);
    //         if (value === CityName) {
    //             localStorage.setItem("lastClick", (parseInt(key) - 2));
    //         }
    //     }
    //     indexLastClick = localStorage.getItem("lastClick");

    //     displayWeather(CityName);
    // });

    $("#citiesBtn").on("click", "button .close", function (e) {
        e.preventDefault();
        // console.log($(this).parent());
        console.log($(this).parent().attr("city-name"));
        console.log(cities);

        var removeCityName = $(this).parent().attr("city-name");
        for (let i = 0; i < localStorage.length; i++) {
            let keyName = localStorage.key(i);
            if (removeCityName === localStorage.getItem(keyName)) {
                // console.log("Before remove : " + cities);
                localStorage.removeItem(keyName);
                let index = cities.indexOf(removeCityName);
                // console.log("index to remove: " + index);
                cities.splice(index, 1);
                // console.log("After remove :" + cities);
                removeCityName = "";
                countRemovingCities = parseInt(countRemovingCities) + 1;
                console.log("countRemovingCities" + countRemovingCities);
                indexLastClick = 1;
                localStorage.setItem("isCityRemoved", "true");
                localStorage.setItem("countRemovingCities", countRemovingCities);
            }
        }
        $(this).parent().css("display", "none");
    })

    $(".resetBtn").on("click", function(e){
        e.preventDefault();
        localStorage.clear();
        $("#citiesBtn").css("display", "none");
    })

});