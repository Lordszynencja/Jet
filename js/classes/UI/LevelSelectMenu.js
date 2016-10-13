class LevelSelectMenu {
	onPress(name) {
		if (name=='enter') {
			if (this.position == 0) {
				delete ui.menu;
				ui.newMenu(new Interface(new Level0()));
				ui.prepareGame();
			} else if (this.position == 1) {
				delete ui.menu;
				ui.newMenu(new Interface(new Level1()));
				ui.prepareGame();
			} else if (this.position == 2) {
				delete ui.menu;
				ui.newMenu(new MainMenu());
			}
		} else if (this.position<2 && name=='down') {
			this.position++;
		} else if (this.position>0 && name=='up') {
			this.position--;
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
		console.log("test");
		this.position = 0;
		this.bgTex = makeCoords4(288/tex_s,319/tex_s,287/tex_s,256/tex_s);
		this.optionsV = [];
		for (var i=0;i<3;i++) this.optionsV[i] = makeCoords4(-0.2,0.2,0.4-i*0.3,0.2-i*0.3);
		this.optionsTex = [textureC['Start'],textureC['Options'],textureC['Exit']];
		this.selectTex = textureC['Select'];
	}
}