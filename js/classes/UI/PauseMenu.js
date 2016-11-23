class PauseMenu {
	onPress(name) {
		if (name=='esc') {
			delete ui.menu;
			ui.newMenu(new Interface(this.level));
		} else if (name=='enter') {
			if (this.position == 0) {
				delete ui.menu;
				ui.newMenu(new Interface(this.level));
				s.setMusicVolume(1);
			} else {
				delete ui.menu;
				ui.newMenu(new LevelSelectMenu());
				s.changeMusic('menu');
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
	
	drawOptions() {
		for (var i in this.optionsV) {
			g.addGUITexture(this.options[i], this.optionsV[i]);
		}
		g.addGUITexture('Select', this.optionsV[this.position]);
	}
	
	draw() {
		g.addBackgroundTexture(this.level.texture, makeCoords2(1,1));
		p.draw();
		for (var i in effects) effects[i].draw();
		for (var i in enemies) enemies[i].draw();
		for (var i in playerMissiles) playerMissiles[i].draw();
		for (var i in enemyMissiles) enemyMissiles[i].draw();
		drawStandardHp();
		drawStandardHeat();
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