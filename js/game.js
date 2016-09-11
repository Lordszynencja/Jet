class Game {
	tick() {
		time++;
		ui.update();
		ui.draw();
	}
	
	start() {
		window.setInterval(this.tick,20);
		g.draw();
	}
	
	constructor() {
		g = new Graphics();
		s = new Sound();
		c = new Controls;
		ui = new UI();
		this.start();
	}
}

var game = new Game();
