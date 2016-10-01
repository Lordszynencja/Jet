class Game {
	tick() {
		test.addEffect([(time%(FPS*5)-FPS*2.5)*0.01,0.0],0.2);
		ui.update();
		g.update();
		ui.draw();
		time++;
	}
	
	start() {
		window.setInterval(this.tick, 1000/FPS);
		this.draw();
	}
	
	draw() {
		g.draw();
		requestAnimationFrame(game.draw);
	}
	
	constructor() {
		g = new Graphics();
		s = new Sound();
		c = new Controls;
		ui = new UI();
		test = new ShaderEffect0();
	}
}

game = new Game();
game.start();
