function makeCoords4(x1,x2,y1,y2) {
	if (x2 != null && x2 != undefined) return [[x1,y1], [x2,y1], [x1,y2], [x2,y2]];
	return [[x1[0],x1[2]], [x1[1],x1[2]], [x1[0],x1[3]], [x1[1],x1[3]]];
}

function makeCoords2(x,y) {
	if (y) return makeCoords4(-x,x,y,-y);
	return makeCoords4(-x1[0],x1[0],x1[1],-x1[1]);
}

function makeCoords1(x) {
	return makeCoords4(-x, x, x, -x);
}

function makeTexCoords(x1, x2, y1, y2) {
	return makeCoords4(x1/tex_s, x2/tex_s, y1/tex_s, y2/tex_s);
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

function prepareOptionsVertexes(n) {
	var v = [];
	for (var i=0;i<n;i++) v[i] = makeCoords4(-0.2, 0.2, 0.15*n-0.05-i*0.3, 0.15*n-0.25-i*0.3);
	return v;
}

function prepareOptionsPositions(options, fontSize = 0.1) {
	var v = [];
	var n = options.length;
	for (var i=0;i<n;i++) {
		var x = -options[i].length*fontSize/2;
		var y = fontSize*2*(n/2-0.5-i);
		v[i] = [x, y];
	}
	return v;
}

function findSelectSize(s, fontSize, position) {
	var x1 = position[0]-fontSize/2;
	var x2 = position[0]+s.length*fontSize+fontSize/2;
	var y1 = position[1];
	var y2 = position[1]-1.75*fontSize;
	return makeCoords4(x1, x2, y1, y2);
}
