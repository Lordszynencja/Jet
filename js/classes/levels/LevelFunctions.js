function standardLevelUpdate(level) {
	while (level.nextEnemy<level.enemies.length && level.time>=level.enemies[level.nextEnemy][0]) {
		var enemyData = level.enemies[level.nextEnemy];
		enemies.push(new enemyData[1](enemyData[2], enemyData[3], enemies.length, enemyData[4]));
		level.nextEnemy++;
	}
	
	if (level.time==level.levelLength && !p.dead) {
		if (level.boss == null) {
			if (stats.level<level.number+1) stats.level = level.number+1;
			p.finished = true;
			p.finish_timer = time;
		} else if (!level.bossPresent) {
			enemies.push(new level.boss(enemies.length));
			level.bossPresent = true;
		}
	}
	level.time++;
}