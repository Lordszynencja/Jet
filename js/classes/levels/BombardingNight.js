class BombardingNight {
	update() {
		standardLevelUpdate(this);
	}
	
	onFinish() {
		p.finished = true;
		p.finish_timer = time;
	}
	
	onEnd() {
		stats.level = 'BombardingNight';
		stats.finishedLevels.push('BombardingNight');
	}
	
	draw() {}
	
	constructor() {
		p.x = 0;
		p.y = -0.85;
		p.ship.x = p.x;
		p.ship.y = p.y;
		this.time = 0;
		this.nextEnemy = 0;
		this.levelLength = 800;
		this.levelSpeed = 0.004;
		this.texture = 'winter';
		this.music = 'level1';
		this.enemies = [
			[100, Suicider, [0.2, -1.2], [0.04, Math.PI*0.5], []]
		];
	}
}

classesList['BombardingNight'] = BombardingNight;
names['BombardingNight'] = 'Night bombarding';
levelUnlocks.ships['BombardingNight'] = [];
levelUnlocks.items['BombardingNight'] = [];
levelTree['BombardingNight'] = ['BombardingDay', 'BombardingNight'];
testFlightDummies['BombardingNight'] = [
	{name :'DummyEnemy', chance: 0.5, data: [2, 0.5]},
	{name :'DummyEnemy', chance: 0.75, data: [5, 0.5]},
	{name :'DummyEnemy', chance: 0.95, data: [10, 0.5]},
];
