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
		for (var i=0;i<3;i++) g.addTextureVertexGUI(0,this.heatBgV[i],this.bgTex[i]);
		for (var i=1;i<4;i++) g.addTextureVertexGUI(0,this.heatBgV[i],this.bgTex[i]);
		for (var i=0;i<3;i++) g.addTextureVertexGUI(0,this.heatCriticalV[i],this.lifeTex[i]);
		for (var i=1;i<4;i++) g.addTextureVertexGUI(0,this.heatCriticalV[i],this.lifeTex[i]);
		for (var i=0;i<3;i++) g.addTextureVertexGUI(0,heatV[i],this.heatTex[i]);
		for (var i=1;i<4;i++) g.addTextureVertexGUI(0,heatV[i],this.heatTex[i]);
	}
	
	drawOptions() {
		for (var i in this.optionsV) {
			for (var j=0;j<3;j++) g.addTextureVertexGUI(1,this.optionsV[i][j],this.optionsTex[i][j]);
			for (var j=1;j<4;j++) g.addTextureVertexGUI(1,this.optionsV[i][j],this.optionsTex[i][j]);
		}
		for (var j=0;j<3;j++) g.addTextureVertexGUI(1,this.optionsV[this.position][j],this.selectTex[j]);
		for (var j=1;j<4;j++) g.addTextureVertexGUI(1,this.optionsV[this.position][j],this.selectTex[j]);
	}
	
	draw() {
		g.update();
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
		this.bgTex = makeCoords4(288/tex_s,319/tex_s,287/tex_s,256/tex_s);
		this.heatTex = makeCoords4(256/tex_s,287/tex_s,287/tex_s,256/tex_s);
		this.lifeTex = makeCoords4(320/tex_s,351/tex_s,287/tex_s,256/tex_s);
		this.heatBgV = makeCoords4(0.1,0.5,-0.95,-0.85,-0.997);
		this.heatCriticalV = makeCoords4(0.4,0.5,-0.95,-0.85,-0.998);
		this.lifeBgV = makeCoords4(0.55,0.95,-0.95,-0.85,-0.998);
		this.optionsV = [];
		for (var i=0;i<2;i++) this.optionsV[i] = makeCoords4(-0.2,0.2,0.25-i*0.3,0.05-i*0.3,-0.999);
		this.optionsTex = [makeCoords4(0,127/tex_s,64/tex_s,95/tex_s),makeCoords4(0,127/tex_s,96/tex_s,127/tex_s)];
		this.selectTex = makeCoords4(128/tex_s,255/tex_s,0/tex_s,32/tex_s);
		
		this.level = level;
	}
}