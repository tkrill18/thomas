// Defines global variables for later use.
var randomUserURL = "https://randomuser.me/api/";
var restCountriesURL = "https://restcountries.eu/rest/v2/alpha"

// Makes an AJAX call to the RU API.
$.ajax({
    url:randomUserURL
}).done(function(data){
    handleRUData(data);
});

// Makes an AJAX call to the RC API for country names.
// $.ajax({
//     url:restCountriesURL +
// })

var handleRUData = (data) => {
    // Parses the JSON for relevant information.
    var firstName = data.results[0].name.first;
    var lastName = data.results[0].name.last;
    var state = data.results[0].location.state;
    var photo = data.results[0].picture.large;
    var countryCode = data.results[0].nat;

    for (var i = 0; i < 10; i++) {
        $(".dropdown-menu").append(
            "<li><a href='#'>Action " + i +"</a></li>"
        )
    }

    // Appends the RU information to the DOM.
    $("#card").append(
        "<h1>" +
            firstName + " " + lastName +
        "</h1>" +
        "<h2 id='location'>" +
            state +
        "</h2>" +
        "<img class='img-circle img-thumbnail' src='" +
        photo +
        "' >"
    );

    // Makes a call to the RC API.
    $.ajax({
        url:restCountriesURL + "?codes=" + countryCode
    }).done(function(data){
        handleRCData(data);
    });

}

var handleRCData = (data) => {
    var countryName = data[0].name;
    var currentString = $("#location").html();
    $("#location").html(currentString + ", " + countryName);
}

var loadRCDropdown = () => {

}