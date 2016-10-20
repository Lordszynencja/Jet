var effectPos = [0.0,0.0];
var effectsize = 0.2;
var effectAngle = 0.0;

class Game {
	tick() {
		ui.update();
		g.update();
		ui.draw();
		if (time%FPS*2) game.saveGame();
		//g.addEffect1([0,0],10, Math.PI*0.5, [0.1,0.1,1]);
		/*g.addEffect1(effectPos,effectsize,effectAngle+Math.PI*time/100, [0.1,0.1,1]);
		g.addEffect1(effectPos,effectsize,effectAngle+Math.PI*(0.5+time/100), [1,0.1,0.1]);
		g.addEffect1(effectPos,effectsize,effectAngle+Math.PI*(1+time/100), [1,1,0.1]);
		g.addEffect1(effectPos,effectsize,effectAngle+Math.PI*(1.5+time/100), [0.1,1,0.1]);*/
		time++;
	}
	
	start() {
		window.setInterval(this.tick, 1000/FPS);
		this.draw();
	}
	
	saveConfig() {
		save(this.saveConfigName, conf);
	}
	
	loadConfig() {
		var loadedSave = load(this.saveConfigName);
		if (loadedSave) {
			for (var i in loadedSave) conf[i] = loadedSave[i];
		}
	}
	
	saveGame() {
		save(this.saveName, stats);
	}
	
	loadGame() {
		var loadedSave = load(this.saveName);
		if (loadedSave) {
			for (var i in loadedSave) stats[i] = loadedSave[i];
		}
	}
	
	draw() {
		g.draw();
		requestAnimationFrame(game.draw);
	}
	
	constructor() {
		if (!loaded) {
			loaded = true;
			g = new Graphics();
			s = new Sound();
			c = new Controls;
			ui = new UI();
		}
		this.saveName = 'gameSave';
		this.saveConfigName = 'theJetConfig';
	}
}

game = new Game();
game.loadGame();
game.start();
