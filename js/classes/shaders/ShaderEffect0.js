class shaderEffect0 {
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

/*vec2 effect0prepare(vec2 point) {
	point = abs(point);
	if (point.x < point.y) point = point.yx;
	return point;
}

vec3 effect0() {
	vec2 myp = (p-vec2(-0.6,0.0))/0.5;
	vec2 point = effect0prepare(myp);
	float distance = (point.y<=0.5 ? max(abs(point.x-0.5),0.001)*100.0 : distance(point,vec2(0.5,0.5))*100.0);
	return vector111/distance;
}*/

float effect1() {
	vec2 point = abs(p);
	if (point.y>point.x) point = point.yx;
	vec3 change;
	return (point.y<=0.8 ? 1.0/abs(point.x-0.8)/128.0 : 1.0/distance(point,vec2(0.8,0.8))/128.0);
}

void main(void) {
	/*vec2 point = vec2(abs(p.x),abs(p.y));
	if (point.y>point.x) point = point.yx;
	vec3 col;
	if (point.y<=0.2) col = c/abs(point.x-0.8)/128.0;
	else col = c/distance(point,vec2(0.8,0.8))/128.0;*/
	
	vec3 col = c*effect1();
	gl_FragColor = vec4(col,pow(max(max(col.r,col.g),max(col.b,0.0)),2.0));
}`
	}
	
	compileShaders() {
		var vertShader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vertShader,this.vertCode);
		gl.compileShader(vertShader);
		if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
			var error = gl.getShaderInfoLog(vertShader);
			console.log(this.vertCode);
			console.log("##################\nVERT SHADER ERROR\n##################\n"+error);
		}
		
		var fragShader = this.gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fragShader,this.fragCode);
		gl.compileShader(fragShader);
		if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
			var error = gl.getShaderInfoLog(fragShader);
			console.log(this.fragCode);
			console.log("##################\nFRAG SHADER ERROR\n##################\n"+error);
		}
		
		this.shader = gl.createProgram();
		gl.attachShader(this.shader, vertShader);
		gl.attachShader(this.shader, fragShader);
		gl.linkProgram(this.shader);
		this.shader = compileShaders(this.vertCode,this.fragcode);
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
		if (this.n>0) {
			gl.useProgram(this.shader);
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
	
	resetDrawing() {
		this.n = 0;
		this.position = [];
		this.move = [];
		this.scale = [];
		this.color = [];
	}

	prepare() {
		this.resetDrawing();
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
		this.prepare();
	}
}