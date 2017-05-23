var levelTree = {};
var testFlightDummies = {};

function getDummyForLevel(level) {
	var dummies = testFlightDummies[level];
	if (dummies == null || dummies == undefined) return new DummyEnemy([0, 1.2], [0.01, Math.PI*1.5], enemies.length, [1, 0.5]);
	var val = Math.random();
	for (var i in dummies) {
		var d = dummies[i];
		if (val<d.chance) return new classesList[d.name]([Math.random()*2-1, 1.2], [0.03, Math.PI*1.2+Math.random()*Math.PI*0.6], enemies.length, d.data);
	}
	return new DummyEnemy([0, 1.2], [0.01, Math.PI*1.5], enemies.length, [1, 0.5]);
}

function standardLevelUpdate(level) {
	g.moveBackground(-level.levelSpeed*bg_tex_s/tex_s);
	while (level.nextEnemy<level.enemies.length && level.time>=level.enemies[level.nextEnemy][0]) {
		var enemyData = level.enemies[level.nextEnemy];
		enemies.push(new enemyData[1](enemyData[2], enemyData[3], enemies.length, enemyData[4]));
		level.nextEnemy++;
	}
	
	if (level.time==level.levelLength && !p.dead) {
		level.onEnd();
	}
	level.time++;
}