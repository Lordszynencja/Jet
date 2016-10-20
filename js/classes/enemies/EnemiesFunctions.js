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

function standardEnemyDraw(enemy, damage) {
	enemy.hp -= damage;
	if (enemy.hp<=0) {
		delete enemies[enemy.num];
		stats.score += enemy.score;
		stats.money += enemy.money;
	}
}