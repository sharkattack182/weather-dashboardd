var apiKey = "23346a4286e014dc1c7ba261140705ca";
var city = $("#city").val();
var prevSearch = JSON.parse(localStorage.getItem("city")) || []; //calls item from local storage mac and ryan helped me with this i still cant get it to work 


//stores search item to local storage  for some reason when i try to finsih this it breaks the api it wont let me return anything i asked my clas mates but noone had any answers for me 
 $("#searchBtn").on("click", function () {
     var location = $("#city").val()
     console.log(location)
     prevSearch.push(location)
    localStorage.setItem("weather", JSON.stringify(prevSearch))
     generateCards();
     showWeather(location)
 })

 

/// makes the main jumbotron with info adds 
function showWeather() {
    var city = $("#city").val()
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
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
        var futureWeatherDiv = $("#futureWeather")
        currentWeatherDiv.append(jumbotron);
        jumbotron.append(cityName);
        jumbotron.append(tempText);
        jumbotron.append(humidity);
        jumbotron.append(wind);

        var queryUVIurl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + apiKey;

        $.ajax({
            url: queryUVIurl,
            mathod: "GET",
        }).then(function (UVIresponse) {
            var UVI = $("<div>").text("UV Index: " + UVIresponse.value)
            jumbotron.append(UVI);
        })
    })
}

function generateCards() {

    var city = $("#city").val();

    $.ajax("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=23346a4286e014dc1c7ba261140705ca")
        .then(function (response) {
            console.log(response);

            var array = response.list;

            for (let i = 0; i < array.length; i += 8) {  //made a for loop that loops over the hourly array increased it by 8 to get a differnt day each time
                var card = $("<div>").addClass("card bg-danger col-md-2"); // added the cards
                var date = $("<div>").text(array[i].dt_txt); // added the date
                var temp = $("<div>").text(array[i].main.temp + "F");  // temp
                var humidity = $("<div>").text(array[i].main.humidity); /// humidity
                card.append(date, temp, humidity); //apended the info into the cards
                $("#futureWeather").append(card); //appended the cards to the future weather div 
            }
        })

}



