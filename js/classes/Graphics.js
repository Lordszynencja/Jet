//======== GRAPHICS =========\\

class Graphics {
	draw() {
		gl.clearColor(0.1,0.1,0.1,1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT);
		gl.clear(gl.COLOR_BUFFER_BIT);
		sh[].draw();
		sh['textures'].draw();
		sh['effect0'].draw();
		sh['effect1'].draw();
	}

	addLight(xy, rgb, type, data) {
		if (option_lightning) sh['textures'].addLight(xy, rgb, type, data);
	}
	
	addEffect0(pos, size) {
		sh['effect0'].addEffect(pos, size);
	}
	
	addEffect1(start, length, angle, color) {
		sh['effect1'].addEffectFromStartAngleLength(start, angle, length, color);
	}

	drawText(x,y,s,scale) {
		var i,j,length=0;
		/*for (i=0;i<s.length;i++) {
			var textData = this.characters[s[i]];
			if (s[i] in this.characters) {
				for (j=0;j<6;j++) {
					//this.add_v(0,[x+(dig_v[2*j]+length)*scale,y+dig_v[2*j+1]*scale,-0.999],[dig_tex[s[i]][2*j],dig_tex[s[i]][2*j+1]]);
				}
				//length+=dig_len[s[i]]/16;
			}
		}*/
	}
	
	update() {
		for (var i in sh) sh[i].update();
	}

	prepare() {
		var i;
		for (i=0;i<light_max;i++) {
			this.light_pos[3*i] = 0;
			this.light_pos[3*i+1] = 0;
			this.light_pos[3*i+2] = 0;
			this.light_c[3*i] = 0;
			this.light_c[3*i+1] = 0;
			this.light_c[3*i+2] = 0;
			this.light_t[i] = 0;
			this.light_d[2*i] = 0;
			this.light_d[2*i+1] = 0;
			this.light_time[i] = 0;
		}
		this.lastLight = light_max-1;
		this.resetDrawing();
	}
	
	drawOn(shaderName, texData, xy) {
		for (var i=0;i<3;i++) sh[shaderName].addVertex(texData[0],xy[i],texData[1][i]);
		for (var i=1;i<4;i++) sh[shaderName].addVertex(texData[0],xy[i],texData[1][i]);
	}
	
	addBackgroundTexture(tex, xy) {
		var texData = BackgroundTextures[tex];
		this.drawOn('tex_background', texData, xy);
	}
	
	addEnemyTexture(tex, xy) {
		var texData = EnemyTextures[tex];
		this.drawOn('tex_enemy', texData, xy);
	}
	
	addBulletTexture(tex, xy) {
		var texData = BulletsTextures[tex];
		this.drawOn('tex_bullet', texData, xy);
	}
	
	addPlayerShipTexture(tex, xy) {
		var texData = PlayerShipTextures[tex];
		this.drawOn('tex_player', texData, xy);
	}
	
	addGUITexture(tex, xy) {
		var texData = GUITextures[tex];
		this.drawOn('tex_gui', texData, xy);
	}
	
	addText(tex, xy) {
		var texData = LettersNumbersText[tex];
		this.drawOn('tex_text', texData, xy);
	}
	
	constructor() {
		sh['tex_background'] = new ShaderTexturesBackground();
		sh['tex_enemy'] = new ShaderTexturesEnemies();
		sh['tex_bullet'] = new ShaderTexturesBullets();
		sh['tex_player'] = new ShaderTexturesPlayer();
		sh['tex_gui'] = new ShaderTexturesGUI();
		sh['tex_text'] = new ShaderTexturesText();
		
		sh['effect0'] = new ShaderEffect0();
		sh['effect1'] = new ShaderEffect1();
		var shaders
	}
}
