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

function distanceToStop(v, a) {
	var t = v/a;
	if (t>0) {
		return t*v-(t*t-t)*a/2;
	} else {
		return -(t*v-(t*t+t)*a/2);
	}
}

function speedToDestination(x, x0, v, a) {
	var dist = x0-x;
	if (dist>=-a && dist<=a)  {
		if (v<-a) return v+a;
		if (v>a) return v-a;
		return dist;
	}
	if (v>0) {
		if (dist>=distanceToStop(v+a, a)) {
			return v+a;
		} else if (dist>=distanceToStop(v, a)) {
			return v;
		}
		return v-a;
	} else {
		if (dist<=distanceToStop(v-a, a)) {
			return v-a;
		} else if (dist<=distanceToStop(v, a)) {
			return v;
		}
		return v+a;
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