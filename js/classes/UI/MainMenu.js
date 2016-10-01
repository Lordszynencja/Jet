class MainMenu {
	onPress(name) {
		if (name=='enter') {
			if (this.position == 0) {
				delete ui.menu;
				ui.newMenu(new Interface(new Level1()));
				ui.prepareGame();
			} else {
				delete ui.menu;
				ui.newMenu(new Options());
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
		g.addTextureVertexBackground(0,[-1,-1],[511/tex_s,512/tex_s]);
		g.addTextureVertexBackground(0,[-1,1],[511/tex_s,1023/tex_s]);
		g.addTextureVertexBackground(0,[1,-1],[0/tex_s,512/tex_s]);

		g.addTextureVertexBackground(0,[-1,1],[511/tex_s,1023/tex_s]);
		g.addTextureVertexBackground(0,[1,-1],[0,512/tex_s]);
		g.addTextureVertexBackground(0,[1,1],[0,1023/tex_s]);
	}
	
	drawOptions() {
		for (var i in this.optionsV) {
			for (var j=0;j<3;j++) g.addTextureVertexGUI(this.optionsTex[i][0],this.optionsV[i][j],this.optionsTex[i][1][j]);
			for (var j=1;j<4;j++) g.addTextureVertexGUI(this.optionsTex[i][0],this.optionsV[i][j],this.optionsTex[i][1][j]);
		}
		for (var j=0;j<3;j++) g.addTextureVertexGUI(this.selectTex[0],this.optionsV[this.position][j],this.selectTex[1][j]);
		for (var j=1;j<4;j++) g.addTextureVertexGUI(this.selectTex[0],this.optionsV[this.position][j],this.selectTex[1][j]);
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
		for (var i=0;i<2;i++) this.optionsV[i] = makeCoords4(-0.2,0.2,0.25-i*0.3,0.05-i*0.3);
		this.optionsTex = [textureC['Start'],textureC['Options']];
		this.selectTex = textureC['Select'];
	}
}