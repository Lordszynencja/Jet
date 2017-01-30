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
	
	getActualLevelPossibleHP() {
		if (stats.level == 0) {
			this.possibleHP = [5, 15, 50];
		} else if (stats.level == 1) {
			this.possibleHP = [10, 25, 70];
		} else if (stats.level == 2) {
			this.possibleHP = [10, 40, 100];
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
			var chance = Math.random();
			if (chance < 0.6) {
				enemies.push(new DummyEnemy([Math.random()*2-1, 1.2], [0.03, Math.PI*1.2+Math.random()*Math.PI*0.6], enemies.length, [this.possibleHP[0], 0.5]));
			} else if (chance<0.9) {
				enemies.push(new DummyEnemy([Math.random()*1.8-0.9, 1.2], [0.02, Math.PI*1.3+Math.random()*Math.PI*0.4], enemies.length, [this.possibleHP[1], 1]));
			} else {
				enemies.push(new DummyEnemy([Math.random()-0.5, 1.2], [0.01, Math.PI*1.4+Math.random()*Math.PI*0.2], enemies.length, [this.possibleHP[2], 2]));
			}
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
		this.getActualLevelPossibleHP();
	}
}