class ShaderEffect0 {
	prepareShaderCode() {
		this.vertCode = `
attribute vec2 position;
attribute vec2 center;
attribute float scale;
attribute float rotation;
attribute vec3 color;
attribute float round_power;

varying vec2 p;
varying vec3 c;
varying float po;

void main(void) {
	p = position;
	c = color;
	po = round_power;
	float s0 = sin(rotation);
	float c0 = cos(rotation);
	gl_Position = vec4(position*mat2(c0, -s0, s0, c0)*scale+center, 0.0, 1.0);
}`
		this.fragCode = `
precision mediump float;
uniform bool eight_bit_mode;

varying vec2 p;
varying vec3 c;
varying float po;
` +
shInvertion +
`
#define str_modifier 64.0
#define size 0.8

float square() {
	vec2 point = abs(p);
	if (point.y > point.x) point = point.yx;
	if (point.y <= size) return 1.0/pow(abs(point.x-size)*str_modifier, 2.0);
	return 1.0/pow(distance(point, vec2(size))*str_modifier, 2.0);
}

float rounded_square() {
	if (po<0.1) return 0.0;
	float my_distance = pow(pow(abs(p.x), po)+pow(abs(p.y), po), 1.0/po);
	return 1.0/abs(my_distance-size)/str_modifier;
}

void main(void) {
	vec3 col = c*max(square(), rounded_square());
	gl_FragColor = vec4(col, pow(max(max(col.r, col.g), max(col.b, 0.0)), 2.0));
	gl_FragColor = computeInvertion(gl_FragColor);
}`
	}
	
	prepareBuffers() {
		gl.useProgram(this.shader);
		this.bPosition = prepareBuffer(this.bPosition, "position", this.shader, 2);
		this.bCenter = prepareBuffer(this.bCenter, "center", this.shader, 2);
		this.bScale = prepareBuffer(this.bScale, "scale", this.shader, 1);
		this.bRotation = prepareBuffer(this.bRotation, "rotation", this.shader, 1);
		this.bColor = prepareBuffer(this.bColor, "color", this.shader, 3);
		this.bRoundPower = prepareBuffer(this.bRoundPower, "round_power", this.shader, 1);
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
		fillBuffer(this.bCenter, "center", this.shader, 2,  this.center);
		fillBuffer(this.bScale, "scale", this.shader, 1,  this.scale);
		fillBuffer(this.bRotation, "rotation", this.shader, 1,  this.rotation);
		fillBuffer(this.bColor, "color", this.shader, 3,  this.color);
		fillBuffer(this.bRoundPower, "round_power", this.shader, 1,  this.roundPower);
	}

	draw() {
		gl.useProgram(this.shader);
		if (this.n>0) {
			this.setBufferData();
			gl.drawArrays(gl.TRIANGLES, 0, this.n);
		}
	}
	
	addPoint(position = [0,0], center = [0,0], scale = 0, rotation = 0, color = [0,0,0], roundPower = 0) {
		var n2 = this.n*2;
		var n3 = this.n*3;
		this.position[n2] = position[0];
		this.position[n2+1] = position[1];
		this.center[n2] = center[0];
		this.center[n2+1] = center[1];
		this.scale[this.n] = scale;
		this.rotation[this.n] = rotation;
		this.color[n3] = color[0];
		this.color[n3+1] = color[1];
		this.color[n3+2] = color[2];
		this.roundPower[this.n] = roundPower;
		this.n++;
	}
	
	addEffect(pos, scale, rotation, color, roundPower) {
		this.addPoint([-1,-1], pos, scale, rotation, color, roundPower);
		this.addPoint([-1,1], pos, scale, rotation, color, roundPower);
		this.addPoint([1,-1], pos, scale, rotation, color, roundPower);
		this.addPoint([-1,1], pos, scale, rotation, color, roundPower);
		this.addPoint([1,-1], pos, scale, rotation, color, roundPower);
		this.addPoint([1,1], pos, scale, rotation, color, roundPower);
	}

	update() {
		this.n = 0;
		this.position = [];
		this.center = [];
		this.scale = [];
		this.rotation = [];
		this.color = [];
		this.roundPower = [];
	}
	
	setInvertion(xy, range) {
		this.invertionPoint = xy;
		this.invertionRange = range;
	}
	
	constructor() {
		this.invertionPoint = [0, 0];
		this.invertionRange = 0;

		this.bPosition = gl.createBuffer();
		this.bCenter = gl.createBuffer();
		this.bScale = gl.createBuffer();
		this.bRotation = gl.createBuffer();
		this.bColor = gl.createBuffer();
		this.bRoundPower = gl.createBuffer();
		
		this.createShader();
		this.update();
	}
}