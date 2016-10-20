function standardLevelUpdate(level) {
	while (level.nextEnemy<level.enemies.length && level.time>=level.enemies[level.nextEnemy][0]) {
		var enemyData = level.enemies[level.nextEnemy];
		var enemy = new enemyData[1](enemyData[2], enemyData[3], enemies.length, enemyData[4]);
		enemies.push(enemy);
		level.nextEnemy++;
	}
	if (level.time==level.levelLength && !p.dead) {
		if (conf.level<level.number+1) conf.level = level.number+1;
		s.play("gameover", 1);
		p.dead = true;
		p.dead_timer = time;
	}
	level.time++;
}