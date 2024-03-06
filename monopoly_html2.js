function getRandomNumberroll() {
    return Math.floor(Math.random() * 6) + 1;
}
function getRandomNumbercard() {
    return Math.floor(Math.random() * 13) + 0;
}
function botnum(min, max) {
    return Math.floor(Math.random() * max) + min;
}
function addText (id, text) {
    document.getElementById(id).innerHTML += text;
}
function setText (id, text) {
    document.getElementById(id).innerHTML = text;
}
function buyprop () {
    getprop = "b";
    p1prop.push(places[space]);
    p1cash = p1cash - prices[space];
    addText("output", "<br>You now have $" + p1cash);
    prices[space] = "bought";
    addText("output", "<br>________________________________");
    document.getElementById("_" + space).innerHTML += "<br>You own this space";
    document.getElementById("output").innerHTML += "<br>" + botname + "'s turn:";
    //sleep(500);
    botturn();
}
function placestogo() {
    if (typeof prices[space] != "string") {
        document.getElementById("output").innerHTML += "<br>You currently have $" + p1cash;
        getprop = "";
        document.getElementById("output").innerHTML += "<br>Would you like to buy " + places[space] + " for $" + prices[space] + "?";
        addText("output", "<br>If yes, click the property.  If no, type 'n' in the console.");
    } else {
        if (prices[space] == "chance") {
            getchancecard();
        } else if (prices[space] == "chest") {
            getchestcard();
        } else if (prices[space] == "parking") {
            p1cash = p1cash + 500;
            document.getElementById("output").innerHTML += "<br>You landed on Free Parking and earned $500!";
        } else if (prices[space] == "jail") {
            document.getElementById("output").innerHTML += "<br>You got sent to jail.";
            space = 10;
            setSpace(1, 10, 30);
            checkjail = 1;
        } else if (prices[space] == "income") {
            document.getElementById("output").innerHTML += "<br>You paid $200 for income tax.";
            p1cash = p1cash - 200;
        } else if (prices[space] == "lux") {
            p1cash = p1cash - 75;
            document.getElementById("output").innerHTML += "<br>You paid $75 for Luxury Tax and have $" + p1cash + " left.";
        } else if (prices[space] == "bought") {
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
        document.getElementById("output").innerHTML += "<br>________________________________";
        document.getElementById("output").innerHTML += "<br>" + botname + "'s turn:";
        //sleep(500);
        botturn();
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
function getchestcard() {
    chestnum = getRandomNumbercard();
    pspacep = space;
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
            setSpace(1, 10, pspacep);
            checkjail = 1;
        } else {
            document.getElementById("output").innerHTML += "<br>You are now on " + places[space];
            setSpace(1, space, pspacep);
            placestogo();
        }
    } else {
        p1cash = p1cash + chestspace;
        if (chestspace > 0) {
            document.getElementById("output").innerHTML += "<br>You earned $" + chestspace + "!";
            //cashimage();
        }
        if (chestspace < 0) {
            document.getElementById("output").innerHTML += "<br>You lost $" + (chestspace * -1);
        }
    }
}
function botgetchestcard() {
    chestnum = getRandomNumbercard();
    chestspace = cchest[chestnum];
    pspacep = botspace;
    if (typeof chestspace == "string") {
        for (var i = 0; i < places.length; i++) {
            if (places[i] == chestspace) {
                chesti = i;
            }
        }
        botspace = chesti;
        if (chestspace == "Jail/Just Visting") {
            document.getElementById("output").innerHTML += "<br>" + botname + " got sent to jail!";
            setSpace(2, 10, pspacep);
            botcheckjail = 1;
        } else {
            document.getElementById("output").innerHTML += "<br>" + botname + " is now on " + places[space];
            setSpace(2, botspace, pspacep);
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
            setSpace(1, space, space + 3);
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
            pspacep = space;
            space = chancei;
            if (chancespace == "Jail/Just Visting") {
                document.getElementById("output").innerHTML += "<br>You got sent to jail!";
                setSpace(1, 10, pspacep);
                checkjail = 1;
            } else {
                document.getElementById("output").innerHTML += "<br>You are now on " + places[space];
                setSpace(1, space, pspacep);
                placestogo();
            }
        }
    } else {
        p1cash = p1cash + chancespace;
        if (chancespace > 0) {
            document.getElementById("output").innerHTML += "<br>You earned $" + chancespace + "!";
            //cashimage();
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
            setSpace(2, botspace, botspace + 3);
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
            pspacep = botspace;
            botspace = chancei;
            if (chancespace == "Jail/Just Visting") {
                document.getElementById("output").innerHTML += "<br>" + botname + " got sent to jail!";
                setSpace(2, 10, pspacep);
                botcheckjail = 1;
            } else {
                document.getElementById("output").innerHTML += "<br>" + botname + " is now on " + places[botspace];
                setSpace(2, botspace, pspacep);
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
    document.getElementById("output").innerHTML += "<br>Please select from your list of properties.  Upgradeing a property costs $" + upgradepropcost + ".  Enter number below.";
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
        p1_roll = 0;
    } else {
        document.getElementById("output").innerHTML += "<br>You have $" + p1cash;
        jailq = "";
        document.getElementById("output").innerHTML += "<br>Would you like to pay to get out of jail? (y/n)";
    }
}
function rolldice (num1, num2) {
    if (p1_roll == 0) {
        p1_roll = num1 + num2;
        roll1 = num1;
        roll2 = num2;
    }
    if (countdice != 100) {
        countdice++;
        setTimeout(replacediceimage, 20);
    } else if (countdice == 100) {
        countdice = 0;
        setText("dice", '<img src="dice' + roll1 + '.png" alt="dice1" width="70px"><img src="dice' + roll2 + '.png" alt="dice2" width="70px">');
        if (p1_roll == roll1 + roll2) {
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
            setSpace(1, space, space - p1_roll);
            placestogo();
        }
    } 
}
function replacediceimage () {
    setText("dice", '<img src="dice' + getRandomNumberroll() + '.png" alt="dice1" width="70px"><img src="dice' + getRandomNumberroll() + '.png" alt="dice2" width="70px">');
    rolldice();
}
function playerturn2 () {
    turnq = inputvalue;
    if (turnq == 0) {
        turnq = 1;
    }
    if (turnq == 4 && p1prop.length >= 5) {
        upgradeprop();
        return;
    }
    if (turnq == 2) {
        //sleep(1500);
        document.getElementById("output").innerHTML += "<br>You have $" + p1cash;
        document.getElementById("output").innerHTML += "<br>Your current space is " + places[space];
        document.getElementById("output").innerHTML += "<br>Your properties are: ";
        for (var i = 0; i < p1prop.length; i++) {
            uppropi1 = i;
            for (var a = 0; a < places.length; a++) {
                if (places[a] == p1prop[uppropi1]) {
                    uppropi2 = a;
                }
            }
            document.getElementById("output").innerHTML += "<br>" + i + ": " + p1prop[i] + " (Current Rent: $" + rent[uppropi2] + ")";
        }
        playerturn();
        return;
    }
    if (turnq == 3) {
        document.getElementById("output").innerHTML += "<br>" + botname + " has $" + botcash;
        //sleep(300);
        document.getElementById("output").innerHTML += "<br>" + botname + " is currently on " + places[botspace];
        //sleep(300);
        document.getElementById("output").innerHTML += "<br>" + botname + "'s properties are:";
        for (var i = 0; i < botprop.length; i++) {
            //sleep(100);
            document.getElementById("output").innerHTML += "<br>" + i + ": " + botprop[i];
        }
        playerturn();
        return;
    }
    document.getElementById("output").innerHTML += "<br>________________________________";
    document.getElementById("output").innerHTML += "<br>" + botname + "'s turn:";
    //sleep(500);
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
    document.getElementById("output").innerHTML += "<br>Would you like to, Roll the dice, 2. View Stats, 3. View " + botname + "'s stats" + up + " (Enter Number or Click Box)";
    p1_roll = 0;
}
function botturn () {
    if (botcash < 0) {
        document.getElementById("output").innerHTML += "<br>" + botname + " ran out of money and you win!";
        document.getElementById("output").innerHTML += "<br>Thanks for Playing!";
        return;
    }
    document.getElementById("output").innerHTML += "<br>" + botname + " is deciding.";
    setTimeout(botturn2, 1000);
}
function botturn2 () {
    if (botcheatgo == 1) {
        if (botnum(1, 200) == 100) {
            botcheat();
        }
    }
    if (botnum(1, 3) == 1 && botprop.length >= 5) {
        if (botcash >= 250) {
            document.getElementById("output").innerHTML += "<br>" + botname + " is deciding which property to upgrade.";
            botup1 = botnum(0, botprop.length);
            for (var i = 0; i < places.length; i++) {
                if (places[i] == botprop[botup1]) {
                    botup2 = i;
                }
            }
            //sleep(1000);
            document.getElementById("output").innerHTML += "<br>" + botname + " choose " + places[botup2] + " to upgrade.";
            rent[botup2] = rent[botup2] * 3;
            document.getElementById("output").innerHTML += "<br>" + places[botup2] + "'s rent is now $" + rent[botup2];
            botcash = botcash - botupgradecost;
            botupgradecost += 5;
        } 
    } 
    if (botcheckjail == 0) {
        document.getElementById("output").innerHTML += "<br>" + botname + " is rolling.";
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
        setSpace(2, botspace, botspace - botroll);
        setTimeout(botplacestogo, 1000);
    } else {
        if (botcash > 200) {
            document.getElementById("output").innerHTML += "<br>" + botname + " paid to get out of jail.";
            botcash = botcash - 50;
            botcheckjail = 0;
            document.getElementById("output").innerHTML += "<br>Your turn!";
            //sleep(1000);
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
    setTimeout(startplayerturn, 1500);
}
function startplayerturn() {
    turncount++;
    document.getElementById("output").innerHTML += "<br><br><br>Turn " + turncount + " ____________________";
    document.getElementById("output").innerHTML += "<br>Your turn!";
    //updatestats();
    playerturn();
}
function botplacestogo() {
    if (typeof prices[botspace] != "string") {
        if (botcash > prices[botspace]) {
            botprop.push(places[botspace])
            document.getElementById("output").innerHTML += "<br>" + botname + " just bought " + places[botspace];
            botcash = botcash - prices[botspace];
            prices[botspace] = "bought";
            document.getElementById("_" + botspace).innerHTML += "<br>" + botname + " owns this space";
        }
    } else {
        if (prices[botspace] == "chance") {
            botgetchancecard();
        } else if (prices[botspace] == "chest") {
            botgetchestcard();
        } else if (prices[botspace] == "parking") {
            botcash = botcash + 500;
            document.getElementById("output").innerHTML += "<br>" + botname + " landed on Free Parking and earned $500.";
        } else if (prices[botspace] == "jail") {
            document.getElementById("output").innerHTML += "<br>" + botname + " got sent to jail.";
            botspace = 10;
            setSpace(2, 10, 30);
            botcheckjail = 1;
        } else if (prices[botspace] == "income") {
            document.getElementById("output").innerHTML += "<br>" + botname + " paid $200 for income tax.";
            botcash = botcash - 200;
        } else if (prices[botspace] == "lux") {
            botcash = botcash - 75;
            document.getElementById("output").innerHTML += "<br>" + botname + " paid $75 for Luxury Tax.";
        } else if (prices[botspace] == "bought") {
            owner = checkowner(botspace);
            if (owner == "p1") {
                botcash = botcash - rent[botspace];
                p1cash = p1cash + rent[botspace];
                document.getElementById("output").innerHTML += "<br>" + botname + " paid you a rent of $" + rent[botspace];
                //cashimage();
                document.getElementById("output").innerHTML += "<br>You now have $" + p1cash;
            }
        }
    }    
}
function setSpace (player, currentspace, pspace) {
    if (player == 1) {
        if (pspace < 0) {
            pspace = pspace + 40;
        }
        document.getElementById("_" + pspace).innerHTML = places[pspace];
        if (botprop.indexOf(places[pspace]) != -1) {
            document.getElementById("_" + pspace).innerHTML += "<br>" + botname + " owns this space.";
        } else if (p1prop.indexOf(places[pspace]) != -1) {
            document.getElementById("_" + pspace).innerHTML += "<br>You own this space.";
        }
        if (pspace == botspace) {
            addText("_" + pspace, '<img src="botpiece.png" alt="bot piece" width="40px">');
        }
        document.getElementById("_" + currentspace).innerHTML += '<img src="p1_piece.png" alt="player piece" width="40px">'
    } else if (player == 2) {
        if (pspace < 0) {
            pspace = pspace + 40;
        }
        document.getElementById("_" + pspace).innerHTML = places[pspace];
        if (botprop.indexOf(places[pspace]) != -1) {
            document.getElementById("_" + pspace).innerHTML += "<br>" + botname + " owns this space.";
        } else if (p1prop.indexOf(places[pspace]) != -1) {
            document.getElementById("_" + pspace).innerHTML += "<br>You own this space.";
        }
        if (pspace == space) {
            addText("_" + pspace, '<img src="p1_piece.png" alt="player piece" width="40px">');
        }
        document.getElementById("_" + currentspace).innerHTML += '<img src="botpiece.png" alt="bot piece" width="40px">';
    }
}
//Variables
var prices = ["go", 60, "chest", 60, "income", 200, 100, "chance", 100, 120, "vistingjail", 140, 150, 140, 160, 200, 180, "chest", 180, 200, "parking", 220, "chance", 220, 240, 200, 260, 260, 150, 280, "jail", 300, 300, "chest", 320, 200, "chance", 350, "lux", 400];
const places = ["GO", "Mediterranean Avenue", "Community Chest", "Baltic Avenue", "Income Tax", "Reading Railroad", "Oriental Avenue", "Chance", "Vermont Avenue", "Connecticut Avenue", "Jail/Just Visting", "St. Charles Place", "Electric Company", "States Avenue", "Virginia Avenue", "Pennsylvania Railroad", "St. James Place", "Community Chest", "Tennessee Avenue", "New York Avenue", "Free Parking", "Kentucky Avenue", "Chance", "Indiana Avenue", "Illinois Avenue", "B. & O. Railroad", "Atlantic Avenue", "Ventnor Avenue", "Water Works", "Marvin Gardens", "Go to Jail", "Pacific Avenue", "North Carolina Avenue", "Community Chest", "Pennsylvania Avenue", "Short Line", "Chance", "Park Place", "Luxury Tax", "Boardwalk"];
var p1_roll = 12;
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
var pspacep = 0;
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
var countdice = 0;
var chancei = 0;
var jailq = "y";
var jail1 = 0;
var jail2 = 0;
var uppropi1 = 0;
var botup1 = 0;
var botup2 = 0;
var turnq1 = "";
var turnq2 = "";
var roll1 = 0;
var roll2 = 0;
var upqy = "";
var up = "";
var uppropi2 = 0;
var playername = "";
var chancespace = "";
var entercount = 0;
var old_enter = 0;
var botdec = 0;
var upgradepropcost = 150;
var botupgradecost = 150;
var inputvalue = "";
var botcheatgo = 0;
var botname = "";
var upques = 0;
//Executing a Command
function executeCommand () {
    inputvalue = document.getElementById("commandInput").value;
    if (inputvalue == "") {
        return;
    }
    document.getElementById("commandInput").value = "";
    if (botname == "") {
        if (inputvalue == "cheater") {
            p1cash = prompt("You cheater!  \nEnter the amount of cash you want you cheater.");
            if (isNaN(p1cash)) {
                document.getElementById("output").innerHTML += "<br>You didn't enter a number!  Now you get $1000.  Good Luck!";
                p1cash = 1000;
                botname = "Failed Cheater's Rival";
                document.getElementById("output").innerHTML += "<br>Your opponent's name is now " + botname + ".";
                document.getElementById("output").innerHTML += "<br><br><br>Turn " + turncount + " ____________________";
                //cashimage();
                playerturn();
            } else if (p1cash == null) {
                document.getElementById("output").innerHTML += "<br>You didn't enter a number!  Now you get $1000.  Good Luck!";
                p1cash = 1000;
                botname = "Failed Cheater's Rival";
                document.getElementById("output").innerHTML += "<br>Your opponent's name is now " + botname + ".";
                document.getElementById("output").innerHTML += "<br><br><br>Turn " + turncount + " ____________________";
                playerturn();
            } else {
                botcheatgo = 1;
                botname = "Cheaters Rival";
                document.getElementById("output").innerHTML += "<br>Your opponent's name is now " + botname + ".";
                document.getElementById("output").innerHTML += "<br>You start with $" + p1cash + ".";
                document.getElementById("output").innerHTML += "<br><br><br>Turn " + turncount + " ____________________";
                playerturn();
            }
        } else if (inputvalue == "hardmode") {
            document.getElementById("output").innerHTML += "<br>Welcome to Hard mode!";
            document.getElementById("output").innerHTML += "<br>This mode is extra challenging, so if you want a casual game, reload the page.";
            document.getElementById("output").innerHTML += "<br>Still here?";
            document.getElementById("output").innerHTML += "<br>You are going to start with $600 and your opponent will have $1500.";
            document.getElementById("output").innerHTML += "<br>Other aspects will be changed, but you will have to figure out what.";
            document.getElementById("output").innerHTML += "<br>Good Luck!";
            botname = "Very good bot";
            p1cash = 600;
            botcheatgo = 1;
            prices = ["go", 70, "chest", 70, "income", 220, 120, "chance", 120, 170, "vistingjail", 180, 200, 200, 210, 300, 220, "chest", 240, 240, "parking", 260, "chance", 280, 300, 400, 350, 350, 350, 350, "jail", 370, 370, "chest", 400, 500, "chance", 450, "lux", 550];
            chance = ["Boardwalk", "Jail/Just Visting", -50, "GO", "Back Three", -15, -150, "Illinois Avenue", "Reading Railroad", "St. Charles Place", -50, "New York Avenue", 200, -150];
            rent = ["", 50, "", 8, "", 50, 12, "", 12, 16, "", 20, 10, 20, 24, 50, 28, "", 28, 32, "", 36, "", 36, 40, 50, 44, 44, 20, 48, "", 52, 52, "", 54, 50, "", 70, "", 100];
            upgradepropcost = 185;
            playerturn();
        } else {
            botname = inputvalue;
            document.getElementById("output").innerHTML += "<br>Your opponent's name is now " + botname + ".";
            document.getElementById("output").innerHTML += "<br>You start with $1500."
            document.getElementById("output").innerHTML += "<br><br><br>Turn " + turncount + " ____________________";
            document.getElementById("_0").innerHTML += '<img src="p1_piece.png" alt="cool" width="40px"><img src="botpiece.png" alt="cool2" width="40px">';
            playerturn();
        }
    } else if (turnq == 0) {
        if (isNaN(inputvalue)) {
            document.getElementById("output").innerHTML += "<br>You didn't enter a number.  Try again.";
            return;
        } else if (inputvalue == 1) {
            addText("output", "<br>Please click roll dice.");
            return;
        }
        playerturn2 ();
    } else if (getprop == "" && inputvalue == "n") {
        getprop = inputvalue;
        if (inputvalue == "n") {
            document.getElementById("output").innerHTML += "<br>___________________";
            botturn();
        } else {
            document.getElementById("output").innerHTML += "<br>Sorry, your request was read incorrectly.  Please try again.";
            return;
        }
    } else if (jailq == "") {
        jailq = inputvalue;
        if (jailq == "y") {
            checkjail = 0;
            p1cash = p1cash - 50;
            document.getElementById("output").innerHTML += "<br>You paid out of Jail and have $" + p1cash + " left!";
        } else if (jailq == "n") {
            jail1 = getRandomNumberroll();
            jail2 = getRandomNumberroll();
            document.getElementById("output").innerHTML += "<br>You rolled a " + jail1 + " and a " + jail2;
            if (jail1 == jail2) {
                document.getElementById("output").innerHTML += "<br>Congrats!  You rolled doubles and got out of jail!";
                checkjail = 0;
            } else {
                document.getElementById("output").innerHTML += "<br>Better luck next time!";
            }
        } else {
            document.getElementById("output").innerHTML += "<br>Try again";
            jailq = "";
            return;
        }
        document.getElementById("output").innerHTML += "<br>_______________________";
        botturn();
    } else if (upq == "" && upques == 1) {
        if (isNaN(inputvalue)) {
            document.getElementById("output").innerHTML += "<br>You didn't enter a number.  Try again.";
            return;
        }
        upq = inputvalue;
        document.getElementById("output").innerHTML += "<br>You selected " + p1prop[upq] + ".";
        for (var i = 0; i < places.length; i++) {
            if (p1prop[upq] == places[i]) {
                uppropi2 = i;
            }
        }
        rent[uppropi2] = rent[uppropi2] * 3;
        p1cash = p1cash - upgradepropcost;
        document.getElementById("output").innerHTML += "<br>You currently have $" + p1cash + ".";
        document.getElementById("output").innerHTML += "<br>Current rent of " + places[uppropi2] + " is now $" + rent[uppropi2] + ".";
        getpropmusic();
        upgradepropcost += 5;
        upques = 0;
        playerturn();
    }      
}
function botcheat () {
    document.getElementById("output").innerHTML += "<br>" + botname + " decided to cheat because why not.  " + botname + " gained $200!";
    botcash += 200;
}
function checkforbuy (propert) {
    if (getprop == "") {
        if (propert == space) {
            buyprop();
        } else {
            addText("output", "<br>Stop trying to cheat!  Click on the right one or type 'n' in the console.");
        }
    }
}
function checkforroll () {
    if (p1_roll == 0) {
        rolldice(getRandomNumberroll(), getRandomNumberroll());
    } else {
        addText("output", "<br>Stop trying to cheat!");
    }
}
//Start of Program
setText("title", '<a id="linktitle" href="index.html">Monopoly Adventure V2.6</a>');
addText("output", "Please enter the name of your opponent.");
