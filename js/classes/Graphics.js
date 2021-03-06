class Graphics {
	draw() {
		gl.clearColor(0, 0, 0, 1);
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
	
	setInvertion(xy, range) {
		for (var i in this.invertionEnum) sh[this.invertionEnum[i]].setInvertion(xy, range);
	}
	
	addJetEngineEffect(pos, color) {
		sh['effect_jet'].addEffect(pos, color);
	}
	
	addEffect0(pos, scale, rotation, color, power) {
		sh['effect0'].addEffect(pos, scale, rotation, color, power);
	}
	
	addEffect1(start, length, angle, color) {
		sh['effect1'].addEffectFromStartAngleLength(start, angle, length, color);
	}

	drawText(x, y, s, scale, color) {
		var i, j, length = 0;
		for (i=0;i<s.length;i++) {
			if (s[i] in LettersNumbers) {
				this.addText(s[i], makeCoords4(x+length, x+length+scale, y, y-scale*2), color);
				length += scale;
			}
		}
	}
	
	update() {
		for (var i in sh) sh[i].update();
	}

	prepare() {
		for (var s in sh) sh.prepare();
		this.resetDrawing();
	}
	
	drawOn(shaderName, texData, xy) {
		for (var i=0;i<3;i++) sh[shaderName].addVertex(texData[0], xy[i], texData[1][i]);
		for (var i=1;i<4;i++) sh[shaderName].addVertex(texData[0], xy[i], texData[1][i]);
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
	
	addText(tex, xy, color) {
		var texData = LettersNumbers[tex];
		for (var i=0;i<3;i++) sh['tex_text'].addVertex(texData[0], xy[i], texData[1][i], color);
		for (var i=1;i<4;i++) sh['tex_text'].addVertex(texData[0], xy[i], texData[1][i], color);
	}
	
	addParticle(xy, color, size) {
		sh['particles'].addEffect(xy, color, size);
	}
	
	addLine(xy, color) {
		sh['lines'].addEffect(xy[0], color[0]);
		sh['lines'].addEffect(xy[1], color[1]);
	}
	
	addTriangle(xy, color) {
		sh['triangles'].addEffect(xy[0], color[0]);
		sh['triangles'].addEffect(xy[1], color[1]);
		sh['triangles'].addEffect(xy[2], color[2]);
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
		sh['lines'] = new ShaderLines();
		sh['triangles'] = new ShaderTriangles();
		
		this.shadersEnum = [
			'tex_background',
			'effect_jet',
			'tex_enemy',
			'tex_player',
			'tex_bullet',
			'tex_gui',
			'effect0',
			'effect1',
			'triangles',
			'lines',
			'particles',
			'tex_text'];
			
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
			'particles' : false,
			'lines' : false,
			'triangles' : false
		};
		
		this.invertionEnum = [
			'tex_background',
			'effect_jet',
			'tex_enemy',
			'tex_player',
			'tex_bullet',
			'effect0',
			'effect1',
			'particles',
			'lines',
			'triangles'
		];
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
	
	
	
