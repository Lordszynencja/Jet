var versionHandler = {
	resetProgress : function() {
		stats.score = 0;
		stats.money = 0;
		stats.level = null;
		stats.finishedLevels = [];
		stats.shotsFired = 0;
		stats.enemiesDefeated = 0;
		stats.bossesDefeated = 0;
		p.ship = new SmallShip();
		p.cargo = [];
	},
	
	handleOldSave : function(v) {
		if (!v || v<3) this.resetProgress();
		else loadPlayer();
		stats.version = actualVersion;
	}
};
