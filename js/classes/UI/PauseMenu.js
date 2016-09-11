class PauseMenu {
	onPress(name) {
		if (name=='esc') {
			delete ui.menu;
			ui.newMenu(new Interface());
		} else if (name=='enter') {
			if (this.position == 0) {
				delete ui.menu;
				ui.newMenu(new Interface());
			} else {
				delete ui.menu;
				ui.newMenu(new MainMenu());
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
		g.add_v(0,[-1,-1,0.999],[0.064,0.196]);
		g.add_v(0,[-1,1,0.999],[0.064,0.197]);
		g.add_v(0,[1,-1,0.999],[0.065,0.196]);

		g.add_v(0,[-1,1,0.999],[0.064,0.197]);
		g.add_v(0,[1,-1,0.999],[0.065,0.196]);
		g.add_v(0,[1,1,0.999],[0.065,0.197]);
	}
	
	drawScore() {
		var i;
		for (i=0;i<12;i++) {//score
			var iscore=[0,0,0,0,0,0];
			var s=this.score;
			var j;
			for (j=0;j<6;j++) {
				iscore[5-j]=s%10;
				s=Math.floor(s/10);
			}
			g.draw_text(-0.9,-0.9,iscore,0.1);
		}
	}
	
	drawLife() {
		var lifeV = makeCoords4Z(0.55,0.95-((100.0-p.hp)/250.0),-0.95,-0.85,-0.999);
		var i;
		for (i=0;i<3;i++) {
			g.add_v(0,this.lifeBgV[i],this.bgTex[i]);
		}
		for (i=1;i<4;i++) {
			g.add_v(0,this.lifeBgV[i],this.bgTex[i]);
		}
		for (i=0;i<3;i++) {
			g.add_v(0,lifeV[i],this.lifeTex[i]);
		}
		for (i=1;i<4;i++) {
			g.add_v(0,lifeV[i],this.lifeTex[i]);
		}
	}
	
	drawHeat() {
		var heatV = makeCoords4Z(0.1,0.5-((100.0-p.ship.heat)/250.0),-0.95,-0.85,-0.999);
		var i;
		for (i=0;i<3;i++) {
			g.add_v(0,this.heatBgV[i],this.bgTex[i]);
		}
		for (i=1;i<4;i++) {
			g.add_v(0,this.heatBgV[i],this.bgTex[i]);
		}
		for (i=0;i<3;i++) {
			g.add_v(0,this.heatCriticalV[i],this.lifeTex[i]);
		}
		for (i=1;i<4;i++) {
			g.add_v(0,this.heatCriticalV[i],this.lifeTex[i]);
		}
		for (i=0;i<3;i++) {
			g.add_v(0,heatV[i],this.heatTex[i]);
		}
		for (i=1;i<4;i++) {
			g.add_v(0,heatV[i],this.heatTex[i]);
		}
	}
	
	drawOptions() {
		for (var i in this.optionsV) {
			var j;
			for (j=0;j<3;j++) {
				g.add_v(1,this.optionsV[i][j],this.optionsTex[i][j]);
			}
			for (j=1;j<4;j++) {
				g.add_v(1,this.optionsV[i][j],this.optionsTex[i][j]);
			}
		}
		var j;
		for (j=0;j<3;j++) {
			for (j=0;j<3;j++) {
				g.add_v(1,this.optionsV[this.position][j],this.selectTex[j]);
			}
			for (j=1;j<4;j++) {
				g.add_v(1,this.optionsV[this.position][j],this.selectTex[j]);
			}
		}
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
	
	constructor() {
		this.position = 0;
		this.bgTex = makeCoords4(288/tex_s,319/tex_s,287/tex_s,256/tex_s);
		this.heatTex = makeCoords4(256/tex_s,287/tex_s,287/tex_s,256/tex_s);
		this.lifeTex = makeCoords4(320/tex_s,351/tex_s,287/tex_s,256/tex_s);
		this.heatBgV = makeCoords4Z(0.1,0.5,-0.95,-0.85,-0.997);
		this.heatCriticalV = makeCoords4Z(0.4,0.5,-0.95,-0.85,-0.998);
		this.lifeBgV = makeCoords4Z(0.55,0.95,-0.95,-0.85,-0.998);
		this.optionsV = [];
		for (var i=0;i<2;i++) this.optionsV[i] = makeCoords4Z(-0.2,0.2,0.25-i*0.3,0.05-i*0.3,-0.999);
		this.optionsTex = [makeCoords4(0,127/tex_s,64/tex_s,95/tex_s),makeCoords4(0,127/tex_s,96/tex_s,127/tex_s)];
		this.selectTex = makeCoords4(128/tex_s,255/tex_s,0/tex_s,32/tex_s);
	}
}