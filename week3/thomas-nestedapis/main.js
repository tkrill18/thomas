// Defines global variables for later use.
var randomUserURL = "https://randomuser.me/api/";
var restCountriesURL = "https://restcountries.eu/rest/v2/"
var availableCodes = ["AU", "BR", "CA", "CH", "DE", "DK", "ES", "FI", "FR", "GB", "IE", "IR", "NL", "NZ", "TR", "US"];

// Makes an initial AJAX call to the Random User API.
$.ajax({
    url:randomUserURL
}).done(function(data){
    handleRUData(data);
});

// Defines the callback function for the Random User AJAX call.
var handleRUData = (data) => {
    // Parses the JSON for relevant information.
    var firstName = data.results[0].name.first;
    var lastName = data.results[0].name.last;
    var state = data.results[0].location.state;
    var photo = data.results[0].picture.large;
    var countryCode = data.results[0].nat;

    var age = 2017 - data.results[0].dob.split("-")[0];

    // Updates the DOM with the Random User information.
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

    // Makes an AJAX call to the REST Countries API.
    $.ajax({
        url:restCountriesURL + "alpha/?codes=" + countryCode
    }).done(function(data){
        handleRCData(data);
    });

}

// Defines the callback function for the REST Countries AJAX call.
var handleRCData = (data) => {
    // Parses the JSON for relevant information.
    var countryName = data[0].name;
    var currentString = $("#location").html();

    // Updates the DOM with the REST Countries information.
    $("#location").html(currentString + ", " + countryName);
}

// Makes an AJAX call to the RC API for country names to fill out the select form.
$.ajax({
    url:restCountriesURL + "all"
}).done(function(data) {
    loadRCDropdown(data);
})

// Defines the callback function for the REST Countries AJAX call.
var loadRCDropdown = (data) => {
    // Loops through all the countries in the JSON.
    for (country of data) {
        // Adds a country name to the select form if it is on the list of available country codes.
        // `myArray.indexOf(myElement)` returns `-1` if `myElement` is not in `myArray`.
        if (availableCodes.indexOf(country.alpha2Code) != -1) {
            $("#mySelect").append(
                // Sets the `value` attribute of the `option` to the respective country code.
                "<option value=" + country.alpha2Code + ">"+ country.name + "</option>"
            )
        }
    }
    // Changes display from 'loading' to 'complete'.
    $("#myLabel").html("<p>Choose a country to meet somebody from&hellip;</p>")
    $("#mySelect").prop("disabled", false);
}

// Becomes available once the DOM is ready.
$(function() {
    // Updates the information card with a person from the selected country.
    $("#mySelect").on('change', function() {
        // Obtains the country code stored in the `value` attribute.
        var countryCode = $(this).val();
        // Makes an AJAX call to the Random User API with the selected country.
        $.ajax({
            url:randomUserURL + "?nat=" + countryCode
        }).done(function(data){
            handleRUData(data);
        });
    });
})


