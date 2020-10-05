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