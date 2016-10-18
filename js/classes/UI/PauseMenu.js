class PauseMenu {
	onPress(name) {
		if (name=='esc') {
			delete ui.menu;
			ui.newMenu(new Interface(this.level));
		} else if (name=='enter') {
			if (this.position == 0) {
				delete ui.menu;
				ui.newMenu(new Interface(this.level));
			} else {
				delete ui.menu;
				ui.newMenu(new LevelSelectMenu());
			}
		} else if (this.position<this.options.length-1 && name=='down') {
			this.position++;
		} else if (this.position>0&& name=='up') {
			this.position--;
		}
	}
	
	update() {
	}
	
	drawScore() {
		var iscore = [0,0,0,0,0,0];
		var s = this.score;
		var j;
		for (j=0;j<6;j++) {
			iscore[5-j] = (s%10).toString();
			s = Math.floor(s/10);
		}
		g.drawText(-0.9,-0.9,iscore,0.1);
	}
	
	drawLife() {
		var lifeV = makeCoords4(0.55,0.95-((100.0-p.hp)/250.0),-0.95,-0.85);
		g.addGUITexture('HealthBg', this.lifeBgV);
		g.addGUITexture('Health', lifeV);
	}
	
	drawHeat() {
		var heatV = makeCoords4(0.1,0.5-((100.0-p.ship.heat)/250.0),-0.95,-0.85);
		g.addGUITexture('HealthBg', this.heatBgV);
		g.addGUITexture('Health', this.heatCriticalV);
		g.addGUITexture('Heat', heatV);
	}
	
	drawOptions() {
		for (var i in this.optionsV) {
			g.addGUITexture(this.options[i], this.optionsV[i]);
		}
		g.addGUITexture('Select', this.optionsV[this.position]);
	}
	
	draw() {
		g.addBackgroundTexture(this.level.texture, makeCoords2(1,1));
		p.draw();
		for (var i in enemies) enemies[i].draw();
		for (var i in playerMissiles) playerMissiles[i].draw();
		for (var i in enemyMissiles) enemyMissiles[i].draw();
		this.drawLife();
		this.drawHeat();
		this.drawScore();
		this.drawOptions();
	}
	
	constructor(level) {
		this.position = 0;
		this.heatBgV = makeCoords4(0.1,0.5,-0.95,-0.85);
		this.heatCriticalV = makeCoords4(0.4,0.5,-0.95,-0.85);
		this.lifeBgV = makeCoords4(0.55,0.95,-0.95,-0.85);
		
		this.options = ['Continue','Exit'];
		this.optionsV = prepareOptionsVertexes(this.options.length);
		
		this.level = level;
	}
}