var p1;
var c1 = 6;
var drawn = 0;
var guessed = 0;
var glength = 0; //huessing number length - for validation purposes
var higher = []; //array of nums higher higher than guessed
var lower = []; //array of nums lower than guessed
var higher_l = 0; //length of array higher - will be used to set lowest value from hihger
var lower_l = 0; //length of arry lower - will be used to se highest value from lower
var notes = "";
var pickedh = "";
var pickedl = "";

function addPlayers()
{	
	document.getElementById("dial_box").innerHTML = "";
	p1 = document.getElementById("pname1").value;
	document.getElementById("add").disabled = true;
	document.getElementById("pname1").disabled = true;
	document.getElementById("start").disabled = false;
	
	var n1 = p1.length;

	if(n1 == 0)
	{
		p1 = "Player 1";
		alert("Hello " + p1); 
	}
	else
	{
		alert("Hello " + p1);
	}
}

function startGame()
{
	alert("Good luck! " + p1 + " pick number from 1 to 100 until you run out of chances or you hit the right number!");
	drawn = Math.floor(Math.random()*100)+1;
	document.getElementById("start").disabled = true;
	document.getElementById("guess_no").disabled = false;
	document.getElementById("check_no").disabled = false;
	
	document.getElementById("dial_box").innerHTML = p1 + " is choosing... ";
	document.getElementById("msg").innerHTML = "Guess a number between 1 and 100. Good Luck!";
	document.getElementById("notes1").innerHTML = p1 + " remaining chances: " + c1;
}

function compNums()
{
	if(c1 != 0)
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
			alert("Please provide number less than 100");
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
			c1--;
			document.getElementById("notes1").innerHTML = p1 + " remaining chances: " + c1;
			if(c1 == 0)
			{
				document.getElementById("msg").innerHTML = "Number: " + guessed + " is too low. You don't have more chances! Proper number was: " + drawn;
				document.getElementById("guess_no").disabled = true;
				document.getElementById("check_no").disabled = true;
				document.getElementById("next").disabled = false;
			}
			
			pickedl = lower[0];
			document.getElementById("pickedl").innerHTML = "Lower: " + pickedl;
		}
		else if(drawn < guessed)
		{
			document.getElementById("msg").innerHTML = "The number I'm thinking of is lower than " + guessed + " try again!";
			higher.push(guessed);
			higher.sort(function(a, b) {return a-b;});
			c1--;
			document.getElementById("notes1").innerHTML = p1 + " remaining chances: " + c1;
			
			if(c1 == 0)
			{
				document.getElementById("msg").innerHTML = "Number: " + guessed + " is too low. You don't have more chances! Proper number was: " + drawn;
				document.getElementById("guess_no").disabled = true;
				document.getElementById("check_no").disabled = true;
				document.getElementById("next").disabled = false;
			}
			
			pickedh = higher[0];
			document.getElementById("pickedh").innerHTML = "Higher: " + pickedh;
		}
		else
		{
			alert("Well done! " + p1 + " The number " + guessed + " is exactly the number i was thinking of! You are the winner!");
			document.getElementById("msg").innerHTML = "Winner is " + p1 + "!";
			document.getElementById("notes").innerHTML = "";
			document.getElementById("pickedh").innerHTML = "";
			document.getElementById("pickedl").innerHTML = "";
			document.getElementById("dial_box").innerHTML = "";
			document.getElementById("next").disabled = false;
			document.getElementById("check_no").disabled = true;
			document.getElementById("guess_no").disabled = true;
		}
	}
	else //it should not be necessary to call this code but it is here just in case to handle situation like this
	{
		document.getElementById("dial_box").innerHTML = "";
		document.getElementById("msg").innerHTML = "No more chances for you " + p1 + ", sorry!";
		document.getElementById("check_no").disabled = true;
		document.getElementById("guess_no").disabled = true;
	}
}

function nextMatch()
{
	drawn = Math.floor(Math.random()*100)+1;
	c1 = 6;
	pickedh = "";
	pickedl = "";
	document.getElementById("guess_no").disabled = false;
	document.getElementById("check_no").disabled = false;
	document.getElementById("next").disabled = true;
	document.getElementById("msg").innerHTML = "Guess a number between 1 and 100. Good Luck!";
	document.getElementById("notes1").innerHTML = p1 + " remaining chances: " + c1;
	document.getElementById("pickedh").innerHTML = "";
	document.getElementById("pickedl").innerHTML = "";
}

function reload()
{
	location = location.href;
}