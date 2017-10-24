/*var bubble = {
	x: 300,
	y: 200
}

function setup() { // built-in P5.JS function -=- this runs once
	createCanvas(600, 400); 
}

function draw() { // built-in P5.JS function -=-  automatic loop that repeats forever
	background(0); // give the canvas a black background
	move();
	display();
}

function display() {
	stroke(255); // white outline
	strokeWeight(4); // line width
	noFill();
	ellipse(bubble.x, bubble.y, 24, 24); // draw an ellipse/circle
}

function move() {
	bubble.x = bubble.x + random(-5,5);
	bubble.y = bubble.y + random(-5,5);
}*/

function setup()//required function p5
{
	createCanvas(600,400);
	bubble1 = new Bubble(100, 100);
	bubble2 = new Bubble(150, 150);
}
function draw()//required function p5- while(true)
{
	background(0);
	bubble1.move();
	bubble1.show();
	bubble2.move();
	bubble2.show();
	
}

class Bubble 
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}
	move()
	{
		do
		{
			this.x += random(-50, 50);
			this.y+= random(-50, 50);
		} while(this.x <= 0 || this.x >= 600 || this.y <= 0 || this.y >= 400);
	}
	show()
	{
		stroke(255);
		strokeWeight(4);
		noFill();
		ellipse(this.x, this.y, 24, 24);
	}
}