var p1; //player1 name
var p2; //player2 name
var p1w = 0; //counter of wins for player1
var p2w = 0; //counter of wins for player2
var wins = 0; //number of runds that have to be win
var currentp; //contain current player
var firstp = Math.floor(Math.random()*2); //random player starts
var counter; //current player chances
var c1 = 3; //player chances
var c2 = 3; //player chances
var drawn = 0; //number hold in memory
var guessed = 0; //holds number guessed by the player
var glength = 0; //huessing number length - for validation purposes
var higher = []; //array of nums higher higher than guessed
var lower = []; //array of nums lower than guessed
var higher_l = 0; //length of array higher - will be used to set lowest value from hihger
var lower_l = 0; //length of arry lower - will be used to se highest value from lower
var pickedh = ""; //displays numbers picked by players that are HIGHER than drawn number
var pickedl = ""; //displays numbers picked by players t

function addPlayers()
{	
	counter = c1;
	document.getElementById("dial_box").innerHTML = "";
	p1 = document.getElementById("pname1").value;
	p2 = document.getElementById("pname2").value;
	wins = document.getElementById("wins").value;
	document.getElementById("add").disabled = true;
	document.getElementById("pname1").disabled = true;
	document.getElementById("pname2").disabled = true;
	document.getElementById("wins").disabled = true;
	document.getElementById("start").disabled = false;
	
	var n1 = p1.length;
	var n2 = p2.length;
	
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
	
	if(n1 == 0 &&  n2 == 0)
	{
		p1 = "Player 1";
		p2 = "Player 2";
		
		if(firstp == 0)
		{
			currentp = p1;
		}
		else
		{
			currentp = p2;
		}
		
		alert("Hello " + p1 + " and " + p2 + "! First one who get " + wins + " wins will win the game!"); 
	}
	else if(n1 == 0)
	{
		p1 = "Player 1";
		p2 = document.getElementById("pname2").value;
		
		if(firstp == 0)
		{
			currentp = p1;
		}
		else
		{
			currentp = p2;
		}
		
		alert("Hello " + p1 + " and " + p2 + "! First one who get " + wins + " wins will win the game!"); 
	}
	else if(n2 == 0)
	{
		p2 = "Player 2";
		p1 = document.getElementById("pname1").value;
		
		if(firstp == 0)
		{
			currentp = p1;
		}
		else
		{
			currentp = p2;
		}
		
		alert("Hello " + p1 + " and " + p2 + "! First one who get " + wins + " wins will win the game!"); 
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
		
		alert("Hello " + p1 + " and " + p2 + "! First one who get " + wins + " wins will win the game!"); 
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
	document.getElementById("pickedh").innerHTML = "Proper number is lower than: ";
	document.getElementById("pickedl").innerHTML = "Proper number is higher than: ";
	if(wins > 1)
	{
		document.getElementById("all_wins").innerHTML = p1 + " wins: " + p1w + "/" + wins + "<br/>" + p2 + " wins " + p2w + "/" + wins;
	}
	alert("Drawn number is " + drawn);//remove it before release 
}

function switchPlayers()//since the switchPlayer() action has to be the last function triggered after pressing button some of the final changes has to be made within this function
{	
	if(currentp == p1)
	{
		currentp = p2;
		counter = c2;
		if(drawn != guessed) //used to prevent dsplaying anothar player turn if the number is already guessed
		{
			if(c1 == 0 && c2 == 0) //this will prevent switching players when both of them has 0 chances left - no point giving turn to a player whi can't perform action
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
			}
		}
	}
	else if(currentp == p2)
	{
		currentp = p1;
		counter = c1;
		if(drawn != guessed) //used to prevent dsplaying anothar player turn if the number is already guessed
		{
			if(c1 == 0 && c2 == 0) //this will prevent switching players when both of them has 0 chances left - no point giving turn to a player whi can't perform action
			{
				document.getElementById("dial_box").innerHTML = "";
				document.getElementById("msg").innerHTML = "Proper number was: " + drawn;
				document.getElementById("check_no").disabled = true;
				document.getElementById("guess_no").disabled = true;
				document.getElementById("next").disabled = false;
			}
			else
			{
				document.getElementById("dial_box").innerHTML = "Now it is " + currentp + " turn!";
			}
		}
	}
}

function compNums()
{
	if(counter != 0)
	{
		guessed = document.getElementById("guess_no").value;
		guessed = parseInt(guessed);
		var glength = guessed.length;
		
		if(glength == 0)
		{
			alert("*Pick your number* field can't be empty!");
		}
		else if(isNaN(guessed) == true)
		{
			alert("Please provide only numbers!");
		}
		else if(guessed > 100)
		{
			alert("Please provide number lower than 100");
		}
		else if(guessed < 1)
		{
			alert("Please provide number higher than 0");
		}
		else if(drawn > guessed)
		{
			document.getElementById("msg").innerHTML = "The number I'm thinking of is higher than " + guessed + " try again!";
			lower.push(guessed);
			lower.sort(function(a, b) {return b-a;});
			if(currentp == p1)
			{
				c1--;
				document.getElementById("notes1").innerHTML = p1 + " remaining chances: " + c1;
				if(c1 == 0 && c2 == 0)
				{
					alert("No body wins. Match is DRAW. Proper number is: " + drawn);
					document.getElementById("guess_no").disabled = true;
					document.getElementById("check_no").disabled = true;
					document.getElementById("next").disabled = false;
				}
				else if(c2 == 0 || c1 == 0)
				{
					document.getElementById("msg").innerHTML = "Number: " + guessed + " is too low. You don't have more chances!";
				}
			}
			else if(currentp == p2)
			{
				c2--;
				document.getElementById("notes2").innerHTML = p2 + " remaining chances: " + c2;
				if(c2 == 0 && c1 == 0)
				{
					alert("No body wins. Match is DRAW. Proper number is: " + drawn);
					document.getElementById("guess_no").disabled = true;
					document.getElementById("check_no").disabled = true;
					document.getElementById("next").disabled = false;
				}
				else if(c2 == 0 || c1 == 0)
				{
					document.getElementById("msg").innerHTML = "Number: " + guessed + " is too low. You don't have more chances!";
				}
			}

			pickedl = lower[0];
			document.getElementById("pickedl").innerHTML = "Proper number is higher than: " + pickedl;
		}
		else if(drawn < guessed)
		{
			document.getElementById("msg").innerHTML = "The number I'm thinking of is lower than " + guessed + " try again!";
			higher.push(guessed);
			higher.sort(function(a, b) {return a-b;});
			if(currentp == p1)
			{
				c1--;
				document.getElementById("notes1").innerHTML = p1 + " remaining chances: " + c1;
				if(c1 == 0 && c2 == 0)
				{
					alert("No body wins. Match is DRAW. Proper number is: " + drawn);
					document.getElementById("guess_no").disabled = true;
					document.getElementById("check_no").disabled = true;
					document.getElementById("next").disabled = false;
				}
				else if(c2 == 0 || c1 == 0)
				{
					document.getElementById("msg").innerHTML = "Number: " + guessed + " is too low. You don't have more chances!";
				}
			}
			else if(currentp == p2)
			{
				c2--;
				document.getElementById("notes2").innerHTML = p2 + " remaining chances: " + c2;
				if(c2 == 0 && c1 == 0)
				{
					alert("No body wins. Match is DRAW. Proper number is: " + drawn);
					document.getElementById("guess_no").disabled = true;
					document.getElementById("check_no").disabled = true;
					document.getElementById("next").disabled = false;
				}
				else if(c2 == 0 || c1 == 0)
				{
					document.getElementById("msg").innerHTML = "Number: " + guessed + " is too low. You don't have more chances!";
				}
			}
			pickedh = higher[0];
			document.getElementById("pickedh").innerHTML = "Proper number is lower than: " + pickedh;
		}
		else if(drawn == guessed)
		{
			if(currentp == p1)
			{
				p1w++;
				document.getElementById("all_wins").innerHTML = p1 + " wins: " + p1w + "/" + wins + "<br/>" + p2 + " wins " + p2w + "/" + wins;
				if(p1w < wins)
				{
					document.getElementById("msg").innerHTML = "Well done! The number " + guessed + " is exactly the number I was thinking of!<br/>" + currentp + " gets a point!";
					document.getElementById("next").disabled = false;
				}
				else if(p1w == wins)
				{
					alert("Winner is " + currentp + "!");
					document.getElementById("msg").innerHTML = "Well done! The number " + guessed + " is exactly the number I was thinking of! <br/> Player: " + currentp + " reached required number of: " + wins + " wins first!";
				}
			}
			else if(currentp == p2)
			{
				p2w++;
				document.getElementById("all_wins").innerHTML = p1 + " wins: " + p1w + "/" + wins + "<br/>" + p2 + " wins " + p2w + "/" + wins;
				if(p2w < wins)
				{
					document.getElementById("msg").innerHTML = "Well done! The number " + guessed + " is exactly the number I was thinking of!<br/>" + currentp + " gets a point!";
					document.getElementById("next").disabled = false;
				}
				else if(p2w == wins)
				{
					alert("Winner is " + currentp + "!");
					document.getElementById("msg").innerHTML = "Well done! The number " + guessed + " is exactly the number I was thinking of! <br/> Player: " + currentp + " reached required number of: " + wins + " wins first!";
				}
			}
			
			document.getElementById("notes1").innerHTML = "";
			document.getElementById("notes2").innerHTML = "";
			document.getElementById("pickedh").innerHTML = "";
			document.getElementById("pickedl").innerHTML = "";
			document.getElementById("dial_box").innerHTML = "";
			document.getElementById("check_no").disabled = true;
			document.getElementById("guess_no").disabled = true;
		}
	}
	else
	{
		document.getElementById("dial_box").innerHTML = "";
		document.getElementById("msg").innerHTML = "No more chances for you " + currentp + ", sorry!";
		document.getElementById("check_no").disabled = true;
		document.getElementById("guess_no").disabled = true;
	}
}

function nextMatch()
{
	drawn = Math.floor(Math.random()*100)+1;
	c1 = 3;
	c2 = 3;
	picked = "";
	pickedh = "";
	pickedl = "";
	document.getElementById("next").disabled = true;
	document.getElementById("guess_no").disabled = false;
	document.getElementById("check_no").disabled = false;
	document.getElementById("msg").innerHTML = "Guess a number between 1 and 100. Good Luck!";
	document.getElementById("notes1").innerHTML = p1 + " remaining chances: " + c1;
	document.getElementById("notes2").innerHTML = p2 + " remaining chances: " + c2;
	document.getElementById("pickedh").innerHTML = "";
	document.getElementById("pickedl").innerHTML = "";
	document.getElementById("pickedh").innerHTML = "Proper number is lower than: ";
	document.getElementById("pickedl").innerHTML = "Proper number is higher than: ";
	alert("Drawn number is " + drawn); //just for test purposes remove b4 release
	
	if(firstp == 1)
	{
		firstp = 0;
		currentp = p1;
		counter = c1;
	}
	else
	{
		firstp = 1;
		currentp = p2;
		counter = c2;
	}
	
	alert("This time " + currentp + " begins!");
	document.getElementById("dial_box").innerHTML = "Now it is " + currentp + " turn!";
}

function reload()
{
	location = location.href;
}