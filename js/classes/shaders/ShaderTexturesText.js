class ShaderTexturesText {
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

uniform float time;
uniform bool eight_bit_mode;

uniform sampler2D texture;

varying vec2 p;
varying vec2 tp;
` +
shFunctions +
shEffects +
`
///////////////////////
//  MAIN             //
///////////////////////

void main(void) {
	vec4 texture_color = texture2D(texture, tp);
	if (texture_color.a<0.01) discard;
	gl_FragColor = texture_color;
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
		this.uTime = gl.getUniformLocation(this.shader, "time");
		this.uEightBitMode = gl.getUniformLocation(this.shader, "eight_bit_mode");
		this.uTexture = gl.getUniformLocation(this.shader, "texture");
	}

	createShader() {
		loadTextures(this.texture, 'text', this.texturesNo);
		this.prepareShaderCode();
		this.shader = compileShaders(this.vertCode, this.fragCode);
		this.prepareBuffers();
		this.prepareUniforms();
	}

	setUniformData() {
		gl.uniform1f(this.uTime, time);
		gl.uniform1f(this.uEightBitMode, conf.eightBitMode);
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
	
	update() {
		this.resetDrawing();
	}

	prepare() {
		this.resetDrawing();
	}
	
	constructor() {
		this.texturesNo = texNo(LettersNumbers);
		this.position = [];
		this.texturePosition = [];
		this.positionCount = [];

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
