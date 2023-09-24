const letters = [];
const startLetters = 'HI!';

function setup () {
	createCanvas(window.innerWidth, window.innerHeight);
	
	// Generate 5 initial letter
	for(let i = 0; i < startLetters.length; i++) {
		let newLetter = (i) => {
			setTimeout(() => {
				letters.push(new Letter(startLetters[i]));
			}, i * 400);
		};
		
		newLetter(i);
	}
}

function draw() {
	background(300);
	
	noStroke();
	fill(130);
	textSize(32);
	textAlign(CENTER, CENTER);
	text('Start Typing', width / 2, height / 2);
	
	letters.forEach(letter => {
		letter.update();
		letter.draw();
	});
}

function keyPressed() {
	letters.push(new Letter(key));
	// setTimeout(function() {
	// 	letters.splice(0, 1);
	// }, 5000)
}

class Letter {
	constructor(letter) {
		this.position = createVector(random(width / 4, width / 4 * 3), height);
		this.velocity = createVector(0.1, 0);
		this.acceleration = createVector(0, 0);
		this.max_speed = 20;
		this.angle = 0;
		this.angle_speed = random(0.05, 0.25);
		this.letter = letter;
		let upForce = createVector(random(-5, 5), random(-5, -15));
		this.applyForce(upForce);
	}
	
	update() {
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.max_speed);
		this.acceleration.mult(0);
		
		let gravity = createVector(0, 0.2);
		this.applyForce(gravity);
	}
	
	applyForce(f) {
		this.acceleration.add(f);
	}
	
	draw() {
		push();
		translate(this.position.x, this.position.y);
		rotate(this.angle);
		noStroke();
		fill(30);
		textSize(100);
		textAlign(CENTER, CENTER);
		text(this.letter, 0, 0);
		pop();
		
		this.angle+= this.angle_speed;
	}
}