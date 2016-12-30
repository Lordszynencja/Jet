function prettyDatesDifference(d1, d2) {
	console.log(((d2 - d1)/1000).toFixed(3) + " seconds");
}

function shadow(xy,tan) {
	return xy[0]-tan*xy[1];
}

function shadow2(xy,tan) {
	return xy[1];
}

function angle(x,y) {
	var d = Math.sqrt(x*x+y*y);
	return (x>0 ? Math.asin(y/d) : Math.PI-Math.asin(y/d));
}

function check(x,x1,x2) {
	return ((x>x1 && x>x2) || (x<x1 && x<x2));
}

function crossProduct(p1,p2,p3) {
	return (p2[0]-p1[0])*(p3[1]-p1[1])-(p2[1]-p1[1])*(p3[0]-p1[0]);
}

function dist(p1,p2) {
	var dx = p1[0]-p2[0];
	var dy = p1[1]-p2[1];
	return Math.sqrt(dx*dx+dy*dy);
}

function cross(l1,l2) {//l1 and l2 are [x1,y1][x2,y2]
	var dx1 = l1[1][0]-l1[0][0];
	var dy1 = l1[1][1]-l1[0][1];
	var dx2 = l2[1][0]-l2[0][0];
	var dy2 = l2[1][1]-l2[0][1];
	if (dx1==0) {
		if (dx2==0) {
			return false;
		} else {
			var a = dy2/dx2;
			var b = l2[0][1]-a*l2[0][0];
			var x = l1[0][0];
			var p = [x,a*x+b];
			if (check(x,l2[0][0],l2[1][0]) || check(p[1],l1[0][1],l1[1][1]) || check(p[1],l2[0][1],l2[1][1])) return false;
			return p;
		}
	} else {
		if (dx2==0) {
			var a = dy1/dx1;
			var b = l1[0][1]-a*l1[0][0];
			var x = l2[0][0];
			var p = [x,a*x+b];
			if (check(x,l1[0][0],l1[1][0]) || check(p[1],l1[0][1],l1[1][1]) || check(p[1],l2[0][1],l2[1][1])) return false;
			return p;
		} else {
			var a1 = dy1/dx1;
			var b1 = l1[0][1]-a1*l1[0][0];
			var a2 = dy2/dx2;
			var b2 = l2[0][1]-a2*l2[0][0];
			if (a1==a2) return false;
			var x = (b2-b1)/(a1-a2);
			var p = [x,a1*x+b1];
			if (check(x,l1[0][0],l1[1][0]) || check(x,l2[0][0],l2[1][0]) || check(p[1],l1[0][1],l1[1][1]) || check(p[1],l2[0][1],l2[1][1])) return false;
			return p;
		} 
	}
	return false;
}

function collide(v1,v2) {//v1 & v2 must be convex hulls with vertices in order
	var i,s,s1;
	var l1 = v1.length;
	var l2 = v2.length;
	for (s=0;s<l1;s++) {
		var s1 = (s+1)%l1;
		var x1 = v1[s][0];
		var x2 = v1[s1][0];
		var y1 = v1[s][1];
		var y2 = v1[s1][1];
		var sfun;
		var tan;
		if (y1 == y2) {
			sfun = shadow2;
			tan = 0;
		} else {	
			sfun = shadow;
			tan = (x2-x1)/(y2-y1);
		}
		var max = sfun(v1[0],tan);
		var min = max;
	  
		for (i=1;i<l1;i++) {
			var val = sfun(v1[i],tan);
			if (val<min) min = val;
			else if (val>max) max = val;
		}
	  
		var on_left = false;
		var on_right = false;
	  
		for (i=0;i<l2;i++) {
			var val = sfun(v2[i],tan);
			if (val>=min) on_right = true;
			if (val<=max) on_left = true;
		}
		if (!on_left || !on_right) return false;
	}
               
	for (s=0;s<l2;s++) {
		var s1 = (s+1)%l2;
		var x1 = v2[s][0];
		var x2 = v2[s1][0];
		var y1 = v2[s][1];
		var y2 = v2[s1][1];
		var sfun;
		var tan;
		if (y1 == y2) {
			sfun = shadow2;
			tan = 0;
		} else {	
			sfun = shadow;
			tan = (x2-x1)/(y2-y1);
		}
		var max = sfun(v2[0],tan);
		var min = max;
	  
		for (i=1;i<l2;i++) {
			var val = sfun(v2[i],tan);
			if (val<min) min = val;
			else if (val>max) max = val;
		}
	  
		var on_left = false;
		var on_right = false;
	  
		for (i=0;i<l1;i++) {
			var val = sfun(v1[i],tan);
			if (val>=min) on_right = true;
			if (val<=max) on_left = true;
		}
		if (!on_left || !on_right) return false;
	}
	return true;
}

function makeCoords4(x1,x2,y1,y2) {
	if (x2) return [[x1,y1], [x2,y1], [x1,y2], [x2,y2]];
	return [[x1[0],x1[2]], [x1[1],x1[2]], [x1[0],x1[3]], [x1[1],x1[3]]];
}

function makeCoords2(x,y) {
	if (y) return makeCoords4(-x,x,y,-y);
	return makeCoords4(-x1[0],x1[0],x1[1],-x1[1]);
}

function makeCoords1(x) {
	return makeCoords4(-x,x,x,-x);
}

function makeTexCoords(x1, x2, y1, y2) {
	return makeCoords4(x1/tex_s, x2/tex_s, y1/tex_s, y2/tex_s);
}

function cleanArray(arr) {
  var newArray = new Array();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      newArray.push(arr[i]);
	  newArray[newArray.length-1].num = newArray.length-1;
    }
  }
  return newArray;
}

function rotateModel(m = [],angle = 0) {
	var i;
	var newM = [];
	for (i in m) {
		newM[i] = [m[i][0]*Math.cos(angle)-m[i][1]*Math.sin(angle),m[i][0]*Math.sin(angle)+m[i][1]*Math.cos(angle)];
	}
	return newM;
}

function moveModel(m = [],x = 0,y = 0) {
	var newM = [];
	for (var i in m) newM[i] = [m[i][0]+x,m[i][1]+y];
	return newM;
}

function scaleModel(m = [], scale = 1) {
	var newM = [];
	for (var i in m) newM[i] = [m[i][0]*scale,m[i][1]*scale];
	return newM;
}

function logCode(code) {
	var lines = code.split('\n');
	var s = '';
	for (var i in lines) if (i>0) s += (i-1)+':'+lines[i]+'\n';
	console.log(s);
}

function checkShaderCompileErrors(code,shader) {
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		var error = gl.getShaderInfoLog(shader);
		logCode(code);
		console.log("##################\nSHADER ERROR\n##################\n"+error+"##################\nSHADER ERROR\n##################\n");
	}
}

function compileShaders(vertCode, fragCode) {
	var vertShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertShader,vertCode);
	gl.compileShader(vertShader);
	checkShaderCompileErrors(vertCode,vertShader);
	
	var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragShader,fragCode);
	gl.compileShader(fragShader);
	checkShaderCompileErrors(fragCode,fragShader);
	
	var shader = gl.createProgram();
	gl.attachShader(shader, vertShader);
	gl.attachShader(shader, fragShader);
	gl.linkProgram(shader);
	return shader;
}

function prepareBuffer(buffer, name, shader, size) {
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	var attrib = gl.getAttribLocation(shader,name);
	gl.vertexAttribPointer(attrib,size,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(attrib);
	return buffer;
}

function fillBuffer(buffer, name, shader, size, data) {
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	var attrib = gl.getAttribLocation(shader, name);
	gl.vertexAttribPointer(attrib, size, gl.FLOAT, false, 0, 0);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STREAM_DRAW);
}

function prepareOptionsVertexes(n) {
	var v = [];
	for (var i=0;i<n;i++) v[i] = makeCoords4(-0.2, 0.2, 0.15*n-0.05-i*0.3, 0.15*n-0.25-i*0.3);
	return v;
}

function save(name, object) {
	localStorage[name] = JSON.stringify(object);
}

function load(name) {
	var objectJSON = localStorage[name];
	if (objectJSON) {
		return JSON.parse(objectJSON);
	}
	return undefined;
}
