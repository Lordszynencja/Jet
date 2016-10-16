class ShaderEffect1 {//laser
	prepareShaderCode() {
		this.vertCode = `
attribute vec2 position;
attribute vec2 move;
attribute float scale;
attribute vec3 color;
attribute float rotation_angle;
attribute vec2 rotation_center;

varying vec2 p;
varying vec3 c;

void main(void) {
	p = (position-move)*scale;
	p.x*=2.0;
	c = color;
	
	float s = sin(rotation_angle);
	float c = cos(rotation_angle);
	vec2 p1 = position - rotation_center;
	vec2 p2 = vec2(p1.x*c+p1.y*(-s), p1.x*s+p1.y*c);
	vec2 p3 = p2+rotation_center;
	
	gl_Position = vec4(p3.x,p3.y,0.0,1.0);
}`
		this.fragCode = `
precision mediump float;
uniform float time;
uniform bool eight_bit_mode;

varying vec2 p;
varying vec3 c;

float effect_strength() {
	float dist = (abs(p.y)>1.0 ? distance(abs(p),vec2(0.0,1.0)) : abs(p.x));
	return pow(1.0/(dist+1.0),4.0);
}

void main(void) {
	vec3 col = c*effect_strength();
	gl_FragColor = vec4(col,pow(max(max(col.r,col.g),max(col.b,0.0)),4.0));
}`
	}
	
	prepareBuffers() {
		gl.useProgram(this.shader);
		this.bPosition = prepareBuffer(this.bPosition,"position",this.shader,2);
		this.bMove = prepareBuffer(this.bMove,"move",this.shader,2);
		this.bScale = prepareBuffer(this.bScale,"scale",this.shader,1);
		this.bColor = prepareBuffer(this.bColor,"color",this.shader,3);
		this.bRotationAngle = prepareBuffer(this.bRotationAngle, "rotation_angle", this.shader, 1);
		this.bRotationCenter = prepareBuffer(this.bRotationCenter, "rotation_center", this.shader, 2);
	}
	
	prepareUniforms() {
		this.uTime = gl.getUniformLocation(this.shader,"time");
		this.uEightBitMode = gl.getUniformLocation(this.shader,"eight_bit_mode");
	}

	createShader() {
		this.prepareShaderCode();
		this.shader = compileShaders(this.vertCode,this.fragCode);
		this.prepareBuffers();
		this.prepareUniforms();
	}

	setBufferData() {
		gl.uniform1f(this.uTime,time);
		gl.uniform1f(this.uEightBitMode,eightBitMode);
		fillBuffer(this.bPosition, "position", this.shader, 2, this.position);
		fillBuffer(this.bMove, "move", this.shader, 2,  this.move);
		fillBuffer(this.bScale, "scale", this.shader, 1,  this.scale);
		fillBuffer(this.bColor, "color", this.shader, 3,  this.color);
		fillBuffer(this.bRotationAngle, "rotation_angle", this.shader, 1,  this.rotationAngle);
		fillBuffer(this.bRotationCenter, "rotation_center", this.shader, 2,  this.rotationCenter);
	}

	draw() {
		gl.useProgram(this.shader);
		if (this.n>0) {
			this.setBufferData();
			gl.drawArrays(gl.TRIANGLES,0,this.n);
		}
	}
	
	addPoint(position,move,scale,color,angle,center) {
		var n2 = this.n*2;
		var n3 = this.n*3;
		for (var i=0;i<2;i++) this.position[n2+i] = position[i];
		for (var i=0;i<2;i++) this.move[n2+i] = move[i];
		this.scale[this.n] = scale;
		for (var i=0;i<3;i++) this.color[n3+i] = color[i];
		this.rotationAngle[this.n] = angle;
		for (var i=0;i<2;i++) this.rotationCenter[n2+i] = center[i];
		this.n++;
	}
	
	addEffect(pos, size, angle, color) {
		var p1 = [pos[0]-size*0.5,pos[1]-size*1.5];
		var p2 = [pos[0]-size*0.5,pos[1]+size*1.5];
		var p3 = [pos[0]+size*0.5,pos[1]-size*1.5];
		var p4 = [pos[0]+size*0.5,pos[1]+size*1.5];
		var move = pos;
		var scale = 1/size;
		
		this.addPoint(p1,move,scale,color,angle,pos);
		this.addPoint(p2,move,scale,color,angle,pos);
		this.addPoint(p3,move,scale,color,angle,pos);
		this.addPoint(p2,move,scale,color,angle,pos);
		this.addPoint(p3,move,scale,color,angle,pos);
		this.addPoint(p4,move,scale,color,angle,pos);
	}
	
	addEffectFromStartAngleLength(p, angle, length, color) {
		var size = length/2;
		var pos = [p[0]+Math.cos(angle)*size, p[1]+Math.sin(angle)*size];
		this.addEffect(pos, size, angle-Math.PI*0.5, color);
	}

	update() {
		this.n = 0;
		this.position = [];
		this.move = [];
		this.scale = [];
		this.color = [];
		this.rotationAngle = [];
		this.rotationCenter = [];
	}
	
	constructor() {
		this.update();

		this.bPosition = gl.createBuffer();
		this.bMove = gl.createBuffer();
		this.bScale = gl.createBuffer();
		this.bColor = gl.createBuffer();
		this.bRotationAngle = gl.createBuffer();
		this.bRotationCenter = gl.createBuffer();
		
		this.createShader();
		this.update();
	}
}