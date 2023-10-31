function getRandomNumberroll() {
    return Math.floor(Math.random() * 6) + 1;
}
function getRandomNumbercard() {
    return Math.floor(Math.random() * 13) + 0;
}
function botnum(min, max) {
    return Math.floor(Math.random() * max) + min;
}
function buyprop () {
    p1prop.push(places[space]);
    p1cash = p1cash - prices[space];
    document.getElementById("output").innerHTML += "<br>You now have $" + p1cash;
    prices[space] = "bought";
    document.getElementById("output").innerHTML += "<br>________________________________";
    document.getElementById("output").innerHTML += "<br>" + botname + "'s turn:";
    sleep(500);
    botturn();
}
function placestogo() {
    if (typeof prices[space] != "string") {
        document.getElementById("output").innerHTML += "<br>You currently have $" + p1cash;
        getprop = "";
        document.getElementById("output").innerHTML += "<br>Would you like to buy " + places[space] + " for $" + prices[space] + "? (y/n)";
    } else {
        if (prices[space] == "chance") {
            getchancecard();
        }
        if (prices[space] == "chest") {
            getchestcard();
        }
        if (prices[space] == "parking") {
            p1cash = p1cash + 500;
            document.getElementById("output").innerHTML += "<br>You landed on Free Parking and earned $500!";
        }
        if (prices[space] == "jail") {
            document.getElementById("output").innerHTML += "<br>You got sent to jail.";
            space = 10;
            checkjail = 1;
        }
        if (prices[space] == "income") {
            document.getElementById("output").innerHTML += "<br>You payed $200 for income tax.";
            p1cash = p1cash - 200;
        }
        if (prices[space] == "lux") {
            p1cash = p1cash - 75;
            document.getElementById("output").innerHTML += "<br>You payed $75 for Luxury Tax and have $" + p1cash + " left.";
        }
        if (prices[space] == "bought") {
            document.getElementById("output").innerHTML += "<br>" + places[space] + " is already bought.";
            owner = checkowner(space);
            if (owner == "p1") {
                document.getElementById("output").innerHTML += "<br>You own this space.";
            }
            if (owner == "p2") {
                document.getElementById("output").innerHTML += "<br>" + botname + " owns this space.  You have to pay $" + rent[space] + " to " + botname;
                p1cash = p1cash - rent[space];
                botcash = botcash + rent[space];
                document.getElementById("output").innerHTML += "<br>You now have $" + p1cash;
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
            document.getElementById("output").innerHTML += "<br>You got sent to jail!";
            checkjail = 1;
        } else {
            document.getElementById("output").innerHTML += "<br>You are now on " + places[space];
            placestogo();
        }
    } else {
        p1cash = p1cash + chestspace;
        if (chestspace > 0) {
            document.getElementById("output").innerHTML += "<br>You earned $" + chestspace + "!";
        }
        if (chestspace < 0) {
            document.getElementById("output").innerHTML += "<br>You lost $" + (chestspace * -1);
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
            document.getElementById("output").innerHTML += "<br>" + botname + " got sent to jail!";
            botcheckjail = 1;
        } else {
            document.getElementById("output").innerHTML += "<br>" + botname + " is now on " + places[space];
            botplacestogo();
        }
    } else {
        botcash = botcash + chestspace;
        if (chestspace > 0) {
            document.getElementById("output").innerHTML += "<br>" + botname + " earned $" + chestspace + ".";
        }
        if (chestspace < 0) {
            document.getElementById("output").innerHTML += "<br>" + botname + " lost $" + (chestspace * -1) + "!";
        }
    }
}
function getchancecard() {
    chancenum = getRandomNumbercard();
    chancespace = chance[chancenum];
    if (typeof chancespace == "string") {
        if (chancespace == "Back Three") {
            space = space - 3;
            document.getElementById("output").innerHTML += "<br>You moved back three spaces.";
            document.getElementById("output").innerHTML += "<br>You are now on " + places[space];
            placestogo();
        } else {
            for (var i = 0; i < places.length; i++) {
                if (places[i] == chancespace) {
                    chancei = i;
                }
            }
            if (space > chancei) {
                p1cash = p1cash + 200;
                document.getElementById("output").innerHTML += "<br>You passed Go and Collected $200!";
            }
            space = chancei;
            if (chancespace == "Jail/Just Visting") {
                document.getElementById("output").innerHTML += "<br>You got sent to jail!";
                checkjail = 1;
            } else {
                document.getElementById("output").innerHTML += "<br>You are now on " + places[space];
                placestogo();
            }
        }
    } else {
        p1cash = p1cash + chancespace;
        if (chancespace > 0) {
            document.getElementById("output").innerHTML += "<br>You earned $" + chancespace + "!";
        }
        if (chancespace < 0) {
            document.getElementById("output").innerHTML += "<br>You lost $" + (chancespace * -1);
        }
    }
}
function botgetchancecard() {
    chancenum = getRandomNumbercard();
    chancespace = chance[chancenum];
    if (typeof chancespace == "string") {
        if (chancespace == "Back Three") {
            botspace = botspace - 3;
            document.getElementById("output").innerHTML += "<br>" + botname + " moved back three spaces.";
        } else {
            for (var i = 0; i < places.length; i++) {
                if (places[i] == chancespace) {
                    chancei = i;
                }
            }
            if (botspace > chancei) {
                botcash = botcash + 200;
                document.getElementById("output").innerHTML += "<br>" + botname + " passed Go and Collected $200.";
            }
            botspace = chancei;
            if (chancespace == "Jail/Just Visting") {
                document.getElementById("output").innerHTML += "<br>" + botname + " got sent to jail!";
                botcheckjail = 1;
            } else {
                document.getElementById("output").innerHTML += "<br>" + botname + " is now on " + places[botspace];
                botplacestogo();
            }
        }
    } else {
        botcash = botcash + chancespace;
        if (chancespace > 0) {
            document.getElementById("output").innerHTML += "<br>" + botname + " earned $" + chancespace + ".";
        }
        if (chancespace < 0) {
            document.getElementById("output").innerHTML += "<br>" + botname  + " lost $" + (chancespace * -1) + "!";
        }
    }
}
function upgradeprop() {
    document.getElementById("output").innerHTML += "<br>Please select from your list of properties.  Upgradeing a property costs $150.  Enter number below.";
    document.getElementById("output").innerHTML += "<br>You currently have $" + p1cash + ".";
    for (var i = 0; i < p1prop.length; i++) {
        uppropi1 = i;
        for (var a = 0; a < places.length; a++) {
            if (places[a] == p1prop[uppropi1]) {
                uppropi2 = a;
            }
        }
        document.getElementById("output").innerHTML += "<br>" + i + ": " + p1prop[i] + " (Current Rent: $" + rent[uppropi2] + ")";
    }
    upques = 1;
    upq = "";
    document.getElementById("output").innerHTML += "<br>Number: "
}
function roll() {
    if (checkjail == 0) {
        p1_roll =  getRandomNumberroll() + getRandomNumberroll();
        if (p1_roll == 2) {
            p1cash = p1cash + 686;
            document.getElementById("output").innerHTML += "<br>You rolled Snake Eyes and got $686!";
        }
        space = space + p1_roll;
        if (space >= 40) {
            space = space - 40;
            document.getElementById("output").innerHTML += "<br>You passed GO and colleted $200!";
            p1cash = p1cash + 200;
        }
        document.getElementById("output").innerHTML += "<br>You rolled a " + p1_roll + " and landed on " + places[space];
        sleep(1000);
        placestogo();
    } else {
        document.getElementById("output").innerHTML += "<br>You have $" + p1cash;
        jailq = "";
        document.getElementById("output").innerHTML += "<br>Would you like to pay to get out of jail? (y/n)";
    }
}
function playerturn2 () {
    turnq = inputvalue;
    if (turnq == 1) {
        roll();
        if (jailq == "" || getprop == "") {
            return;
        }
    }
    if (turnq == 4) {
        upgradeprop();
        return;
    }
    if (turnq == 6) {
        return;
    }
    if (turnq == 2) {
        sleep(1500);
        document.getElementById("output").innerHTML += "<br>You have $" + p1cash;
        document.getElementById("output").innerHTML += "<br>Your current space is " + places[space];
        document.getElementById("output").innerHTML += "<br>Your properties are: ";
        for (var i = 0; i < p1prop.length; i++) {
            document.getElementById("output").innerHTML += "<br>" + i + ":" + p1prop[i];
        }
        playerturn();
    }
    if (turnq == 3) {
        document.getElementById("output").innerHTML += "<br>" + botname + " has $" + botcash;
        sleep(300);
        document.getElementById("output").innerHTML += "<br>" + botname + " is currently on " + places[botspace];
        sleep(300);
        document.getElementById("output").innerHTML += "<br>" + botname + "'s properties are:";
        for (var i = 0; i < botprop.length; i++) {
            sleep(100);
            document.getElementById("output").innerHTML += "<br>" + i + ": " + botprop[i];
        }
        playerturn();
    }
    if (turnq == 5 && p1prop.length >= 5) {
        upgradeprop();
    }
    document.getElementById("output").innerHTML += "<br>________________________________";
    document.getElementById("output").innerHTML += "<br>" + botname + "'s turn:";
    sleep(500);
    botturn();
}
function playerturn () {
    if (p1prop.length >= 5) {
        up = ", 4. Upgrade Properties";
    }
    if (p1cash < 0) {
        document.getElementById("output").innerHTML += "<br>You ran out of money!";
        return;
    }
    turnq = 0;
    document.getElementById("output").innerHTML += "<br>Would you like to, 1. Roll the dice, 2. View Stats, 3. View " + botname + "'s stats" + up + " (Enter Number)";
}
function botturn () {
    if (botcash < 0) {
        document.getElementById("output").innerHTML += "<br>" + botname + " ran out of money and you win!";
        document.getElementById("output").innerHTML += "<br>Thanks for Playing!";
        return;
    }
    document.getElementById("output").innerHTML += "<br>" + botname + " is deciding.";
    sleep(1500);
    if (botnum(1, 3) == 1 && botprop.length >= 5) {
        if (botcash >= 250) {
            document.getElementById("output").innerHTML += "<br>" + botname + " is deciding which proerty to upgrade.";
            botup1 = botnum(0, botprop.length);
            for (var i = 0; i < places.length; i++) {
                if (places[i] == botprop[botup1]) {
                    botup2 = i;
                }
            }
            sleep(1000);
            document.getElementById("output").innerHTML += "<br>" + botname + " choose " + places[botup2] + " to upgrade.";
            rent[botup2] = rent[botup2] * 3;
            document.getElementById("output").innerHTML += "<br>" + places[botup2] + "'s rent is now $" + rent[botup2];
            botcash = botcash - 150;
        } 
    } 
    if (botcheckjail == 0) {
        document.getElementById("output").innerHTML += "<br>" + botname + " is rolling.";
        sleep(1000);
        botroll = getRandomNumberroll() + getRandomNumberroll();
        botspace = botspace + botroll;
        if (botspace >= 40) {
            botspace = botspace - 40;
            botcash = botcash + 200;
        }
        if (botroll == 2) {
            document.getElementById("output").innerHTML += "<br>" + botname + " got snake eyes and earned $686";
            botcash = botcash + 686;
        }
        document.getElementById("output").innerHTML += "<br>" + botname + " rolled a " + botroll + " and landed on " + places[botspace];
        botplacestogo();
    } else {
        if (botcash > 200) {
            document.getElementById("output").innerHTML += "<br>" + botname + " payed to get out of jail.";
            botcash = botcash - 50;
            botcheckjail = 0;
            document.getElementById("output").innerHTML += "<br>Your turn!";
            sleep(1000);
        } else {
            document.getElementById("output").innerHTML += "<br>" + botname + " decided to try to roll out of jail.";
            jail1 = getRandomNumberroll();
            jail2 = getRandomNumberroll();
            if (jail1 == jail2) {
                document.getElementById("output").innerHTML += "<br>" + botname + " got out of jail.";
                botcheckjail = 0;
            } else {
                document.getElementById("output").innerHTML += "<br>" + botname + " rolled a " + jail1 + " and a " + jail2 + " and failed at life.  " + botname + " remains in jail.";
            }
        }
    }
    sleep(1500);
    turncount++;
    document.getElementById("output").innerHTML += "<br><br><br>Turn " + turncount + " ____________________";
    document.getElementById("output").innerHTML += "<br>Your turn!";
    playerturn();
}
function botplacestogo() {
    if (typeof prices[botspace] != "string") {
        if (botcash > prices[botspace]) {
            botprop.push(places[botspace])
            document.getElementById("output").innerHTML += "<br>" + botname + " just bought " + places[botspace];
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
            document.getElementById("output").innerHTML += "<br>" + botname + " landed on Free Parking and earned $500.";
        }
        if (prices[botspace] == "jail") {
            document.getElementById("output").innerHTML += "<br>" + botname + " got sent to jail.";
            botspace = 10;
            botcheckjail = 1;
        }
        if (prices[botspace] == "income") {
            document.getElementById("output").innerHTML += "<br>" + botname + " payed $200 for income tax.";
            botcash = botcash - 200;
        }
        if (prices[botspace] == "lux") {
            botcash = botcash - 75;
            document.getElementById("output").innerHTML += "<br>" + botname + " payed $75 for Luxury Tax.";
        }
        if (prices[botspace] == "bought") {
            owner = checkowner(botspace);
            if (owner == "p1") {
                botcash = botcash - rent[botspace];
                p1cash = p1cash + rent[botspace];
                document.getElementById("output").innerHTML += "<br>" + botname + " payed you a rent of $" + rent[botspace];
                document.getElementById("output").innerHTML += "<br>You now have $" + p1cash;
            }
        }
    }    
}
//Variables
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
var getprop = "y";
var turnq = 2;
var zero = 0;
var turn = "";
var upq = "";
const textInput = document.getElementById("inq");
var chestnum = "";
var botroll = 0;
var botcheckjail = 0;
var checkjail = 0;
var chestspace = "";
var owner = 0;
var chesti = "";
var turncount = 1;
var chancenum = 0;
var chancei = 0;
var jailq = "y";
var jail1 = 0;
var jail2 = 0;
var uppropi1 = 0;
var botup1 = 0;
var botup2 = 0;
var turnq1 = "";
var turnq2 = "";
var upqy = "";
var up = "";
var uppropi2 = 0;
var playername = "";
var chancespace = "";
var entercount = 0;
var old_enter = 0;
var botdec = 0;
var inputvalue = "";
var botname = "";
var upques = 0;
function clearimages () {
    document.getElementById("images").innerHTML = "";
}
function cashimage () {
    document.getElementById("images").innerHTML = '<img src="money.png" alt="money">';
    document.getElementById("images").innerHTML += '<embed src="soundeffect.mp3" loop="false" autostart="true" width="2" height="0">';
    setTimeout(clearimages, 2500);
}
//Executing a Command
function executeCommand () {
    inputvalue = document.getElementById("commandInput").value;
    document.getElementById("commandInput").value = "";
    if (botname == "") {
        botname = inputvalue;
        document.getElementById("output").innerHTML += "<br>Your opponent's name is now " + botname + ".";
        document.getElementById("output").innerHTML += "<br>You start with $1500."
        document.getElementById("output").innerHTML += "<br><br><br>Turn " + turncount + " ____________________";
        sleep(500);
        cashimage();
        playerturn();
    } else if (turnq == 0) {
        playerturn2 ();
    } else if (getprop == "" && inputvalue == "y") {
        getprop = inputvalue;
        buyprop();
    } else if (jailq == "") {
        jailq = inputvalue;
        if (jailq == "y") {
            checkjail = 0;
            p1cash = p1cash - 50;
            document.getElementById("output").innerHTML += "<br>You payed out of Jail and have $" + p1cash + " left!";
        } else {
            jail1 = getRandomNumberroll();
            jail2 = getRandomNumberroll();
            document.getElementById("output").innerHTML += "<br>You rolled a " + jail1 + " and a " + jail2;
            if (jail1 == jail2) {
                document.getElementById("output").innerHTML += "<br>Congrats!  You rolled doubles and got out of jail!";
                checkjail = 0;
            } else {
                document.getElementById("output").innerHTML += "<br>Better luck next time!";
            }
        }
        botturn();
    } else if (upq != "" && upques == 1) {
        sleep(500);
        document.getElementById("output").innerHTML += "<br>You selected " + p1prop[upq] + ".";
        for (var i = 0; i < places.length; i++) {
            if (p1prop[upq] == places[i]) {
                uppropi2 = i;
            }
        }
        rent[uppropi2] = rent[uppropi2] * 3;
        p1cash = p1cash - 150;
        document.getElementById("output").innerHTML += "<br>You curretnly have $" + p1cash + ".";
        document.getElementById("output").innerHTML += "<br>Current rent of " + places[uppropi2] + " is now $" + rent[uppropi2] + ".";
        upques = 0;
        playerturn();
    }      
}
//Start of Program
document.getElementById("title").innerHTML = "Welcome to Monopoly Adventure!";
sleep(2000);
document.getElementById("output").innerHTML += "Please enter the name of your opponent.";