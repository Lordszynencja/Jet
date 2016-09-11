class Interface {
	onPress(name) {
		if (name=='esc') {
			ui.newMenu(new PauseMenu());
		}
	}
	
	update() {
		p.update();
		for (var i in enemies) enemies[i].update();
		for (var i in playerMissiles) playerMissiles[i].update();
		for (var i in enemyMissiles) enemyMissiles[i].update();
		if (playerMissiles.length>256) playerMissiles = cleanArray(playerMissiles);
		if (enemyMissiles.length>256) playerMissiles = cleanArray(playerMissiles);
		if (enemies.length>32) enemies = cleanArray(enemies);
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
	}
	
	constructor() {
		this.bgTex = makeCoords4(288/tex_s,319/tex_s,287/tex_s,256/tex_s);
		this.heatTex = makeCoords4(256/tex_s,287/tex_s,287/tex_s,256/tex_s);
		this.lifeTex = makeCoords4(320/tex_s,351/tex_s,287/tex_s,256/tex_s);
		this.heatBgV = makeCoords4Z(0.1,0.5,-0.95,-0.85,-0.997);
		this.heatCriticalV = makeCoords4Z(0.4,0.5,-0.95,-0.85,-0.998);
		this.lifeBgV = makeCoords4Z(0.55,0.95,-0.95,-0.85,-0.998);
	}
}