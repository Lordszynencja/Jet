/*

Game created by Szymon Lewandowski
Music by Machiane Supremacy used for research purposes

*/

var effectPos = [0.0,0.0];
var effectsize = 0.2;
var effectAngle = 0.0;

class Game {
	tick() {
		g.update();
		ui.update();
		ui.draw();
		//g.addLight([0,0], [-200,-200,-200], 1, [0, Math.PI]);
		//g.addEffect1(effectPos,effectsize,effectAngle+Math.PI*(0.5+time/100), [1,0.1,0.1]);
		//g.setInvertion([0, 0], Math.abs(Math.sin(time/FPS)));
		/*var text = "Exit";
		var fontSize = 0.1;
		var position = [0.5, 0.5];
		g.drawText(position[0], position[1], "Exit", fontSize, [1,1,1,1]);
		g.addGUITexture('Select', findSelectSize('Exit', fontSize, position));*/
		if (time%FPS*2) game.saveGame();
		//effects.push(new Particle([0, 0], Math.PI/2 + Math.random()*0.2, Math.random()*0.1, FPS*0.5, [1,0.5,0,1], 1, effects.length));
		//g.addEffect0([1,1], 0.5, time/FPS/4, [1,1,0], Math.sin(time/FPS)+1);
		//g.addEffect1([0,0],10, Math.PI*0.5, [0.1,0.1,1]);
		/*g.addEffect1(effectPos,effectsize,effectAngle+Math.PI*time/100, [0.1,0.1,1]);
		g.addEffect1(effectPos,effectsize,effectAngle+Math.PI*(0.5+time/100), [1,0.1,0.1]);
		g.addEffect1(effectPos,effectsize,effectAngle+Math.PI*(1+time/100), [1,1,0.1]);
		g.addEffect1(effectPos,effectsize,effectAngle+Math.PI*(1.5+time/100), [0.1,1,0.1]);*/
		time++;
	}
	
	start() {
		window.setInterval(this.tick, 1000/FPS);
		requestAnimationFrame(game.draw);
		s.changeMusic('menu', 0);
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
		save(this.saveConfigName, conf);
		savePlayer();
	}
	
	loadGame() {
		var loadedSave = load(this.saveName);
		if (loadedSave) {
			for (var i in loadedSave) stats[i] = loadedSave[i];
		}
		var loadedConfigSave = load(this.saveConfigName);
		if (loadedConfigSave) {
			for (var i in loadedConfigSave) conf[i] = loadedConfigSave[i];
		}
		this.handleStatsVersion(stats.version);
	}
	
	draw() {
		g.draw();
		requestAnimationFrame(game.draw);
	}
	
	handleStatsVersion(v) {
		if (v<actualVersion) {
			console.log('old save, version:'+v);
			if (v == undefined || v == null || v<2) this.resetProgress();
			else {
				loadPlayer();
			}
			stats.version = actualVersion;
		} else {
			loadPlayer();
		}
	}
	
	resetProgress() {
		stats.score = 0;
		stats.money = 200;
		stats.level = 0;
		stats.shotsFired = 0;
		stats.enemiesDefeated = 0;
		stats.bossesDefeated = 0;
		p.ship = new SmallShip();
		p.cargo = [];
	}
	
	constructor() {
		if (!loaded) {
			loaded = true;
			g = new Graphics();
			s = new Sound();
			c = new Controls();
			ui = new UI();
			p = new Player();
			p.ship = new Ship1();
		}
		this.saveName = 'gameSave';
		this.saveConfigName = 'theJetConfig';
	}
}

game = new Game();
game.loadGame();
game.start();

function z() {
	stats.money = 9999;
}
