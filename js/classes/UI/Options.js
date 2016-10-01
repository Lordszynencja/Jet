class Options {
	onPress(name) {
		if (name=='enter') {
			if (this.position == 0) {
				eightBitMode = !eightBitMode;
			} else {
				delete ui.menu;
				ui.newMenu(new MainMenu());
			}
		} else if (this.position == 0 && name=='down') {
			this.position = 1;
		} else if (this.position == 1 && name=='up') {
			this.position = 0;
		}
	}
	
	update() {
	}
	
	drawBg() {
		g.add_v(0,[-1,-1,0.999],[511/tex_s,512/tex_s]);
		g.add_v(0,[-1,1,0.999],[511/tex_s,1023/tex_s]);
		g.add_v(0,[1,-1,0.999],[0/tex_s,512/tex_s]);

		g.add_v(0,[-1,1,0.999],[511/tex_s,1023/tex_s]);
		g.add_v(0,[1,-1,0.999],[0,512/tex_s]);
		g.add_v(0,[1,1,0.999],[0,1023/tex_s]);
	}
	
	drawOptions() {
		for (var i in this.optionsV) {
			var j;
			for (j=0;j<3;j++) {
				g.add_v(this.optionsTex[i][0],this.optionsV[i][j],this.optionsTex[i][1][j]);
			}
			for (j=1;j<4;j++) {
				g.add_v(this.optionsTex[i][0],this.optionsV[i][j],this.optionsTex[i][1][j]);
			}
		}
		var j;
		for (j=0;j<3;j++) {
			for (j=0;j<3;j++) {
				g.add_v(this.selectTex[0],this.optionsV[this.position][j],this.selectTex[1][j]);
			}
			for (j=1;j<4;j++) {
				g.add_v(this.selectTex[0],this.optionsV[this.position][j],this.selectTex[1][j]);
			}
		}
	}
	
	draw() {
		g.update();
		this.drawBg();
		this.drawOptions();
	}
	
	constructor() {
		this.position = 0;
		this.bgTex = makeCoords4(288/tex_s,319/tex_s,287/tex_s,256/tex_s);
		this.optionsV = [];
		for (var i=0;i<2;i++) this.optionsV[i] = makeCoords4Z(-0.2,0.2,0.25-i*0.3,0.05-i*0.3,-0.999);
		this.optionsTex = [textureC['8bitMode'],textureC['Exit']];
		this.selectTex = textureC['Select'];
	}
}