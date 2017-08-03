// Defines global variables for later use.
var randomUserURL = "https://randomuser.me/api/";
var restCountriesURL = "https://restcountries.eu/rest/v2/"

var availableCodes = ["AU", "BR", "CA", "CH", "DE", "DK", "ES", "FI", "FR", "GB", "IE", "IR", "NL", "NZ", "TR", "US"];

// Makes an AJAX call to the RU API.
$.ajax({
    url:randomUserURL
}).done(function(data){
    handleRUData(data);
});

var handleRUData = (data) => {
    // Parses the JSON for relevant information.
    var firstName = data.results[0].name.first;
    var lastName = data.results[0].name.last;
    var state = data.results[0].location.state;
    var photo = data.results[0].picture.large;
    var countryCode = data.results[0].nat;

    var age = 2017 - data.results[0].dob.split("-")[0];

    // Appends the RU information to the DOM.
    $("#card").html(
        "<h1>" +
            firstName + " " + lastName + ", " + age +
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
        url:restCountriesURL + "alpha/?codes=" + countryCode
    }).done(function(data){
        handleRCData(data);
    });

}

var handleRCData = (data) => {
    var countryName = data[0].name;
    var currentString = $("#location").html();
    $("#location").html(currentString + ", " + countryName);
}

// Makes an AJAX call to the RC API for country names.
$.ajax({
    url:restCountriesURL + "all"
}).done(function(data) {
    loadRCDropdown(data);
})

var loadRCDropdown = (data) => {
    for (country of data) {
        //console.log(country.name);
        if (availableCodes.indexOf(country.alpha2Code) != -1) {
            $("#mySelect").append(
                "<option value=" + country.alpha2Code + ">"+ country.name + "</option>"
            )
        }
    }
    $("#myLabel").html("<p>Choose a country to meet somebody from&hellip;</p>")
    $("#mySelect").prop("disabled", false);
}

// Document Ready
$(function() {
    $("#mySelect").on('change', function() {
        var countryCode = $(this).val();
        $.ajax({
            url:randomUserURL + "?nat=" + countryCode
        }).done(function(data){
            handleRUData(data);
        });
    });

})


