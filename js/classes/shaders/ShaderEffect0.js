class ShaderEffect0 {
	prepareShaderCode() {
		this.vertCode = `
attribute vec2 position;
attribute vec2 move;
attribute float scale;
attribute vec3 color;

varying vec2 p;
varying vec3 c;

void main(void) {
	p = (position-move)*scale;
	c = color;
	gl_PointSize = 3.0;
	gl_Position = vec4(position,0.0,1.0);
}`
		this.fragCode = `
precision mediump float;
uniform float time;
uniform bool eight_bit_mode;

varying vec2 p;
varying vec3 c;

float effect1() {
	vec2 point = abs(p);
	if (point.y>point.x) point = point.yx;
	vec3 change;
	return (point.y<=0.8 ? 1.0/pow(abs(point.x-0.8),2.0)/128.0 : 1.0/pow(distance(point,vec2(0.8,0.8)),2.0)/128.0);
}

void main(void) {
	vec3 col = c*effect1();
	gl_FragColor = vec4(col,pow(max(max(col.r,col.g),max(col.b,0.0)),2.0));
}`
	}
	
	prepareBuffers() {
		gl.useProgram(this.shader);
		this.bPosition = prepareBuffer(this.bPosition,"position",this.shader,2);
		this.bMove = prepareBuffer(this.bMove,"move",this.shader,2);
		this.bScale = prepareBuffer(this.bScale,"scale",this.shader,1);
		this.bColor = prepareBuffer(this.bColor,"color",this.shader,3);
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
	}

	draw() {
		gl.useProgram(this.shader);
		if (this.n>0) {
			this.setBufferData();
			gl.drawArrays(gl.TRIANGLES,0,this.n);
		}
	}
	
	addPoint(position,move,scale,color) {
		var n2 = this.n*2;
		var n3 = this.n*3;
		this.position[n2] = position[0];
		this.position[n2+1] = position[1];
		this.move[n2] = move[0];
		this.move[n2+1] = move[1];
		this.scale[this.n] = scale;
		this.color[n3] = color[0];
		this.color[n3+1] = color[1];
		this.color[n3+2] = color[2];
		this.n++;
	}
	
	addEffect(pos,size) {
		var p1 = [pos[0]-size,pos[1]-size];
		var p2 = [pos[0]-size,pos[1]+size];
		var p3 = [pos[0]+size,pos[1]-size];
		var p4 = [pos[0]+size,pos[1]+size];
		var move = pos;
		var scale = 1/size;
		var color = [1,0.3,0.1];
		this.addPoint(p1,move,scale,color);
		this.addPoint(p2,move,scale,color);
		this.addPoint(p3,move,scale,color);
		this.addPoint(p2,move,scale,color);
		this.addPoint(p3,move,scale,color);
		this.addPoint(p4,move,scale,color);
	}

	update() {
		this.n = 0;
		this.position = [];
		this.move = [];
		this.scale = [];
		this.color = [];
	}
	
	constructor() {
		this.position = [];
		this.move = [];
		this.scale = [];
		this.color = [];

		this.bPosition = gl.createBuffer();
		this.bMove = gl.createBuffer();
		this.bScale = gl.createBuffer();
		this.bColor = gl.createBuffer();
		
		this.createShader();
		this.update();
	}
}