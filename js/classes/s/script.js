function vToVerts(v) {
	var verts = [];
	var l = 0;
	for (var i=0;i<v.length;i++) {
		for (var j=0;j<v[i].length;j++) {
			verts[l] = v[i][j];
			l++;
		}
	}
	return verts;
}

function makeVertShader() {
	var vertShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertShader,vertCode);
	gl.compileShader(vertShader);
	
	if(!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
		var error = gl.getShaderInfoLog(vertShader);
		console.log(vertCode);
		console.log("VERT SHADER ERROR\n"+error);
	}
	return vertShader;
}

function makeFragShader() {
	var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragShader,fragCode);
	gl.compileShader(fragShader);
	
	if(!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
		var error = gl.getShaderInfoLog(fragShader);
		console.log(fragCode);
		console.log("FRAG SHADER ERROR\n"+error);
	}
	return fragShader;
}

function bindBuffers(shader) {
	gl.bindBuffer(gl.ARRAY_BUFFER,verticeBuffer);
	var coordAttrib = gl.getAttribLocation(shader,"v");
	gl.vertexAttribPointer(coordAttrib,2,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(coordAttrib);

	gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
	var colorAttrib = gl.getAttribLocation(shader,"color");
	gl.vertexAttribPointer(colorAttrib,3,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(colorAttrib);
}

function createShader() {
	var shader = gl.createProgram();
	gl.attachShader(shader, makeVertShader());
	gl.attachShader(shader, makeFragShader());
	gl.linkProgram(shader);
	gl.useProgram(shader);
	
	bindBuffers(shader);
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
}

function buf() {
	gl.bindBuffer(gl.ARRAY_BUFFER, verticeBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vToVerts(v)), gl.STREAM_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vToVerts(c)), gl.STREAM_DRAW);
}

function draw() {
	v = [];
	c = [];
	
	for (var i in things) things[i].draw();
	
	buf();
	gl.clearColor(0, 0, 0, 1);
	gl.clear(gl.COLOR_BUFFER_BIT);
	for (var j=0; j<v.length/3; j++) {
		gl.drawArrays(gl.TRIANGLES, j*3, 3);
	}
	requestAnimationFrame(draw);
}

function prepare() {
}

var wr = 10;

createShader();
prepare();
draw();
var step = 0.1;

function update() {
	time += step;
	for (var i in things) things[i].update();
	things[0].randomness = 0.99*things[0].randomness + 0.01*wr;
}

function addFlame() {
	things.push(new Flame([0, -0.9], 0.05, 0.5, wr, 10, [0.3, 0.5, 1.6]));
}

window.setInterval(update,1000/FPS);

addFlame();
