class XantarianEscape {
	update() {
		standardLevelUpdate(this);
	}
	
	onFinish() {
		p.finished = true;
		p.finish_timer = time;
	}
	
	onEnd() {
		stats.level = 'XantarianEscape';
		stats.finishedLevels.push('XantarianEscape');
		p.ship = new TrainingShip();
		p.addWeapon(PlayerWVulcan, 0);
	}
	
	draw() {
	}
	
	constructor() {
		p.x = 0;
		p.y = -0.85;
		p.ship.x = p.x;
		p.ship.y = p.y;
		this.time = 0;
		this.nextEnemy = 0;
		this.levelLength = 800;
		this.levelSpeed = 0.03;
		this.texture = 'winter';
		this.music = 'level1';
		this.enemies = [
		[100, Chaser, [0.6, -1.2], [0.025, Math.PI*0.5], [0.5, -0.3]],
		[100, Suicider, [0.6, -1.2], [0.025, Math.PI*0.5], []],
		[130, Suicider, [-0.8, -1.2], [0.025, Math.PI*0.5], []],
		[160, Enemy1, [0.7, -1.2], [0.03, Math.PI*0.51], []],
		[180, Enemy1, [-0.7, -1.2], [0.03, Math.PI*0.5], []],
		[220, Suicider, [-0.3, -1.2], [0.03, Math.PI*0.5], []],
		[230, Suicider, [-0.5, -1.2], [0.03, Math.PI*0.5], []],
		[230, Suicider, [-0.1, -1.2], [0.03, Math.PI*0.5], []],
		[240, Suicider, [-0.3, -1.2], [0.03, Math.PI*0.5], []]
		];
	}
}

classesList['XantarianEscape'] = XantarianEscape;
names['XantarianEscape'] = 'Escape from Xantarian';
levelUnlocks.ships['XantarianEscape'] = [];
levelUnlocks.items['XantarianEscape'] = [
	PlayerWVulcan
];
levelTree['XantarianEscape'] = ['BokTraining'];
testFlightDummies['XantarianEscape'] = [
	{name :'DummyEnemy', chance: 0.5, data: [2, 0.5]},
	{name :'DummyEnemy', chance: 0.75, data: [5, 0.5]},
	{name :'DummyEnemy', chance: 0.95, data: [10, 0.5]},
];
