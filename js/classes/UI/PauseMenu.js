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
		} else if (this.position == 0 && name=='down') {
			this.position = 1;
		} else if (this.position == 1 && name=='up') {
			this.position = 0;
		}
	}
	
	update() {
	}
	
	drawBg() {
		g.addTextureVertexBackground(0,[-1,-1],[511/tex_s,512/tex_s]);
		g.addTextureVertexBackground(0,[-1,1],[511/tex_s,1023/tex_s]);
		g.addTextureVertexBackground(0,[1,-1],[0/tex_s,512/tex_s]);

		g.addTextureVertexBackground(0,[-1,1],[511/tex_s,1023/tex_s]);
		g.addTextureVertexBackground(0,[1,-1],[0,512/tex_s]);
		g.addTextureVertexBackground(0,[1,1],[0,1023/tex_s]);
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
		for (var i=0;i<3;i++) g.addTextureVertexGUI(0,this.lifeBgV[i],this.bgTex[i]);
		for (var i=1;i<4;i++) g.addTextureVertexGUI(0,this.lifeBgV[i],this.bgTex[i]);
		for (var i=0;i<3;i++) g.addTextureVertexGUI(0,lifeV[i],this.lifeTex[i]);
		for (var i=1;i<4;i++) g.addTextureVertexGUI(0,lifeV[i],this.lifeTex[i]);
	}
	
	drawHeat() {
		var heatV = makeCoords4(0.1,0.5-((100.0-p.ship.heat)/250.0),-0.95,-0.85);
		g.addGUITexture('');
		for (var i=0;i<3;i++) g.addTextureVertexGUI(0,this.heatBgV[i],this.bgTex[i]);
		for (var i=1;i<4;i++) g.addTextureVertexGUI(0,this.heatBgV[i],this.bgTex[i]);
		for (var i=0;i<3;i++) g.addTextureVertexGUI(0,this.heatCriticalV[i],this.lifeTex[i]);
		for (var i=1;i<4;i++) g.addTextureVertexGUI(0,this.heatCriticalV[i],this.lifeTex[i]);
		for (var i=0;i<3;i++) g.addTextureVertexGUI(0,heatV[i],this.heatTex[i]);
		for (var i=1;i<4;i++) g.addTextureVertexGUI(0,heatV[i],this.heatTex[i]);
	}
	
	drawOptions() {
		for (var i in this.optionsV) {
			g.addGUITexture(this.options[i], this.optionsV[i]);
		}
		g.addGUITexture('Select', this.optionsV[this.position]);
	}
	
	draw() {
		this.drawLife();
		this.drawHeat();
		this.drawBg();
		p.draw();
		for (var i in enemies) enemies[i].draw();
		for (var i in playerMissiles) playerMissiles[i].draw();
		for (var i in enemyMissiles) enemyMissiles[i].draw();
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