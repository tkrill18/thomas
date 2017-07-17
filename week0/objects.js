var charizard = {
    "attack": "Blaze",
    "HP": 266,
     "legendary": false,
     "types": ["Fire", "Flying"]
};

function Superhero(realName, ability1, gender, archEnemy) {
    this.realName = realName;
    this.ability1 = ability1;
    this.gender = gender;
    this.archEnemy = archEnemy;

    this.talk = function() {
        console.log("Hi, my real name is " + this.realName);
    }
}

var superman = new Superhero("Clark Kent", "Flight", "Male", "Lex Luther");

var spiderman = new Superhero("Peter Parker", "Webs", "Male", "Vulture");
