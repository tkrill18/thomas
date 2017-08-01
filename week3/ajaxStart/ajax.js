var YOUR_ID = "eaa0b2c4";
var YOUR_KEY = "3f3b7c3c2173f16dff37aac72f96681f";
var bigMacURL = "https://api.nutritionix.com/v1_1/search/big%20mac?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=" + YOUR_ID + "&appKey=" + YOUR_KEY;

$.ajax({
    url:bigMacURL
}).done(function(data){
    // console.log(data);
    var food = data.hits[0];
    var name = food.fields.item_name;
    var cals = food.fields.nf_calories;
    $("body").append("<h2> This " + name + " has " + cals + "kcal !!!</h2>");
});
