function standardLevelUpdate(level) {
	while (level.nextEnemy<level.enemies.length && level.time>=level.enemies[level.nextEnemy][0]) {
		var enemyData = level.enemies[level.nextEnemy];
		enemies.push(new enemyData[1](enemyData[2], enemyData[3], enemies.length, enemyData[4]));
		level.nextEnemy++;
	}
	if (level.time==level.levelLength && !p.dead) {
		if (conf.level<level.number+1) conf.level = level.number+1;
		p.finished = true;
		p.finish_timer = time;
	}
	level.time++;
}