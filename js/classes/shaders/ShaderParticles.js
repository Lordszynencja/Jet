class ShaderParticles {
	prepareShaderCode() {
		this.vertCode = `
attribute vec2 position;
attribute vec4 color;
attribute float size;

varying vec4 c;

void main(void) {
	c = color;
	gl_PointSize = size;
	gl_Position = vec4(position, 0.0, 1.0);
}`
		this.fragCode = `
precision mediump float;

vec4 multiply(vec4 color) {
	return color*1.1;
}

uniform bool eight_bit_mode;
` +
shEffects +
shInvertion +
`

varying vec4 c;

void main(void) {
	gl_FragColor = (eight_bit_mode ? vec4(toEightBit(c.rgb), c.a) : c);
	gl_FragColor = computeInvertion(gl_FragColor);
}`
	}
	
	prepareBuffers() {
		gl.useProgram(this.shader);
		this.bPosition = prepareBuffer(this.bPosition, "position", this.shader, 2);
		this.bColor = prepareBuffer(this.bColor, "color", this.shader, 4);
		this.bSize = prepareBuffer(this.bSize, "size", this.shader, 1);
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
		gl.uniform1f(this.uEightBitMode, conf.eightBitMode);
		gl.uniform2fv(this.uInvertionPoint, this.invertionPoint);
		gl.uniform1f(this.uInvertionRange, this.invertionRange);
		fillBuffer(this.bPosition, "position", this.shader, 2, this.position);
		fillBuffer(this.bColor, "color", this.shader, 4,  this.color);
		fillBuffer(this.bSize, "size", this.shader, 1,  this.size);
	}

	draw() {
		gl.useProgram(this.shader);
		if (this.n>0) {
			this.setBufferData();
			gl.drawArrays(gl.POINTS, 0, this.n);
		}
	}
	
	addEffect(pos, color, size) {
		var n2 = this.n*2;
		var n4 = this.n*4;
		this.position[n2] = pos[0];
		this.position[n2+1] = pos[1];
		this.color[n4] = color[0];
		this.color[n4+1] = color[1];
		this.color[n4+2] = color[2];
		this.color[n4+3] = color[3];
		this.size[this.n] = size;
		this.n++;
	}

	update() {
		this.n = 0;
		this.position = [];
		this.color = [];
		this.size = [];
	}
	
	setInvertion(xy, range) {
		this.invertionPoint = xy;
		this.invertionRange = range;
	}
	
	constructor() {
		this.position = [];
		this.color = [];
		this.size = [];
		this.invertionPoint = [0, 0];
		this.invertionRange = 0;

		this.bPosition = gl.createBuffer();
		this.bColor = gl.createBuffer();
		this.bSize = gl.createBuffer();
		
		this.createShader();
		this.update();
	}
}