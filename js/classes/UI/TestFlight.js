class TestFlight {
	onPress(name) {
		if (name=='esc') {
			effects = [];
			enemies = [];
			playerMissiles = [];
			enemyMissiles = [];
			ui.newMenu(new Shop());
		}
	}
	
	anyKey() {
	}
	
	update() {
		g.moveBackground(-0.005);
		for (var i in effects) effects[i].update();
		for (var i in enemies) enemies[i].update();
		for (var i in playerMissiles) playerMissiles[i].update();
		for (var i in enemyMissiles) enemyMissiles[i].update();
		p.update();
		if (Math.random()<0.05) {
			enemies.push(getDummyForLevel(stats.level));
		}
		
		if (effects.length>1000) effects = cleanArray(effects);
		if (playerMissiles.length>maxMissiles) playerMissiles = cleanArray(playerMissiles);
		if (enemyMissiles.length>maxMissiles) playerMissiles = cleanArray(playerMissiles);
		if (enemies.length>maxEnemies) enemies = cleanArray(enemies);
	}
	
	draw() {
		g.addBackgroundTexture('ground', makeCoords2(1,1));
		for (var i in effects) effects[i].draw();
		for (var i in enemyMissiles) enemyMissiles[i].draw();
		for (var i in enemies) enemies[i].draw();
		for (var i in playerMissiles) playerMissiles[i].draw();
		p.draw();
		p.ship.drawIndicators();
	}
	
	constructor() {
		effects = [];
		enemies = [];
		playerMissiles = [];
		enemyMissiles = [];
	}
}