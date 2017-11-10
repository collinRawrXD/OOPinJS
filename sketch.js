bubbles = []
score = 0;
gameState = 0;
goodBubbles = 10;
evilBubbles = 15;
clock = 100;
show = false;
showEff = true;
var ding = new Audio("ding.wav");
var buzz = new Audio("buzz.mp3");
cont = true;
counterSpeed = 0;

function setup()//required function p5

{
	createCanvas(600,400);
	for(i = 0; i < goodBubbles; i++)
	
{
		bubbles[i] = new Bubble(random(0,width), random(0, height), random(20,50), false);
	}
	for(i = goodBubbles; i < goodBubbles + evilBubbles; i++)
	
{
		bubbles[i] = new Bubble(random(0,width), random(0, height), random(10,50), true);
	}
	setInterval(tick, 1000);
	setInterval(flashy, 350);
}
function draw()//required function p5- while(true)

{
	background(0);
	switch(gameState)
	{
		case 0:
			textAlign(CENTER);
			fill(255, 255, 255, 255);
			textSize(32);
			text("Welcome to my bubble game", width/2, height/2.2);
			textSize(16);
			text("Click to start", width/2, height/1.8);
			clock = 100;
			score = 0;
			break;
		case 1:
			moveBubbles();
			showBubbles();
			scoreboard();
			if(cont)
			{
				if(score >= 100)
					gameState = 2;
				else if(clock == 0)
					gameState = 3;
			}
			break;
		case 2:
			showBubbles();
			moveBubbles();
			background(0, 255, 0, 63);
			scoreboard();
			if(show)
{
				textAlign(CENTER);
				stroke(0, 0, 0, 0);
				fill(0, 255, 0, 255);
				textSize(40);
				text("YOU WIN", width/2, height/2.2);
				textSize(20);
				text("Click to return to title", width/2, height/1.8);
			}
			break;
		case 3:
			showBubbles();
			background(255, 0, 0, 63);
			scoreboard();
			if(show)
			{
				textAlign(CENTER);
				stroke(0, 0, 0, 0);
				fill(255, 0, 0, 255);
				textSize(40);
				text("YOU LOSE", width/2, height/2.2);
				textSize(20);
				text("Click to return to title", width/2, height/1.8);
			}
			break;
	}
	if(counterSpeed != 0)
	{
		addTicker(counterSpeed);
		counterSpeed = 0;
	}
}

function flashy()
{
	show = !show;
}

function scorePoint(upDown)
{
	score += upDown/Math.abs(upDown);
}
function addTicker(speed)
{
	setInterval(function(){scorePoint(speed)}, Math.abs(speed));
}

function tick()
{
	if(gameState == 1 && clock > 0) clock--;
}

function clickAllGood()
{
	for(i = 0; i < bubbles.length; i++)
	{
		if(!bubbles[i].evil)
		{
			bubbles[i].click();
		}
	}
}
function scoreboard()
{
	textSize(32);
	stroke(0, 0, 0, 0);
	fill(255, 255, 255, 255);
	textAlign(LEFT);
	text("Score: " + score, 10, 30);
	text("Time: " + clock, 10, 70);
	fill(0, 255, 0, 255);
	text("100 TO WIN!", 10, 110);
	if(showEff)
	{
		let diff = 100 - clock - score;
		textAlign(RIGHT);
		text("Diff: " + diff, width - 10, 30);
		text("% off: " + Math.round((diff / clock) * 1000)/10, width - 10, 70);
	}
}

function showBubbles()
{
	for(i = 0; i < bubbles.length; i++)
	{
		bubbles[i].show();
	}
}

function moveBubbles()
{
	for(i = 0; i < bubbles.length; i++)
	{
		bubbles[i].move();
	}
}

function mousePressed()
{
	console.log("Detected click.");
	switch(gameState)
	{
		case 0:
			gameState = 1;
			break;
		case 1:
			for(var z = 0; z < bubbles.length; z++)
			{
				bubbles[z].click();
			}
			break;
		case 2:
		case 3:
		default:
			gameState = 0;
	}
}

function unclickAll()
{
	console.log("Unclicking...")
	for(i = 0; i < bubbles.length; i++)
	{
		bubbles[i].unclick();
	}
}

function checkClicked()
{
	//&& == !(!||!)
	for(i = 0; i < bubbles.length; i++)
	{
		if(!(bubbles[i].evil || bubbles[i].clicked))
		{
			console.log("Reset check: Bubble #" + bubbles[i].id + " is good and unclicked.")
			return false;
		}
	}
	console.log("Reset check: No good bubbles unclicked.")
	return true;
}


id = 0;
class Bubble 
{
	constructor(_x, _y, _r, _evil)
	{
		this.x = _x;
		this.y = _y;
		this.r = _r;
		this.id = id;
		id++;
		this.color = [0,0,0,0];
		this.clicked = false;
		this.evil = _evil;
	}
	move()
	{
		this.x += random(-5, 5);
		this.y += random(-5, 5);
		//Move the bubble slightly farther away from the cursor if it is good
		let bandDrift = ((score - 20) * -.01) / 4;
		if(this.evil)
		{
			console.log("bandDrift = " + bandDrift);
			if(mouseX < this.x) 
			{
				this.x += bandDrift;
			}
			else if(mouseX > this.x) 
			{
				this.x -= bandDrift;
			}
			
			if(mouseY > this.y) 
			{
				this.y += bandDrift; 
				console.log("Bubble drifted down!");
			}
			else if(mouseY < this.Y) 
			{
				this.y -= bandDrift; 
				console.log("Bubble drifted up!");
			}
		}
		else
		{
			if(mouseX < this.x) 
			{
				this.x -= bandDrift;
			}
			else if(mouseX > this.x) 
			{
				this.x += bandDrift;
			}
			
			if(mouseY > this.y) 
			{
				this.y += bandDrift; 
			}
			else if(mouseY < this.Y) 
			{
				this.y += bandDrift; 
			}
		}
		this.checkEdges();
	}
	checkEdges()
	{
		if(this.x < 0)
		{
			this.x = 5;
			this.move();
		}
		if(this.y < 0)
		{
			this.y = 5;
			this.move();
		}
		if(this.x > width)
		{
			this.x = width - 5;
			this.move();
		}
		if(this.y > height)
		{
			this.y = height - 5;
			this.move();
		}
	}
	show()
	{
		if(this.evil)
		{
			stroke(255, 0, 0, 255);
		}
		else
		{
			stroke(255, 255, 255, 255);
		}
		strokeWeight(4);
		fill(this.color);
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	}
	click()
	{
		if(dist(mouseX, mouseY, this.x, this.y) < this.r)
		{
			if(!this.clicked)
			{
				if(this.evil)
				{
					console.log("Clicked bubble #" + this.id + "! (Evil)");
				}
				else
				{
					console.log("Clicked bubble #" + this.id + "! (Good)")					;
				}
				let colorTotal = 0;
				let curRand;
				if(!this.evil)
				{
					do
					{
						colorTotal = 0;
						for(var i = 0; i < 3; i++)
						{
							curRand = random(0,255);
							colorTotal += curRand;
							this.color[i] = curRand;
						}
					}while(colorTotal <= 300);
					this.color[3] = 127;
					this.clicked = true;
					score++;
					ding.play();
				}
				else
				{
					let opac = 255 - ((255 - this.color[3]) * .75);
					this.color = [255, 0, 0, opac]
					score--;
					buzz.play();
				}
				if(checkClicked())
				{
					unclickAll();
				}
			}
		}
	}
	unclick()
	{
		this.color = [0, 0, 0, 0];
		this.x = random(0, width);
		this.x = random(0, width);
		this.y = random(0, height);
		this.r = random(20, 50);
		this.clicked = false;
	}
}