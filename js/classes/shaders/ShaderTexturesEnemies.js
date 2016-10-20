class ShaderTexturesEnemies {
	prepareShaderCode() {
		this.vertCode = `
attribute vec2 position;
attribute vec2 texture_position;

varying vec2 p;
varying vec2 tp;

void main(void) {
	p = position;
	tp = texture_position;
	gl_Position = vec4(position, 0.0, 1.0);
}
`;
		this.fragCode = shDefines + `
#define h 0.0

uniform float time;
uniform bool eight_bit_mode;
uniform sampler2D texture;

varying vec2 p;
varying vec2 tp;
` +
shFunctions +
shEffects +
shLightFunctions +
`
///////////////////////
//  MAIN             //
///////////////////////

void main(void) {
	vec4 texture_color = texture2D(texture, tp);
	if (texture_color.a<0.01) discard;
	gl_FragColor = texture_color*vec4((use_lightning ? compute_lights() : vec111*basic_light), 1.0);
	if (eight_bit_mode) gl_FragColor = vec4(toEightBit(gl_FragColor.rgb), gl_FragColor.a);
}
`;
	}
	
	prepareBuffers() {
		gl.useProgram(this.shader);
		prepareBuffer(this.bPosition, "position", this.shader, 2);
		prepareBuffer(this.bTexturePosition, "texture_position", this.shader, 2);
	}
	
	prepareUniforms() {
		this.uLp = gl.getUniformLocation(this.shader, "lp");
		this.uLc = gl.getUniformLocation(this.shader, "lc");
		this.uLt = gl.getUniformLocation(this.shader, "lt");
		this.uLd = gl.getUniformLocation(this.shader, "ld");
		this.uTime = gl.getUniformLocation(this.shader, "time");
		this.uEightBitMode = gl.getUniformLocation(this.shader, "eight_bit_mode");
		this.uUseLightning = gl.getUniformLocation(this.shader, "use_lightning");
		this.uTexture = gl.getUniformLocation(this.shader, "texture");
	}

	createShader() {
		loadTextures(this.texture, 'enemy', this.texturesNo);
		this.prepareShaderCode();
		this.shader = compileShaders(this.vertCode, this.fragCode);
		this.prepareBuffers();
		this.prepareUniforms();
	}

	setUniformData() {
		gl.uniform2fv(this.uLp, this.lp);
		gl.uniform3fv(this.uLc, this.lc);
		gl.uniform1iv(this.uLt, this.lt);
		gl.uniform2fv(this.uLd, this.ld);
		gl.uniform1f(this.uTime, time);
		gl.uniform1f(this.uEightBitMode, conf.eightBitMode);
		gl.uniform1f(this.uUseLightning, conf.useLightning);
	}
	
	setBufferData(i) {
		fillBuffer(this.bPosition, "position", this.shader, 2, this.position[i]);
		fillBuffer(this.bTexturePosition, "texture_position", this.shader, 2, this.texturePosition[i]);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this.texture[i]);
		gl.uniform1i(gl.getUniformLocation(this.shader, "texture"), 0);
	}

	draw() {
		gl.useProgram(this.shader);
		this.setUniformData();
		var i;
		for (i=0;i<this.texturesNo;i++) {
			if (this.positionCount[i]>0) {
				this.setBufferData(i);
				gl.drawArrays(gl.TRIANGLES, 0, this.positionCount[i]);
			}
		}
	}

	findFreeLight() {
		var i = (this.lastLight+1)%maxLights;
		while (this.lt[i]!=0 && i!=this.lastLight) i = (i+1)%maxLights;
		if (i==this.lastLight) i = (i+1)%maxLights;
		return i;
	}

	addLight(xy, rgb, type, data) {
		var l = this.findFreeLight();
		for (var i=0;i<3;i++) {
			this.lc[3*l+i] = rgb[i];
		}
		for (var i=0;i<2;i++) {
			this.lp[2*l+i] = xy[i];
			this.ld[2*l+i] = data[i];
		}
		this.lt[l] = type;
		this.lightTime[l] = 0;
	}

	addVertex(t, xy, txy) {
		var v2 = this.positionCount[t]*2;
		for (var i=0;i<2;i++) {
			this.position[t][v2+i] = xy[i];
			this.texturePosition[t][v2+i] = txy[i];
		}
		this.positionCount[t]++;
	}
	
	resetDrawing() {
		for (var i=0;i<this.texturesNo;i++) {
			this.positionCount[i] = 0;
			this.position[i] = [];
		}
	}

	updateLight() {
		for (var i=0;i<maxLights;i++) {
			if (this.lt[i]>0) {
				this.lightTime[i]++;
				if (this.lt[i]==1) {
					if (this.lightTime[i]>1) this.lt[i] = 0;
				} else if (this.lt[i]==2) {
					if (this.lightTime[i]>1) this.lt[i] = 0;
				} else if (this.lt[i]==3) {
					if (this.lightTime[i]>1) this.lt[i] = 0;
				} else if (this.lt[i]==4) {
					if (this.lightTime[i]>1) this.lt[i] = 0;
				}
			}
		}
	}
	
	update() {
		this.resetDrawing();
		this.updateLight();
	}

	prepare() {
		for (var i=0;i<maxLights;i++) {
			for (var j=0;j<3;j++) {
				this.lc[3*i+j] = 0;
			}
			for (var j=0;j<2;j++) {
				this.lp[2*i+j] = 0;
				this.ld[2*i+j] = 0;
			}
			this.lt[i] = 0;
			this.lightTime[i] = 0;
		}
		this.lastLight = maxLights-1;
		this.resetDrawing();
	}
	
	constructor() {
		this.texturesNo = texNo(EnemyTextures);
		this.position = [];
		this.texturePosition = [];
		this.positionCount = [];
		this.lp = [];
		this.lc = [];
		this.lt = [];
		this.ld = [];
		this.lightTime = [];

		this.bPosition = gl.createBuffer();
		this.bTexturePosition = gl.createBuffer();
		this.texture = [];
		
		for (var i=0;i<this.texturesNo;i++) {
			this.position[i] = [];
			this.texturePosition[i] = [];
			this.texture[i] = gl.createTexture();
		}
		
		this.createShader();
		this.prepare();
	}
}
