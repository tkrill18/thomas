var randomUserURL = "https://randomuser.me/api/";

$.ajax({
    url:randomUserURL
}).done(function(data){
    var userFirstName = capitalize(data.results[0].name.first);
    var userLastName = capitalize(data.results[0].name.last);
    var userState = capitalize(data.results[0].location.state);
    var userPhoto = data.results[0].picture.large;
    $("#card").append(
        "<h1>" +
            userFirstName + " " + userLastName +
        "</h1>" +
        "<h2>" +
            userState +
        "</h2>" +
        "<img src=" +
        userPhoto +
        " >"
        );
})

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}