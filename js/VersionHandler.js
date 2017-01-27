var versionHandler = {
	handleOldSave : function(v) {
		if (!v || v<2) game.resetProgress();
		else loadPlayer();
		stats.version = actualVersion;
	}
};
