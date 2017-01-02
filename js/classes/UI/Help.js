class Help {
	toLevel() {
		delete ui.menu;
		ui.newMenu(new Interface(this.level));
		ui.prepareGame();
	}
	
	onPress(name) {
	}
	
	anyKey() {
		if (this.time>2*FPS) {
			this.toLevel();
		}
	}
	
	update() {
		this.time++;
	}
	
	draw() {
		g.addBackgroundTexture(this.level.texture, makeCoords2(1, 1));
		g.drawText(-0.8, 0.7, "Dodge enemy bullets", 0.05, [1, 1, 0, 1]);
		g.drawText(-0.8, 0.6, "Destroy enemy ships", 0.05, [1, 1, 0, 1]);
		g.drawText(-0.8, 0.5, "Get to the end to win", 0.05, [1, 1, 0, 1]);
		
		g.drawText(-0.8, 0.4, "Use space to shoot", 0.07, [1, 1, 1, 1]);
		
		g.drawText(-0.8, -0.6, "Move with", 0.07, [1, 1, 1, 1]);
		g.drawText(-0.8, -0.7, "arrow keys", 0.07, [1, 1, 1, 1]);
		
		g.drawText(0, -0.6, "If you overheat", 0.03, [0, 0, 1, 1]);
		g.drawText(0, -0.7, "your weapons", 0.03, [0, 0, 1, 1]);
		g.drawText(0, -0.8, "will stop", 0.03, [0, 0, 1, 1]);
		
		g.drawText(0.5, -0.5, "If your hull", 0.023, [1, 0, 0, 1]);
		g.drawText(0.5, -0.6, "integrity drops to 0", 0.023, [1, 0, 0, 1]);
		g.drawText(0.5, -0.7, "you will", 0.023, [1, 0, 0, 1]);
		g.drawText(0.5, -0.8, "blow up", 0.023, [1, 0, 0, 1]);
		
		if (this.time>2*FPS) {
			var alpha = (this.time<3*FPS ? (this.time-2*FPS)/FPS : 1)
			g.drawText(-0.6, 0.1, "Press any key", 0.1, [1, 0, 0, alpha]);
			g.drawText(-0.4, -0.1, "to start", 0.1, [1, 0, 0, alpha]);
		}
	}
	
	constructor(level) {
		this.time = 0;
		this.level = level;
	}
}