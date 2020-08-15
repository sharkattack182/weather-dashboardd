var apiKey = "23346a4286e014dc1c7ba261140705ca";
var prevSearch = JSON.parse(localStorage.getItem("weather")) || [];
var city = $("#cityName").val();


$("#searchBtn").on("click", function () {
    prevSearch.push(city)
    localStorage.setItem("weather", JSON.stringify(prevSearch))
    showWeather(city)
})


function showWeather() {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        $("#currentWeather").empty() //empties the current contents
        console.log(response); //console.log the apis object
        var jumbotron = $("<div>").addClass("jumbotron");  //added a jumbotron
        var cityName = $("<h2>").text(response.name)  //added the name to a div
        var tempText = $("<div>").text("Temperature: " + response.main.temp + " F°"); //temp
        var humidity = $("<div>").text("Humidity: " + response.main.humidity + " %"); //hum
        var wind = $("<div>").text("Wind Speed: " + response.wind.speed + ""); // wind

        var currentWeatherDiv = $("#currentWeather");
        currentWeatherDiv.append(jumbotron);
        jumbotron.append(cityName);
        jumbotron.append(tempText);
        jumbotron.append(humidity);
        jumbotron.append(wind);
    })
}

