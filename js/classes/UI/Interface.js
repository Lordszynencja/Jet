class Interface {
	onPress(name) {
		if (name=='esc') {
			ui.newMenu(new PauseMenu(this.level));
			s.setMusicVolume(0.5);
		}
	}
	
	anyKey() {
	}
	
	update() {
		this.level.update();
		g.moveBackground(-0.001);
		for (var i in effects) effects[i].update();
		for (var i in enemies) enemies[i].update();
		for (var i in playerMissiles) playerMissiles[i].update();
		for (var i in enemyMissiles) enemyMissiles[i].update();
		p.update();
		
		if (effects.length>1000) effects = cleanArray(effects);
		if (playerMissiles.length>maxMissiles) playerMissiles = cleanArray(playerMissiles);
		if (enemyMissiles.length>maxMissiles) playerMissiles = cleanArray(playerMissiles);
		if (enemies.length>maxEnemies) enemies = cleanArray(enemies);
	}
	
	draw() {
		g.addBackgroundTexture(this.level.texture, makeCoords2(1,1));
		for (var i in effects) effects[i].draw();
		for (var i in enemyMissiles) enemyMissiles[i].draw();
		for (var i in enemies) enemies[i].draw();
		for (var i in playerMissiles) playerMissiles[i].draw();
		p.draw();
		g.drawText(-0.96, -0.8, stats.score.toString(), 0.1, [0.1, 0.1, 0.1, 1]);
		this.level.draw();
	}
	
	constructor(level) {
		this.level = level;
	}
}