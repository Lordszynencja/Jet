class Options {
	onPress(name) {
		if (name=='enter') {
			this.handleEvent(this.events[this.position]);
		} else if (this.position<this.options.length-1 && name=='down') {
			this.position++;
		} else if (this.position>0 && name=='up') {
			this.position--;
		} else if (name=='esc') {
			delete ui.menu;
			ui.newMenu(new MainMenu());
		}
	}
	
	handleEvent(e) {
		if (e == '8bit') conf.eightBitMode = !conf.eightBitMode;
		else if (e == 'light') conf.useLightning = !conf.useLightning;
		else if (e == 'sound') {
			conf.sound = !conf.sound;
			if (!conf.sound) s.stopAll();
			s.changeMusic('menu', 0);
		} else if (e == 'reset') versionHandler.resetProgress();
		else if (e == 'exit') {
			delete ui.menu;
			ui.newMenu(new MainMenu());
		}
		this.prepareOptions();
	}
	
	anyKey() {
	}
	
	update() {
	}
	
	prepareOptions() {
		this.events = ['8bit', 'light', 'sound', 'reset', 'exit'];
		this.options = [];
		for (var i in this.events) this.options[i] = 'options.'+this.events[i];
		this.options[0] += '.'+conf.eightBitMode;
		this.options[1] += '.'+conf.useLightning;
		this.options[2] += '.'+conf.sound;
		for (var i in this.options) this.options[i] = names[this.options[i]];
		this.optionsV = prepareOptionsPositions(this.options, this.fontSize);
	}
	
	draw() {
		g.addBackgroundTexture('ground', makeCoords2(1,1));
		for (var i=0;i<this.options.length;i++) {
			var xy = this.optionsV[i];
			g.drawText(xy[0], xy[1], this.options[i], this.fontSize, [1, 1, 1, 1]);
		}
		g.addGUITexture('Select', findSelectSize(this.options[this.position], this.fontSize, this.optionsV[this.position]));
		g.addLight([0, 0.9], [8, 8, 8], 1, [0, Math.PI]);
		g.addLight([0.9, 0], [8, 8, 8], 1, [0, Math.PI]);
		g.addLight([0, -0.9], [8, 8, 8], 1, [0, Math.PI]);
		g.addLight([-0.9, 0], [8, 8, 8], 1, [0, Math.PI]);
	}
	
	constructor() {
		this.position = 0;
		this.fontSize = 0.1;
		this.prepareOptions();
	}
}