var apiKey = "23346a4286e014dc1c7ba261140705ca"; 
var prevSearch = JSON.parse(localStorage.getItem("weather")); //calls item from local storage mac and ryan helped me with this i still cant get it to work 
var city = $("#cityName").val();

//stores search item to local storage
$("#searchBtn").on("click", function () {
    prevSearch.push(city)
    localStorage.setItem("weather", JSON.stringify(prevSearch))
    showWeather(city)
})

/// makes the main jumbotron with info adds 
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


$.ajax("https://api.openweathermap.org/data/2.5/forecast?q=London&appid=23346a4286e014dc1c7ba261140705ca")
.then(function (response) {
    console.log(response);

    var array = response.list

    for (let i = 0; i < array.length; i+=8) {  //made a for loop that loops over the hourly array increased it by 8 to get a differnt day each time
        var card = $("<div>").addClass("card bg-danger col-md-2") // added the cards
        var date = $("<div>").text(array[i].dt_txt) // added the date
        var temp = $("<div>").text(array[i].main.temp + "F")  // temp
        var humidity = $("<div>").text( array[i].main.humidity) ./// humidity
        card.append(date, temp, humidity) //apended the info into the cards
        $("#futureWeather").append(card) //appended the cards to the future weather div 
    }
})
