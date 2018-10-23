var p1; //contains player1 name
var p2 = "AI"; //contains CPU name "AI"
var n1 = 0; //will be used to check if player1 provided new name
var p1w = 0; //counter of wins for player1
var p2w = 0; //counter of wins for player2
var firstp = Math.floor(Math.random()*2); //random begginer
var wins = 0; //number of runds that have to be win
var currentp; //contains current player
var drawn = 0; //contain number that has to be found
var guessed = 0; //contain currently guessed number
var glength = 0; //for setting length of guessed number - for validation purposes
var resultH = ""; //result contains nums HIGHER than drawn number
var resultL = ""; //result contains nums LOWER than drawn number
var higher = []; //array of higher nums
var lower = []; //arrary of lower nums
var higher_l = 0;//length of higher num array will be used to determine whihc math operation should be pefrmored / default if both == 0 or special
var lower_l = 0; //length of lower nums array will be used to determine whihc math operation should be pefrmored / default if both == 0 or special
var c1 = 3; //player chances
var c2 = 3; //CPU chances
var ai_trigger = ""; //will be used to start and stop setTimeout(aiGuess) function
var switch_trigger = ""; //will be used to start and stop setTimeout(switchPlayers) function
var end = ""; //will be used to start and stop setTimeout(endMatch) function
var counter = ""; //will be used to tirgger function setTimeout(checkCounters);

function addPlayers()
{	
	document.getElementById("dial_box").innerHTML = "";
	document.getElementById("add").disabled = true;
	document.getElementById("pname1").disabled = true;
	document.getElementById("next").disabled = true;
	document.getElementById("wins").disabled = true;
	document.getElementById("start").disabled = false;
	wins = document.getElementById("wins").value;
	p1 = document.getElementById("pname1").value;
	
	n1 = p1.length;
	
	if(isNaN(wins) == true)
	{
		wins = 1;
		alert("Number of wins has been changed to 1!");
	}
	else if(wins == 0 || wins < 0)
	{
		wins = 1;
		alert("Number of wins has been changed to 1!");
	}
	else if(wins > 100)
	{
		wins = 100;
		alert("Maximum number of rounds is 100! Your wins number has been change to 100.");
	}
	else
	{
		wins = document.getElementById("wins").value;
	}

	if(n1 == 0)
	{
		p1 = "Player 1";
		
		if(firstp == 0)
		{
			currentp = p1;
		}
		else
		{
			currentp = p2;
		}
		
		alert("Hello " + p1 + "! If you will get " + wins + " wins before the AI you will win the game!"); 
	}
	else
	{
		
		if(firstp == 0)
		{
			currentp = p1;
		}
		else
		{
			currentp = p2;
		}
		
		alert("Hello " + p1 + "! If you will get " + wins + " wins before the AI you will win the game!");
	}
}

function startGame()
{
	alert("Starting player is " + currentp + " good luck!");
	drawn = Math.floor(Math.random()*100)+1;
	document.getElementById("start").disabled = true;
	document.getElementById("guess_no").disabled = false;
	document.getElementById("check_no").disabled = false;
	
	document.getElementById("dial_box").innerHTML = "Now it is " + currentp + " turn!";
	document.getElementById("msg").innerHTML = "Guess a number between 1 and 100. Good Luck!";
	document.getElementById("notes1").innerHTML = p1 + " remaining chances: " + c1;
	document.getElementById("notes2").innerHTML = p2 + " remaining chances: " + c2;
	document.getElementById("higher").innerHTML = "Proper number is lower than: ";
	document.getElementById("lower").innerHTML = "Proper number is higher than: ";
	document.getElementById("all_wins").innerHTML = p1 + " wins: " + p1w + "/" + wins + "<br/>" + p2 + " wins " + p2w + "/" + wins;
	
	//alert("Drawn number is " + drawn);//remove it before release 
	if(currentp == p2)
	{
		document.getElementById("guess_no").disabled = true;
		document.getElementById("check_no").disabled = true;
		ai_trigger = setTimeout(aiGuess, 2000);
	}
}

function switchPlayers()
{
	if(currentp == p2)
	{
		currentp = p1;
		
		if(drawn != guessed) //used to prevent displaying another player turn if the number is already guessed
		{
			if(c1 == 0 && c2 == 0) //this will prevent switching players when both of them has 0 chances left - no point giving turn to a player which can't perform action
			{
				document.getElementById("dial_box").innerHTML = ""; //if both c1 & c2 are equal to 0 following changes will be made to be displayed on the screen
				document.getElementById("msg").innerHTML = "Proper number was: " + drawn;
				document.getElementById("check_no").disabled = true;
				document.getElementById("guess_no").disabled = true;
				document.getElementById("next").disabled = false;
			}
			else
			{
				document.getElementById("dial_box").innerHTML = "Now it is " + currentp + " turn!"; //if the game continous just this message will be displayed
				document.getElementById("guess_no").disabled = false; //unlock buttons fro player turn
				document.getElementById("check_no").disabled = false;
			}
			console.log(switchPlayers);
			clearTimeout(switch_trigger);	
		}
	}
	else if(currentp == p1)
	{
		currentp = p2;
		
		if(drawn != guessed) //used to prevent dsplaying another player turn if the number is already guessed
		{
			if(c1 == 0 && c2 == 0) //this will prevent switching players when both of them has 0 chances left - no point giving turn to a player which can't perform action
			{
				document.getElementById("dial_box").innerHTML = ""; //if both c1 & c2 are equal to 0 following changes will be made to be displayed on the screen
				document.getElementById("msg").innerHTML = "Proper number was: " + drawn;
				document.getElementById("check_no").disabled = true;
				document.getElementById("guess_no").disabled = true;
				document.getElementById("next").disabled = false;
			}
			else
			{
				ai_trigger = setTimeout(aiGuess, 2000);
			}
			console.log(switchPlayers);
			clearTimeout(switch_trigger);
		}
	}
}

function aiGuess()
{	
	document.getElementById("guess_no").disabled = true;
	document.getElementById("check_no").disabled = true;
	document.getElementById("dial_box").innerHTML = "Now it is " + currentp + " turn!";
	if(c2 != 0)
	{
		if(higher_l == 0 && lower_l == 0)
		{
			guessed = Math.floor(Math.random()*100)+1;
			
			if(guessed > drawn)
			{
				c2--;
				document.getElementById("notes2").innerHTML = p2 + " remaining chances: " + c2;
				higher.push(guessed);
				higher_l = higher.length;
				resultH = higher[0];
				document.getElementById("higher").innerHTML = "Proper number is lower than: " + resultH;
				
				counter = setTimeout(checkCounters, 100);
				
				switch_trigger = setTimeout(switchPlayers, 2000);
			}
			else if(guessed < drawn)
			{
				c2--;
				document.getElementById("notes2").innerHTML = p2 + " remaining chances: " + c2;
				lower.push(guessed);
				lower_l = lower.length;
				resultL = lower[0];
				document.getElementById("lower").innerHTML = "Proper number is higher than: " + resultL;
				
				counter = setTimeout(checkCounters, 100);
				
				switch_trigger = setTimeout(switchPlayers, 2000);
			}
			else if(guessed == drawn)
			{
				p2w++;
				document.getElementById("all_wins").innerHTML = p1 + " wins: " + p1w + "/" + wins + "<br/>" + p2 + " wins " + p2w + "/" + wins;
				
				if(p2w < wins)
				{
					document.getElementById("msg").innerHTML = "AI found the number: " + guessed + " first!<br/>" + currentp + " and gets a point!";
					document.getElementById("next").disabled = false;
				}
				else if(p2w == wins)
				{
					alert("Winner is " + currentp + "!");
					document.getElementById("msg").innerHTML = "AI found the number: " + guessed + " <br/> Player: " + currentp + " reached required number of: " + wins + " wins first!";
				}
				
				end = setTiemout(endMatch, 100);
			}
		}
		else if(higher_l > 0 && lower_l == 0)
		{	
			guessed = Math.floor(Math.random()*(higher[0]-1))+1;
			
			if(guessed > drawn)
			{
				c2--;
				document.getElementById("notes2").innerHTML = p2 + " remaining chances: " + c2;
				higher.push(guessed);
				higher_l = higher.length;
				higher.sort(function(a, b) {return a-b;}); //numberArray.sort((a, b) => (a - b)); shortened version to use it it has to be arrow function supported
				resultH = higher[0];
				document.getElementById("higher").innerHTML = "Proper number is lower than: " + resultH;
				
				counter = setTimeout(checkCounters, 100);
				
				switch_trigger = setTimeout(switchPlayers, 2000);
			}
			else if(guessed < drawn)
			{	
				c2--;
				document.getElementById("notes2").innerHTML = p2 + " remaining chances: " + c2;
				lower.push(guessed);
				lower_l = lower.length;
				resultL = lower[0];
				document.getElementById("lower").innerHTML = "Proper number is higher than: " + resultL;

				counter = setTimeout(checkCounters, 100);
				
				switch_trigger = setTimeout(switchPlayers, 2000);
			}
			else if(guessed == drawn)
			{
				p2w++;
				document.getElementById("all_wins").innerHTML = p1 + " wins: " + p1w + "/" + wins + "<br/>" + p2 + " wins " + p2w + "/" + wins;
				
				if(p2w < wins)
				{
					document.getElementById("msg").innerHTML = "AI found the number: " + guessed + " first!<br/>" + currentp + " and gets a point!";
					document.getElementById("next").disabled = false;
				}
				else if(p2w == wins)
				{
					alert("Winner is " + currentp + "!");
					document.getElementById("msg").innerHTML = "AI found the number: " + guessed + " <br/> Player: " + currentp + " reached required number of: " + wins + " wins first!";
				}
				
				end = setTimeout(endMatch, 100);
			}
		}
		else if(higher_l == 0 && lower_l > 0)
		{
												//max - min      +1 + min   = losowanie od max do min
			guessed =  Math.floor(Math.random()*(100-(lower[0]+1)+1)+(lower[0]+1));
			
			if(guessed > drawn)
			{
				c2--;
				document.getElementById("notes2").innerHTML = p2 + " remaining chances: " + c2;
				higher.push(guessed);
				higher_l = higher.length;
				resultH = higher[0];
				document.getElementById("higher").innerHTML = "Proper number is lower than: " + resultH;
				
				counter = setTimeout(checkCounters, 100);
				
				switch_trigger = setTimeout(switchPlayers, 2000);
			}
			else if(guessed < drawn)
			{	
				c2--;
				document.getElementById("notes2").innerHTML = p2 + " remaining chances: " + c2;
				lower.push(guessed);
				lower_l = lower.length;
				lower.sort(function(a, b) {return b-a});
				resultL = lower[0];
				document.getElementById("lower").innerHTML = "Proper number is higher than: " + resultL;
				
				counter = setTimeout(checkCounters, 100);
				
				switch_trigger = setTimeout(switchPlayers, 2000);
			}
			else if(guessed == drawn)
			{
				p2w++;
				document.getElementById("all_wins").innerHTML = p1 + " wins: " + p1w + "/" + wins + "<br/>" + p2 + " wins " + p2w + "/" + wins;
				
				if(p2w < wins)
				{
					document.getElementById("msg").innerHTML = "AI found the number: " + guessed + " first!<br/>" + currentp + " and gets a point!";
					document.getElementById("next").disabled = false;
				}
				else if(p2w == wins)
				{
					alert("Winner is " + currentp + "!");
					document.getElementById("msg").innerHTML = "AI found the number: " + guessed + " <br/> Player: " + currentp + " reached required number of: " + wins + " wins first!";
				}
				
				end = setTimeout(endMatch, 100);
			}
		}
		else if(higher_l > 0 && lower_l > 0)
		{ //losuje od 0 (ZERA) do (max-min+1) i dodaje + min;
			guessed = Math.floor(Math.random()*((higher[0])-((lower[0]+1)+1))+(lower[0]+1));
			
			if(guessed > drawn)
			{
				c2--;
				document.getElementById("notes2").innerHTML = p2 + " remaining chances: " + c2;
				higher.push(guessed);
				higher_l = higher.length;
				higher.sort(function(a, b) {return a-b;});
				resultH = higher[0];
				document.getElementById("higher").innerHTML = "Proper number is lower than: " + resultH;

				counter = setTimeout(checkCounters, 100);
				
				switch_trigger = setTimeout(switchPlayers, 2000);
			}
			else if(guessed < drawn)
			{	
				c2--;
				document.getElementById("notes2").innerHTML = p2 + " remaining chances: " + c2;
				lower.push(guessed);
				lower_l = lower.length;
				lower.sort(function(a, b) {return b-a});
				resultL = lower[0];
				document.getElementById("lower").innerHTML = "Proper number is higher than: " + resultL;

				counter = setTimeout(checkCounters, 100);
				
				switch_trigger = setTimeout(switchPlayers, 2000);
			}
			else if(guessed == drawn)
			{
				p2w++;
				document.getElementById("all_wins").innerHTML = p1 + " wins: " + p1w + "/" + wins + "<br/>" + p2 + " wins " + p2w + "/" + wins;
				
				if(p2w < wins)
				{
					document.getElementById("msg").innerHTML = "AI found the number: " + guessed + " first!<br/>" + currentp + " and gets a point!";
					document.getElementById("next").disabled = false;
				}
				else if(p2w == wins)
				{
					alert("Winner is " + currentp + "!");
					document.getElementById("msg").innerHTML = "AI found the number: " + guessed + " <br/> Player: " + currentp + " reached required number of: " + wins + " wins first!";
				}
				
				end = setTimeout(endMatch, 100);
			}
		}
	}
	else
	{
		document.getElementById("dial_box").innerHTML = "";
		document.getElementById("msg").innerHTML = "No more chances for " + currentp + " it is " + p1 + " last chance!";
		document.getElementById("check_no").disabled = true;
		document.getElementById("guess_no").disabled = true;

		switch_trigger = setTimeout(switchPlayers, 2000);
	}
	console.log(aiGuess);
	
	return;
}

function checkCounters()
{
	if(c1 == 0 && c2 == 0)
	{
		alert("No body wins. Match is DRAW. Proper number is: " + drawn);
		document.getElementById("guess_no").disabled = true;
		document.getElementById("check_no").disabled = true;
		document.getElementById("next").disabled = false;
		
		return;
	}
	else if(c1 == 0 || c2 == 0)
	{
		document.getElementById("msg").innerHTML = "Number: " + guessed + " No more chances!";
		
		return;
	}	
	console.log(checkCounters);
	clearTimeout(checkCounters);
}

function compNums()
{
	if(c1 != 0)
	{
		guessed = document.getElementById("guess_no").value;
		guessed = parseInt(guessed);
		glength = guessed.length;
			
		if(isNaN(guessed) == true)
		{
			alert("Please provide only numbers!");
		}
		else if(glength == 0)
		{
			alert("*Pick your number* field can't be empty!");
		}
		else if(guessed > 100)
		{
			alert("Please provide number lower than 100");
		}
		else if(guessed < 1)
		{
			alert("Please provide number higher than 0");
		}
		else if(guessed > drawn)
		{
			c1--;
			document.getElementById("msg").innerHTML = "The number I'm thinking of is lower than " + guessed + " try again!";
			document.getElementById("notes1").innerHTML = p1 + " remaining chances: " + c1;
			higher.push(guessed);
			higher_l = higher.length;
			higher.sort(function(a, b) {return a-b;});
			resultH = higher[0];
			document.getElementById("higher").innerHTML = "Proper number is lower than: " + resultH;
			
			document.getElementById("guess_no").disabled = true;
			document.getElementById("check_no").disabled = true;
			
			counter = setTimeout(checkCounters, 100);
			
			switch_trigger = setTimeout(switchPlayers, 2000);
		}
		else if(guessed < drawn)
		{
			c1--;
			document.getElementById("msg").innerHTML = "The number I'm thinking of is higher than " + guessed + " try again!";
			document.getElementById("notes1").innerHTML = p1 + " remaining chances: " + c1;
			lower.push(guessed);
			lower_l = lower.length;
			lower.sort(function(a, b) {return b-a});
			resultL = lower[0];
			document.getElementById("lower").innerHTML = "Proper number is higher than: " + resultL;
			
			document.getElementById("guess_no").disabled = true;
			document.getElementById("check_no").disabled = true;
			
			counter = setTimeout(checkCounters, 100);
			
			switch_trigger = setTimeout(switchPlayers, 2000);
		}
		else if(guessed == drawn)
		{
			p1w++;
			document.getElementById("all_wins").innerHTML = p1 + " wins: " + p1w + "/" + wins + "<br/>" + p2 + " wins " + p2w + "/" + wins;
			
			if(p1w < wins)
			{
				document.getElementById("msg").innerHTML = "You found the number: " + guessed + " first!<br/>" + currentp + " and gets a point!";
				document.getElementById("next").disabled = false;
			}
			else if(p1w == wins)
			{
				alert("Winner is " + currentp + "!");
				document.getElementById("msg").innerHTML = "You found the number: " + guessed + " <br/> Player: " + currentp + " reached required number of: " + wins + " wins first!";
			}
			
			end = setTimeout(endMatch, 100);
		}
	}
	alert(lower + " : " + lower[0] + " | " + lower_l + " || " + higher + " : " + higher[0] + " | " + higher_l);
	console.log(compNums);
	
	return;
}


function endMatch()
{
			document.getElementById("notes1").innerHTML = "";
			document.getElementById("notes2").innerHTML = "";
			document.getElementById("higher").innerHTML = "";
			document.getElementById("lower").innerHTML = "";
			document.getElementById("dial_box").innerHTML = "";
			document.getElementById("check_no").disabled = true;
			document.getElementById("guess_no").disabled = true;
			
			return;
}

function nextMatch()
{
	drawn = Math.floor(Math.random()*100)+1;
	c1 = 3;
	c2 = 3;
	higher = [];
	lower = [];
	higher_l = 0;
	lower_l = 0;
	resultH = "";
	resultL = "";
	document.getElementById("next").disabled = true;
	document.getElementById("guess_no").disabled = false;
	document.getElementById("check_no").disabled = false;
	document.getElementById("msg").innerHTML = "Guess a number between 1 and 100. Good Luck!";
	document.getElementById("notes1").innerHTML = p1 + " remaining chances: " + c1;
	document.getElementById("notes2").innerHTML = p2 + " remaining chances: " + c2;
	document.getElementById("higher").innerHTML = "";
	document.getElementById("lower").innerHTML = "";
	document.getElementById("higher").innerHTML = "Proper number is lower than: ";
	document.getElementById("lower").innerHTML = "Proper number is higher than: ";
	//alert("Drawn number is " + drawn); //just for test purposes remove b4 release
	
	if(firstp == 1)
	{
		firstp = 0;
		currentp = p1;
	}
	else
	{
		firstp = 1;
		currentp = p2;
		ai_trigger = setTimeout(aiGuess, 2000);
	}
	
	alert("This time " + currentp + " begins!");
	document.getElementById("dial_box").innerHTML = "Now it is " + currentp + " turn!";
}

function reload()
{
	location = location.href;
}
