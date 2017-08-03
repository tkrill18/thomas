var basePokeAPIURL = "http://pokeapi.co/api/v2/pokemon/"
var currentPkmnName = "";

$(document).ready(function() {

    $("#next-button").on("click", function() {
        $("#guess-input").val("");
        $("#answer").html("Enter your guess:");
        $("#next-button").addClass("disabled");
        $("#next-button").prop("disabled", true);
        var pokedexNum = Math.floor(Math.random() * 721);
        getPkmnAjax(pokedexNum);
        $("body").addClass("bg-faded");
        $("body").removeClass("bg-success text-success bg-danger text-danger");
        $(".btn").addClass("btn-default");
        $(".btn").removeClass("btn-success btn-danger");
        
        $("#guess-input").focus();
        return false;
    });

    $("#submit-button").on("click", function() {
        var guess = $("#guess-input").val();
        if (guess.toLowerCase() == currentPkmnName) {
            $("body").addClass("bg-success text-success");
            $("body").removeClass("bg-faded");
            $(".btn").addClass("btn-success");
            $(".btn").removeClass("btn-secondary");
            $("#answer").html("Correct! It&rsquo;s " + currentPkmnName + "! <i class='fa fa-check' aria-hidden='true'></i>");
        }
        else {
            $("body").addClass("bg-danger text-danger");
            $("body").removeClass("bg-faded");
            $(".btn").addClass("btn-danger");
            $(".btn").removeClass("btn-default");
            $("#answer").html("Sorry. It&rsquo;s " + currentPkmnName + "! <i class='fa fa-times' aria-hidden='true'></i>");
        }
        $("#trial").css("filter", "none");
        $("#submit-button").addClass("disabled");
        $("#submit-button").prop("disabled", true);
        $("#next-button").removeClass("disabled");
        $("#next-button").prop("disabled", false);
        $("#guess-input").prop("disabled", true);
        $("#next-button").focus();
        return false;
    }); 
    $("#next-button").trigger("click");
});

function getPkmnAjax(pokedexNum) {
    $("#trial").hide();
    $(".loader").show();
    $.getJSON(basePokeAPIURL + pokedexNum)
        .done(function(data) {
            var name = data.name;
            var imgURL = data.sprites.front_default;
            $("#trial").attr('src', imgURL);
            $("#trial").css("filter", "brightness(0)");
            currentPkmnName = name;
            $(".loader").hide();
            $("#trial").show();

            $("#submit-button").removeClass("disabled");
            $("#submit-button").prop("disabled", false);
            $("#guess-input").prop("disabled", false);
            $("#guess-input").focus();
        })
        .fail(function() {
            console.log("Failed loading Pokemon #" + pokedexNum);
        });
}

