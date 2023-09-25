const readlineSync = require('readline-sync');
function getRandomNumberroll() {
    return Math.floor(Math.random() * 6) + 1;
}
function getRandomNumbercard() {
    return Math.floor(Math.random() * 13) + 0;
}
function botnum(min, max) {
    return Math.floor(Math.random() * max) + min;
}
function placestogo() {
    if (typeof prices[space] != "string") {
        console.log("You currently have $" + p1cash);
        getprop = readlineSync.question('Would you like to buy ' + places[space] + ' for $' + prices[space] + '? (y/n)')
        if (getprop == "y") {
            p1prop.push(places[space]);
            p1cash = p1cash - prices[space];
            console.log("You now have $" + p1cash);
            prices[space] = "bought";
        }
    } else {
        if (prices[space] == "chance") {
            getchancecard();
        }
        if (prices[space] == "chest") {
            getchestcard();
        }
        if (prices[space] == "parking") {
            p1cash = p1cash + 500;
            console.log("You landed on Free Parking and earned $500!");
        }
        if (prices[space] == "jail") {
            console.log("You got sent to jail.");
            space = 10;
            checkjail = 1;
        }
        if (prices[space] == "income") {
            console.log("You payed $200 for income tax.")
            p1cash = p1cash - 200;
        }
        if (prices[space] == "lux") {
            p1cash = p1cash - 75;
            console.log("You payed $75 for Luxury Tax and have $" + p1cash + " left.");
        }
        if (prices[space] == "bought") {
            console.log(places[space] + " is already bought.");
            owner = checkowner(space);
            if (owner == "p1") {
                console.log("You own this space.")
            }
            if (owner == "p2") {
                console.log(botname + " owns this space.  You have to pay $" + rent[space] + " to " + botname);
                p1cash = p1cash - rent[space];
                botcash = botcash + rent[space];
                console.log("You now have $" + p1cash);
            }
        }
    }    
}
function checkowner (prop) {
    for(var i = 0; i < p1prop.length; i++) {
        if (places[prop] == p1prop[i]) {
            return("p1");
        }
    }
    for(var i = 0; i < botprop.length; i++) {
        if (places[prop] == botprop[i]) {
            return("p2");
        }
    }
}
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
function getchestcard() {
    chestnum = getRandomNumbercard();
    chestspace = cchest[chestnum];
    if (typeof chestspace == "string") {
        for (var i = 0; i < places.length; i++) {
            if (places[i] == chestspace) {
                chesti = i;
            }
        }
        space = chesti;
        if (chestspace == "Jail/Just Visting") {
            console.log("You got sent to jail!");
            checkjail = 1;
        } else {
            console.log("You are now on " + places[space]);
            placestogo();
        }
    } else {
        p1cash = p1cash + chestspace;
        if (chestspace > 0) {
            console.log("You earned $" + chestspace + "!");
        }
        if (chestspace < 0) {
            console.log("You lost $" + (chestspace * -1));
        }
    }
}
function botgetchestcard() {
    chestnum = getRandomNumbercard();
    chestspace = cchest[chestnum];
    if (typeof chestspace == "string") {
        for (var i = 0; i < places.length; i++) {
            if (places[i] == chestspace) {
                chesti = i;
            }
        }
        botspace = chesti;
        if (chestspace == "Jail/Just Visting") {
            console.log(botname + " got sent to jail!");
            botcheckjail = 1;
        } else {
            console.log(botname + " is now on " + places[space]);
            botplacestogo();
        }
    } else {
        botcash = botcash + chestspace;
        if (chestspace > 0) {
            console.log(botname + " earned $" + chestspace + ".");
        }
        if (chestspace < 0) {
            console.log(botname + " lost $" + (chestspace * -1) + "!");
        }
    }
}
function getchancecard() {
    chancenum = getRandomNumbercard();
    chancespace = chance[chancenum];
    if (typeof chancespace == "string") {
        if (chancespace == "Back Three") {
            space = space - 3;
            console.log("You moved back three spaces.");
            console.log("You are now on " + places[space]);
            placestogo();
        } else {
            for (var i = 0; i < places.length; i++) {
                if (places[i] == chancespace) {
                    chancei = i;
                }
            }
            if (space > chancei) {
                p1cash = p1cash + 200;
                console.log("You passed Go and Collected $200!");
            }
            space = chancei;
            if (chancespace == "Jail/Just Visting") {
                console.log("You got sent to jail!");
                checkjail = 1;
            } else {
                console.log("You are now on " + places[space]);
                placestogo();
            }
        }
    } else {
        p1cash = p1cash + chancespace;
        if (chancespace > 0) {
            console.log("You earned $" + chancespace + "!");
        }
        if (chancespace < 0) {
            console.log("You lost $" + (chancespace * -1));
        }
    }
}
function botgetchancecard() {
    chancenum = getRandomNumbercard();
    chancespace = chance[chancenum];
    if (typeof chancespace == "string") {
        if (chancespace == "Back Three") {
            botspace = botspace - 3;
            console.log(botname + " moved back three spaces.");
        } else {
            for (var i = 0; i < places.length; i++) {
                if (places[i] == chancespace) {
                    chancei = i;
                }
            }
            if (botspace > chancei) {
                botcash = botcash + 200;
                console.log(botname + " passed Go and Collected $200.");
            }
            botspace = chancei;
            if (chancespace == "Jail/Just Visting") {
                console.log(botname + " got sent to jail!");
                botcheckjail = 1;
            } else {
                console.log(botname + " is now on " + places[botspace]);
                botplacestogo();
            }
        }
    } else {
        botcash = botcash + chancespace;
        if (chancespace > 0) {
            console.log(botname + " earned $" + chancespace + ".");
        }
        if (chancespace < 0) {
            console.log(botname  + " lost $" + (chancespace * -1) + "!");
        }
    }
}
function upgradeprop() {
    console.log("Please select from your list of properties.  Upgradeing a property costs $150.  Enter number below.");
    console.log("You currently have $" + p1cash + ".");
    for (var i = 0; i < p1prop.length; i++) {
        uppropi1 = i;
        for (var a = 0; a < places.length; a++) {
            if (places[a] == p1prop[uppropi1]) {
                uppropi2 = a;
            }
        }
        console.log(i + ": " + p1prop[i] + " (Current Rent: $" + rent[uppropi2] + ")");
    }
    upq = readlineSync.question('Number: ');
    sleep(500);
    console.log("You selected " + p1prop[upq] + ".  Correct?");
    upqy = readlineSync.question('Enter here (y/n)');
    if (upqy = "y") {
        for (var i = 0; i < places.length; i++) {
            if (p1prop[upq] == places[i]) {
                uppropi2 = i;
            }
        }
        rent[uppropi2] = rent[uppropi2] * 3;
        p1cash = p1cash - 150;
        console.log("You curretnly have $" + p1cash + ".");
        console.log("Current rent of " + places[uppropi2] + " is now $" + rent[uppropi2] + ".");
        upqy = readlineSync.question('Upgrade another property? (y/n)');
        if (upqy == "y") {
            upgradeprop();
        } else {
            playerturn();
        }
    } else {
        upgradeprop();
    }
}
function roll() {
    if (checkjail == 0) {
        p1_roll =  getRandomNumberroll() + getRandomNumberroll();
        if (p1_roll == 2) {
            p1cash = p1cash + 686;
            console.log("You rolled Snake Eyes and got $686!")
        }
        space = space + p1_roll;
        if (space >= 40) {
            space = space - 40;
            console.log("You passed GO and colleted $200!");
            p1cash = p1cash + 200;
        }
        console.log("You rolled a " + p1_roll + " and landed on " + places[space]);
        sleep(1000);
        placestogo();
    } else {
        console.log("You have $" + p1cash);
        jailq = readlineSync.question('Would you like to pay to get out of jail? (y/n)');
        if (jailq == "y") {
            checkjail = 0;
            p1cash = p1cash - 50;
            console.log("You payed out of Jail and have $" + p1cash + " left!");
        } else {
            jail1 = getRandomNumberroll();
            jail2 = getRandomNumberroll();
            console.log("You rolled a " + jail1 + " and a " + jail2);
            if (jail1 == jail2) {
                console.log("Congrats!  You rolled doubles and got out of jail!");
                checkjail = 0;
            } else {
                console.log("Better luck next time!");
            }
        }
    }
}
function playerturn() {
    if (p1prop.length >= 5) {
        up = ", 4. Upgrade Properties";
    }
    if (p1cash < 0) {
        console.log("You ran out of money.");
        return;
    }
    turnq = readlineSync.question("Would you like to, 1. Roll the dice, 2. View Stats, 3. View " + botname + "'s stats" + up + " (Enter Number)")
    if (turnq == 1) {
        roll();
    }
    if (turnq == 5) {
        return;
    }
    if (turnq == 2) {
        sleep(1500);
        console.log("You have $" + p1cash);
        console.log("Your current space is " + places[space]);
        console.log("Your properties are: ");
        for (var i = 0; i < p1prop.length; i++) {
            console.log(i + ":" + p1prop[i]);
        }
        turnq = readlineSync.question('Press Y to continue.')
        if (turnq =="y") {
            playerturn();
        }
    }
    if (turnq == 3) {
        console.log(botname + " has $" + botcash);
        sleep(300);
        console.log(botname + " is currently on " + places[botspace]);
        sleep(300);
        console.log(botname + "'s properties are:");
        for (var i = 0; i < botprop.length; i++) {
            sleep(100);
            console.log(i + ": " + botprop[i]);
        }
        turnq = readlineSync.question('Press Y to continue ');
        playerturn();
    }
    if (turnq == 4 && p1prop.length >= 5) {
        upgradeprop();
    }    
    console.log(botname + "'s turn:");
    sleep(500);
    botturn();
}
function botturn () {
    if (botcash < 0) {
        console.log(botname + " ran out of money and you win!");
        return;
    }
    console.log(botname + " is deciding.");
    sleep(1500);
    if (botnum(1, 3) == 1 && botprop.length >= 5) {
        if (botcash >= 250) {
            console.log(botname + " is deciding which proerty to upgrade.");
            botup1 = botnum(0, botprop.length);
            for (var i = 0; i < places.length; i++) {
                if (places[i] == botprop[botup1]) {
                    botup2 = i;
                }
            }
            sleep(1000);
            console.log(botname + " choose " + places[botup2] + " to upgrade.");
            rent[botup2] = rent[botup2] * 3;
            console.log(places[botup2] + "'s rent is now $" + rent[botup2]);
            botcash = botcash - 150;
        } 
    } 
    if (botcheckjail == 0) {
        console.log(botname + " is rolling.");
        sleep(1000);
        botroll = getRandomNumberroll() + getRandomNumberroll();
        botspace = botspace + botroll;
        if (botspace >= 40) {
            botspace = botspace - 40;
            botcash = botcash + 200;
        }
        if (botroll == 2) {
            console.log(botname + " got snake eyes and earned $686");
            botcash = botcash + 686;
        }
        console.log(botname + " rolled a " + botroll + " and landed on " + places[botspace]);
        botplacestogo();
    } else {
        if (botcash > 200) {
            console.log(botname + " payed to get out of jail.");
            botcash = botcash - 50;
            botcheckjail = 0;
            console.log("Your turn!");
            sleep(1000);
        } else {
            console.log(botname + " decided to try to roll out of jail.");
            jail1 = getRandomNumberroll();
            jail2 = getRandomNumberroll();
            if (jail1 == jail2) {
                console.log(botname + " got out of jail.");
                botcheckjail = 0;
            } else {
                console.log(botname + " rolled a " + jail1 + " and a " + jail2 + " and failed at life.  " + botname + " remains in jail.");
            }
        }
    }
    sleep(1500);
    console.log("Your turn!");
    playerturn();
}
function botplacestogo() {
    if (typeof prices[botspace] != "string") {
        if (botcash > prices[botspace]) {
            botprop.push(places[botspace])
            console.log(botname + " just bought " + places[botspace]);
            botcash = botcash - prices[botspace];
            prices[botspace] = "bought";
        }
    } else {
        if (prices[botspace] == "chance") {
            botgetchancecard();
        }
        if (prices[botspace] == "chest") {
            botgetchestcard();
        }
        if (prices[botspace] == "parking") {
            botcash = botcash + 500;
            console.log(botname + " landed on Free Parking and earned $500.");
        }
        if (prices[botspace] == "jail") {
            console.log(botname + " got sent to jail.");
            botspace = 10;
            botcheckjail = 1;
        }
        if (prices[botspace] == "income") {
            console.log(botname + " payed $200 for income tax.")
            botcash = botcash - 200;
        }
        if (prices[botspace] == "lux") {
            botcash = botcash - 75;
            console.log(botname + " payed $75 for Luxury Tax.");
        }
        if (prices[botspace] == "bought") {
            owner = checkowner(botspace);
            if (owner == "p1") {
                botcash = botcash - rent[botspace];
                p1cash = p1cash + rent[botspace];
                console.log(botname + " payed you a rent of $" + rent[botspace]);
                console.log("You now have $" + p1cash);
            }
        }
    }    
}
var prices = ["go", 60, "chest", 60, "income", 200, 100, "chance", 100, 120, "vistingjail", 140, 150, 140, 160, 200, 180, "chest", 180, 200, "parking", 220, "chance", 220, 240, 200, 260, 260, 150, 280, "jail", 300, 300, "chest", 320, 200, "chance", 350, "lux", 400];
const places = ["GO", "Mediterranean Avenue", "Community Chest", "Baltic Avenue", "Income Tax", "Reading Railroad", "Oriental Avenue", "Chance", "Vermont Avenue", "Connecticut Avenue", "Jail/Just Visting", "St. Charles Place", "Electric Company", "States Avenue", "Virginia Avenue", "Pennsylvania Railroad", "St. James Place", "Community Chest", "Tennessee Avenue", "New York Avenue", "Free Parking", "Kentucky Avenue", "Chance", "Indiana Avenue", "Illinois Avenue", "B. & O. Railroad", "Atlantic Avenue", "Ventnor Avenue", "Water Works", "Marvin Gardens", "Go to Jail", "Pacific Avenue", "North Carolina Avenue", "Community Chest", "Pennsylvania Avenue", "Short Line", "Chance", "Park Place", "Luxury Tax", "Boardwalk"];
var p1_roll = 0;
var botcash = 1500;
var rent = ["", 2, "", 4, "", 25, 6, "", 6, 8, "", 10, 5, 10, 12, 25, 14, "", 14, 16, "", 18, "", 18, 20, 25, 22, 22, 10, 24, "", 26, 26, "", 28, 25, "", 35, "", 50];
var space = 0;
var chance = ["Boardwalk", "Jail/Just Visting", 50, "GO", "Back Three", -15, 150, "Illinois Avenue", "Reading Railroad", "St. Charles Place", -50, "New York Avenue", 200, -150];
var p1cash = 1500;
var cchest = [-100, 200, 100, 50, 45, 10, 25, 100, "GO", -50, "Jail/Just Visting", 20, -150, 100]
var p1prop = [];
var botprop = [];
var botspace = 0;
var getprop = "";
var turnq = "";
var turn = "";
var upq = "";
var chestnum = "";
var botroll = 0;
var botcheckjail = 0;
var checkjail = 0;
var chestspace = "";
var owner = 0;
var chesti = "";
var chancenum = 0;
var chancei = 0;
var jailq = "";
var jail1 = 0;
var jail2 = 0;
var uppropi1 = 0;
var botup1 = 0;
var botup2 = 0;
var upqy = "";
var up = "";
var uppropi2 = 0;
var chancespace = "";
var botdec = 0;
console.log("Welcome to Monopoly Adventure!");
sleep(2000);
var botname = readlineSync.question('Please enter the name for your opponent: ');
playerturn();
console.log("Thanks for Playing!");
