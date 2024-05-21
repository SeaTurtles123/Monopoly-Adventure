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
    addText("output", "<br>" + p1name + " now has $" + p1cash);
    prices[space] = "bought";
    addText("output", "<br>________________________________");
    document.getElementById("_" + space).innerHTML += "<br>" + p1name + " owns this space";
    document.getElementById("output").innerHTML += "<br>" + p2name + "'s turn:";
    //sleep(500);
    botturn();
}
function buypropp2 () {
    getprop = "b";
    p2prop.push(places[p2space]);
    p2cash = p2cash - prices[p2space];
    addText("output", "<br>" + p2name + " now has $" + p2cash);
    prices[p2space] = "bought";
    document.getElementById("_" + p2space).innerHTML += "<br>" + p2name + " owns this space";
    startplayer1turn();
}
function placestogo() {
    if (typeof prices[space] != "string") {
        document.getElementById("output").innerHTML += "<br>" + p1name + " currently has $" + p1cash;
        getprop = "";
        document.getElementById("output").innerHTML += "<br>" + p1name + ", would you like to buy " + places[space] + " for $" + prices[space] + "?";
        addText("output", "<br>If yes, click the property.  If no, type 'n' in the console.");
    } else {
        if (prices[space] == "chance") {
            getchancecard();
        } else if (prices[space] == "chest") {
            getchestcard();
        } else if (prices[space] == "parking") {
            p1cash = p1cash + 500;
            document.getElementById("output").innerHTML += "<br>" + p1name + "landed on Free Parking and earned $500!";
        } else if (prices[space] == "jail") {
            document.getElementById("output").innerHTML += "<br>" + p1name + "got sent to jail.";
            space = 10;
            setSpace(1, 10, 30);
            checkjail = 1;
        } else if (prices[space] == "income") {
            document.getElementById("output").innerHTML += "<br>" + p1name + "paid $200 for income tax.";
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
                document.getElementById("output").innerHTML += "<br>" + p2name + " owns this space.  You have to pay $" + rent[space] + " to " + p2name;
                p1cash = p1cash - rent[space];
                p2cash = p2cash + rent[space];
                document.getElementById("output").innerHTML += "<br>You now have $" + p1cash;
            }
        }
        document.getElementById("output").innerHTML += "<br>________________________________";
        document.getElementById("output").innerHTML += "<br>" + p2name + "'s turn:";
        botturn();
    }    
}
function checkowner (prop) {
    for(var i = 0; i < p1prop.length; i++) {
        if (places[prop] == p1prop[i]) {
            return("p1");
        }
    }
    for(var i = 0; i < p2prop.length; i++) {
        if (places[prop] == p2prop[i]) {
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
    pspacep = p2space;
    if (typeof chestspace == "string") {
        for (var i = 0; i < places.length; i++) {
            if (places[i] == chestspace) {
                chesti = i;
            }
        }
        p2space = chesti;
        if (chestspace == "Jail/Just Visting") {
            document.getElementById("output").innerHTML += "<br>" + p2name + " got sent to jail!";
            setSpace(2, 10, pspacep);
            botcheckjail = 1;
        } else {
            document.getElementById("output").innerHTML += "<br>" + p2name + " is now on " + places[space];
            setSpace(2, p2space, pspacep);
            p2placestogo();
            return;
        }
    } else {
        p2cash = p2cash + chestspace;
        if (chestspace > 0) {
            document.getElementById("output").innerHTML += "<br>" + p2name + " earned $" + chestspace + ".";
        }
        if (chestspace < 0) {
            document.getElementById("output").innerHTML += "<br>" + p2name + " lost $" + (chestspace * -1) + "!";
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
            return;
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
                return;
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
            p2space = p2space - 3;
            document.getElementById("output").innerHTML += "<br>" + p2name + " moved back three spaces.";
            setSpace(2, p2space, p2space + 3);
            placestogo();
            return;
        } else {
            for (var i = 0; i < places.length; i++) {
                if (places[i] == chancespace) {
                    chancei = i;
                }
            }
            if (p2space > chancei) {
                p2cash = p2cash + 200;
                document.getElementById("output").innerHTML += "<br>" + p2name + " passed Go and Collected $200.";
            }
            pspacep = p2space;
            p2space = chancei;
            if (chancespace == "Jail/Just Visting") {
                document.getElementById("output").innerHTML += "<br>" + p2name + " got sent to jail!";
                setSpace(2, 10, pspacep);
                botcheckjail = 1;
            } else {
                document.getElementById("output").innerHTML += "<br>" + p2name + " is now on " + places[p2space];
                setSpace(2, p2space, pspacep);
                p2placestogo();
                return;
            }
        }
    } else {
        p2cash = p2cash + chancespace;
        if (chancespace > 0) {
            document.getElementById("output").innerHTML += "<br>" + p2name + " earned $" + chancespace + ".";
        }
        if (chancespace < 0) {
            document.getElementById("output").innerHTML += "<br>" + p2name  + " lost $" + (chancespace * -1) + "!";
        }
    }
}
function p1upgradeprop() {
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
function p2upgradeprop() {
    document.getElementById("output").innerHTML += "<br>Please select from your list of properties.  Upgradeing a property costs $" + botupgradecost + ".  Enter number below.";
    document.getElementById("output").innerHTML += "<br>You currently have $" + p2cash + ".";
    for (var i = 0; i < p2prop.length; i++) {
        uppropi1 = i;
        for (var a = 0; a < places.length; a++) {
            if (places[a] == p2prop[uppropi1]) {
                uppropi2 = a;
            }
        }
        document.getElementById("output").innerHTML += "<br>" + i + ": " + p2prop[i] + " (Current Rent: $" + rent[uppropi2] + ")";
    }
    upques = 2;
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
                document.getElementById("output").innerHTML += "<br>" + p1name + " rolled Snake Eyes and got $686!";
                player1score += 5;
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
    if (playertype == "p1") {
        rolldice();
    } else {
        rolldiceplayer2();
    } 
}
var playertype = "p1";
function playerturn2 () {
    turnq = inputvalue;
    if (turnq == 0) {
        turnq = 1;
    }
    if (turnq == 3 && p1prop.length >= 5) {
        p1upgradeprop();
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
    document.getElementById("output").innerHTML += "<br>________________________________";
    document.getElementById("output").innerHTML += "<br>" + p2name + "'s turn:";
    //sleep(500);
    botturn();
}
function playerturn () {
    if (p1prop.length >= 5) {
        up = ", 3. Upgrade Properties";
    }
    if (p1cash < 0) {
        document.getElementById("output").innerHTML += "<br>You ran out of money!";
        return;
    }
    turnq = 0;
    document.getElementById("output").innerHTML += "<br>" + p1name + ", would you like to, Roll the dice, 2. View your Stats" + up + " (Enter Number or Click Box)";
    p1_roll = 0;
}
function botturn () {
    if (p2cash < 0) {
        document.getElementById("output").innerHTML += "<br>" + p2name + " ran out of money and " + p1name + " wins!";
        document.getElementById("output").innerHTML += "<br>Thanks for Playing!";
        return;
    }
    setTimeout(player2turn, 1000);
}
var upbot = "";
var turnqp2 = 2;
function player2turn () {
    //Change
    if (p2prop.length >= 5) {
        upbot = ", 3. Upgrade Properties";
    }
    if (p1cash < 0) {
        document.getElementById("output").innerHTML += "<br>You ran out of money!";
        return;
    }
    turnqp2 = 0;
    playertype = "p2";
    document.getElementById("output").innerHTML += "<br>" + p2name + ", would you like to Roll the dice, 2. View your Stats" + upbot + " (Enter Number or Click Box)";
    p2_roll = 0;
}
function player2turn2 () {
    turnqp2 = inputvalue;
    if (turnqp2 == 0) {
        turnqp2 = 1;
    }
    //Change
    if (turnqp2 == 3 && p1prop.length >= 5) {
        p2upgradeprop();
        return;
    }
    if (turnqp2 == 2) {
        document.getElementById("output").innerHTML += "<br>You have $" + p2cash;
        document.getElementById("output").innerHTML += "<br>Your current space is " + places[p2space];
        document.getElementById("output").innerHTML += "<br>Your properties are: ";
        for (var i = 0; i < p2prop.length; i++) {
            uppropi1 = i;
            for (var a = 0; a < places.length; a++) {
                if (places[a] == p2prop[uppropi1]) {
                    uppropi2 = a;
                }
            }
            document.getElementById("output").innerHTML += "<br>" + i + ": " + p2prop[i] + " (Current Rent: $" + rent[uppropi2] + ")";
        }
        player2turn();
        return;
    }
    document.getElementById("output").innerHTML += "<br>________________________________";
    document.getElementById("output").innerHTML += "<br>" + p2name + "'s turn:";
    //sleep(500);
    botturn();
    
    if (botcheckjail == 0) {
        document.getElementById("output").innerHTML += "<br>" + p2name + " is rolling.";
        botroll = getRandomNumberroll() + getRandomNumberroll();
        p2space = p2space + botroll;
        if (p2space >= 40) {
            p2space = p2space - 40;
            p2cash = p2cash + 200;
        }
        if (botroll == 2) {
            document.getElementById("output").innerHTML += "<br>" + p2name + " got snake eyes and earned $686";
            p2cash = p2cash + 686;
        }
        document.getElementById("output").innerHTML += "<br>" + p2name + " rolled a " + botroll + " and landed on " + places[p2space];
        setSpace(2, p2space, p2space - botroll);
        setTimeout(p2placestogo, 1000);
    } else {
        if (p2cash > 200) {
            document.getElementById("output").innerHTML += "<br>" + p2name + " paid to get out of jail.";
            p2cash = p2cash - 50;
            botcheckjail = 0;
            document.getElementById("output").innerHTML += "<br>Your turn!";
            //sleep(1000);
        } else {
            document.getElementById("output").innerHTML += "<br>" + p2name + " decided to try to roll out of jail.";
            jail1 = getRandomNumberroll();
            jail2 = getRandomNumberroll();
            if (jail1 == jail2) {
                document.getElementById("output").innerHTML += "<br>" + p2name + " got out of jail.";
                botcheckjail = 0;
            } else {
                document.getElementById("output").innerHTML += "<br>" + p2name + " rolled a " + jail1 + " and a " + jail2 + " and failed at life.  " + p2name + " remains in jail.";
            }
        }
    }
    setTimeout(startplayer1turn, 1500);
}
function startplayer1turn() {
    turncount++;
    document.getElementById("output").innerHTML += "<br><br><br>Turn " + turncount + " ____________________";
    document.getElementById("output").innerHTML += "<br>" + p1name + "'s turn!";
    //updatestats();
    playertype = "p1";
    playerturn();
}
function p2placestogo() {
    if (typeof prices[p2space] != "string") {
        document.getElementById("output").innerHTML += "<br>" + p2name + " currently has $" + p2cash;
        getprop = "";
        document.getElementById("output").innerHTML += "<br>" + p2name + ", would you like to buy " + places[p2space] + " for $" + prices[p2space] + "?";
        addText("output", "<br>If yes, click the property.  If no, type 'n' in the console.");
    } else {
        if (prices[p2space] == "chance") {
            botgetchancecard();
        } else if (prices[p2space] == "chest") {
            botgetchestcard();
        } else if (prices[p2space] == "parking") {
            p2cash = p2cash + 500;
            document.getElementById("output").innerHTML += "<br>" + p2name + " landed on Free Parking and earned $500.";
        } else if (prices[p2space] == "jail") {
            document.getElementById("output").innerHTML += "<br>" + p2name + " got sent to jail.";
            p2space = 10;
            setSpace(2, 10, 30);
            botcheckjail = 1;
        } else if (prices[p2space] == "income") {
            document.getElementById("output").innerHTML += "<br>" + p2name + " paid $200 for income tax.";
            p2cash = p2cash - 200;
        } else if (prices[p2space] == "lux") {
            p2cash = p2cash - 75;
            document.getElementById("output").innerHTML += "<br>" + p2name + " paid $75 for Luxury Tax.";
        } else if (prices[p2space] == "bought") {
            owner = checkowner(p2space);
            if (owner == "p1") {
                p2cash = p2cash - rent[p2space];
                p1cash = p1cash + rent[p2space];
                document.getElementById("output").innerHTML += "<br>" + p2name + " paid you a rent of $" + rent[p2space];
                //cashimage();
                document.getElementById("output").innerHTML += "<br>You now have $" + p1cash;
            }
        }
        startplayer1turn();
    }    
}
function setSpace (player, currentspace, pspace) {
    if (player == 1) {
        if (pspace < 0) {
            pspace = pspace + 40;
        }
        document.getElementById("_" + pspace).innerHTML = places[pspace];
        if (p2prop.indexOf(places[pspace]) != -1) {
            document.getElementById("_" + pspace).innerHTML += "<br>" + p2name + " owns this space.";
        } else if (p1prop.indexOf(places[pspace]) != -1) {
            document.getElementById("_" + pspace).innerHTML += "<br>" + p1name + " owns this space.";
        }
        if (pspace == p2space) {
            addText("_" + pspace, '<img src="botpiece.png" alt="bot piece" width="40px">');
        }
        document.getElementById("_" + currentspace).innerHTML += '<img src="p1_piece.png" alt="player piece" width="40px">'
    } else if (player == 2) {
        if (pspace < 0) {
            pspace = pspace + 40;
        }
        document.getElementById("_" + pspace).innerHTML = places[pspace];
        if (p2prop.indexOf(places[pspace]) != -1) {
            document.getElementById("_" + pspace).innerHTML += "<br>" + p2name + " owns this space.";
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
var p1name = "";
var p2_roll = 0;
var p2cash = 1500;
var rent = ["", 2, "", 4, "", 25, 6, "", 6, 8, "", 10, 5, 10, 12, 25, 14, "", 14, 16, "", 18, "", 18, 20, 25, 22, 22, 10, 24, "", 26, 26, "", 28, 25, "", 35, "", 50];
var space = 0;
var chance = ["Boardwalk", "Jail/Just Visting", 50, "GO", "Back Three", -15, 150, "Illinois Avenue", "Reading Railroad", "St. Charles Place", -50, "New York Avenue", 200, -150];
var p1cash = 1500;
var cchest = [-100, 200, 100, 50, 45, 10, 25, 100, "GO", -50, "Jail/Just Visting", 20, -150, 100]
var p1prop = [];
var p2prop = [];
var p2space = 0;
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
var p2name = "";
var upques = 0;
//Executing a Command
function executeCommand () {
    inputvalue = document.getElementById("commandInput").value;
    if (inputvalue == "") {
        return;
    }
    document.getElementById("commandInput").value = "";
    if (p1name == "") {
        p1name = inputvalue;
        addText("output", "<br>Player 1 name is set to " + p1name);
        addText("output", "<br>Please enter player 2 name.")
    } else if (p2name == "") {
        p2name = inputvalue;
        document.getElementById("output").innerHTML += "<br>Player 2's name is now " + p2name + ".";
        document.getElementById("output").innerHTML += "<br>Both players start with $1500."
        addText("output", "<br>Good Luck!");
        document.getElementById("output").innerHTML += "<br><br><br>Turn " + turncount + " ____________________";
        document.getElementById("_0").innerHTML += '<img src="p1_piece.png" alt="cool" width="40px"><img src="botpiece.png" alt="cool2" width="40px">';
        playerturn();
    } else if (turnq == 0) {
        if (isNaN(inputvalue)) {
            document.getElementById("output").innerHTML += "<br>You didn't enter a number.  Try again.";
            return;
        } else if (inputvalue == 1) {
            addText("output", "<br>Please click roll dice.");
            return;
        }
        playerturn2 ();
    } else if (turnqp2 == 0) { 
        if (isNaN(inputvalue)) {
            document.getElementById("output").innerHTML += "<br>You didn't enter a number.  Try again.";
            return;
        } else if (inputvalue == 1) {
            addText("output", "<br>Please click roll dice.");
            return;
        }
        player2turn2();
    } else if (getprop == "" && inputvalue == "n") {
        getprop = inputvalue;
        if (inputvalue == "n") {
            if (playertype == "p1") {
                document.getElementById("output").innerHTML += "<br>___________________";
                botturn();
            } else {
                startplayer1turn();
            }
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
        upgradepropcost += 10;
        upques = 0;
        playerturn();
    } else if (upq == "" && upques == 2) {
        if (isNaN(inputvalue)) {
            document.getElementById("output").innerHTML += "<br>You didn't enter a number.  Try again.";
            return;
        }
        upq = inputvalue;
        document.getElementById("output").innerHTML += "<br>You selected " + p2prop[upq] + ".";
        for (var i = 0; i < places.length; i++) {
            if (p2prop[upq] == places[i]) {
                uppropi2 = i;
            }
        }
        rent[uppropi2] = rent[uppropi2] * 3;
        p2cash = p2cash - botupgradecost;
        document.getElementById("output").innerHTML += "<br>You currently now have $" + p2cash + ".";
        document.getElementById("output").innerHTML += "<br>Current rent of " + places[uppropi2] + " is now $" + rent[uppropi2] + ".";
        botupgradecost += 10;
        upques = 0;
        player2turn();
    }
}
function checkforbuy (propert) {
    if (getprop == "") {
        if (propert == space && playertype == "p1") {
            buyprop();
        } else if (propert == p2space && playertype == "p2") {
            buypropp2();
        } else {
            addText("output", "<br>Stop trying to cheat!  Click on the right one or type 'n' in the console.");
        }
    }
}
function rolldiceplayer2 (num12, num22) {
    if (p2_roll == 0) {
        p2_roll = num12 + num22;
        roll1 = num12;
        roll2 = num22;
    }
    if (countdice != 100) {
        countdice++;
        setTimeout(replacediceimage, 20);
    } else if (countdice == 100) {
        countdice = 0;
        setText("dice", '<img src="dice' + roll1 + '.png" alt="dice1" width="70px"><img src="dice' + roll2 + '.png" alt="dice2" width="70px">');
        if (p2_roll == roll1 + roll2) {
            if (p2_roll == 2) {
                p2cash = p2cash + 686;
                document.getElementById("output").innerHTML += "<br>You rolled Snake Eyes and got $686!";
            }
            p2space = p2space + p2_roll;
            if (p2space >= 40) {
                p2space = p2space - 40;
                document.getElementById("output").innerHTML += "<br>You passed GO and colleted $200!";
                p2cash = p2cash + 200;
            }
            document.getElementById("output").innerHTML += "<br>" + p2name + " rolled a " + p2_roll + " and landed on " + places[p2space];
            setSpace(2, p2space, p2space - p2_roll);
            p2placestogo();
        }
    } 
}
function checkforroll () {
    if (p1_roll == 0) {
        rolldice(getRandomNumberroll(), getRandomNumberroll());
    } else if (p2_roll == 0) {
        rolldiceplayer2(getRandomNumberroll(), getRandomNumberroll());
    } else {
        addText("output", "<br>Stop trying to cheat!");
    }
}
function findscore() {
    player1score += Math.round(p1cash/2) + (28 - p1prop.length);
    player1score += turncount/3
    player1score = Math.round(playerscore);
    if (player1score < 0) {
        player1score = 0;
    }
    addText("output", "Your score is " + playerscore);
}
//Start of Program
setText("title", '<a id="linktitle" href="index.html">Monopoly Adventure V2.6</a>');
addText("output", "Please enter player 1 name.");
