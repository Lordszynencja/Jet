function standardEnemyUpdate(enemy) {
	for (var i in enemy.rotatedHitbox) enemy.hitbox[i] = moveModel(enemy.rotatedHitbox[i], enemy.x, enemy.y);
	for (var i in enemy.weapons) enemy.weapons[i].update(true);
}

function standardEnemyDestroy(enemy) {
	delete enemies[enemy.num];
	stats.money += enemy.money;
	stats.score += enemy.points;
	stats.enemiesDefeated++;
}

function standardDealDamage(enemy, damage) {
	enemy.hp -= damage;
	if (enemy.hp<=0) {
		return true;
	}
}

function drawHitbox(enemy) {
	for (var i in enemy.rotatedHitbox) {
		var hitbox = moveModel(enemy.rotatedHitbox[i], enemy.x, enemy.y);
		for (var j in hitbox) {
			g.addParticle(hitbox[j], [1,1,1,1], 2);
		}
	}
}

function collideEnemyWithPlayer(enemy) {
	var x = enemy.x - p.x;
	var y = enemy.y - p.y;
	var maxDistance = enemy.size+p.ship.size;
	if (x*x+y*y<maxDistance*maxDistance && !p.dead) {
		for (var i in p.ship.hitbox) {
			for (var j in enemy.hitbox) {
				if (collide(enemy.hitbox[j], p.ship.hitbox[i])) {
					return true;
				}
			}
		}
	}
	return false;
}