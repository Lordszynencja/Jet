class Graphics {
	draw() {
		gl.clearColor(0.1,0.1,0.1,1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT);
		gl.clear(gl.COLOR_BUFFER_BIT);
		for (var i=0;i<this.shadersEnum.length;i++) {
			sh[this.shadersEnum[i]].draw();
		}
	}

	addLight(xy, rgb, type, data) {
		if (true) {
			for (var s in this.lightningEnum) {
				if (this.lightningEnum[s]) sh[s].addLight(xy, rgb, type, data);
			}
		}
	}
	
	addJetEngineEffect(pos, color) {
		sh['effect_jet'].addEffect(pos, color);
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
		for (var s in sh) sh.prepare();
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
	
	moveBackground(y) {
		sh['tex_background'].bgPosition += y;
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
		console.log(tex);
		var texData = LettersNumbers[tex];
		this.drawOn('tex_text', texData, xy);
	}
	
	addParticle(xy, color, size) {
		sh['particles'].addEffect(xy, color, size);
	}
	
	constructor() {
		sh['tex_background'] = new ShaderTexturesBackground();
		sh['effect_jet'] = new ShaderJetEngineEffect();
		sh['tex_enemy'] = new ShaderTexturesEnemies();
		sh['tex_bullet'] = new ShaderTexturesBullets();
		sh['tex_player'] = new ShaderTexturesPlayer();
		sh['tex_gui'] = new ShaderTexturesGUI();
		sh['tex_text'] = new ShaderTexturesText();
		
		sh['effect0'] = new ShaderEffect0();
		sh['effect1'] = new ShaderEffect1();
		sh['particles'] = new ShaderParticles();
		
		this.shadersEnum = [
			'tex_background',
			'effect_jet',
			'tex_enemy',
			'tex_player',
			'tex_bullet',
			'tex_gui',
			'tex_text',
			'effect0',
			'effect1',
			'particles'];
			
		this.lightningEnum = {
			'tex_background' : true,
			'effect_jet' : false,
			'tex_enemy' : true,
			'tex_player' : true,
			'tex_bullet' : true,
			'tex_gui' : false,
			'tex_text' : false,
			'effect0' : false,
			'effect1' : false,
			'particles' : false
		};
	}
}

/*
LIGHTS:
	0 - no light
	1 - point light ([x, y], [r, g, b], 1, [facing angle, light cone angle/2])
	2 - | vertical line light ([start x, start y], [r, g, b], 2, [0, height])
	3 - - horizontal line light ([start x, start y], [r, g, b], 2, [width, 0])
	4 - / line light ([px, py], [r, g, b], 2, [x1, 0]) if possible, light on line px*x + py*y + x1 = 0
*/
	
	
	
