class ShaderJetEngineEffect {//jet engine
	prepareShaderCode() {
		this.vertCode = `
attribute vec2 position;
attribute vec3 color;

varying vec3 c;

void main(void) {
	c = color;
	gl_Position = vec4(position, 0.0, 1.0);
}`
		this.fragCode = `
precision mediump float;
uniform bool eight_bit_mode;
` +
shEffects +
shInvertion +
`
varying vec3 c;

void main(void) {
	vec3 color = (eight_bit_mode ? toEightBit(c) : c);
	gl_FragColor = vec4(color, pow(max(max(color.r, color.g), color.b), 2.0));
	gl_FragColor = computeInvertion(gl_FragColor);
}`
	}
	
	prepareBuffers() {
		gl.useProgram(this.shader);
		this.bPosition = prepareBuffer(this.bPosition, "position", this.shader, 2);
		this.bColor = prepareBuffer(this.bColor, "color", this.shader, 3);
	}
	
	prepareUniforms() {
		this.uEightBitMode = gl.getUniformLocation(this.shader, "eight_bit_mode");
		this.uInvertionPoint = gl.getUniformLocation(this.shader, "invertion_point");
		this.uInvertionRange = gl.getUniformLocation(this.shader, "invertion_range");
	}

	createShader() {
		this.prepareShaderCode();
		this.shader = compileShaders(this.vertCode, this.fragCode);
		this.prepareBuffers();
		this.prepareUniforms();
	}

	setBufferData() {
		gl.uniform1f(this.uTime, time);
		gl.uniform1f(this.uEightBitMode, conf.eightBitMode);
		gl.uniform2fv(this.uInvertionPoint, this.invertionPoint);
		gl.uniform1f(this.uInvertionRange, this.invertionRange);
		fillBuffer(this.bPosition, "position", this.shader, 2, this.position);
		fillBuffer(this.bColor, "color", this.shader, 3,  this.color);
	}

	draw() {
		gl.useProgram(this.shader);
		if (this.n>0) {
			this.setBufferData();
			gl.drawArrays(gl.TRIANGLES, 0, this.n);
		}
	}
	
	addEffect(pos, color) {
		var n2 = 2*this.n;
		var n3 = 3*this.n;
		for (var i=0;i<2;i++) this.position[n2+i] = pos[i];
		for (var i=0;i<3;i++) this.color[n3+i] = color[i];
		this.n++;
	}

	update() {
		this.n = 0;
		this.position = [];
		this.color = [];
	}
	
	setInvertion(xy, range) {
		this.invertionPoint = xy;
		this.invertionRange = range;
	}
	
	constructor() {
		this.invertionPoint = [0, 0];
		this.invertionRange = 0;
		this.update();

		this.bPosition = gl.createBuffer();
		this.bColor = gl.createBuffer();
		
		this.createShader();
		this.update();
	}
}