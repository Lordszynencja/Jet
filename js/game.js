var test;
var game;

class Game {
	tick() {
		time++;
		ui.update();
		ui.draw();
		for (var i in test.position) {
			if (i%2==0) {
				test.position[i]+=0.01;
				test.move[i]+=0.01;
			}
		}
	}
	
	start() {
		window.setInterval(this.tick,20);
		this.draw();
	}
	
	draw() {
		gl.clearColor(0.0,0.0,0.0,1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT);
		gl.clear(gl.COLOR_BUFFER_BIT);
		g.draw();
		test.draw();
		requestAnimationFrame(game.draw);
	}
	
	constructor() {
		g = new Graphics();
		s = new Sound();
		c = new Controls;
		ui = new UI();
		gl = g.gl;
		test = new shaderEffect0();
	}
}

game = new Game();
game.start();

test.addEffect([0.2,0.0],0.2);