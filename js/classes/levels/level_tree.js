var canvas = document.getElementById('canv');
var ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 1000;
const frameWidth = 100;
const frameHeight = 40;

var treeFrames = {};

function addFrame(id, name, x, y, upper) {
	treeFrames[id] = {
		name: name,
		x: x,
		y: y,
		upper: upper
	};
}

function prepareFrames() {
	addFrame('XantarianEscape', 'Xantarian Escape', 1, 0, []);
	addFrame('BokTraining', 'Bok Training', 1, 1, ['XantarianEscape']);
	addFrame('BombardingDay', 'Bombarding Day', 0.5, 2, ['BokTraining']);
	addFrame('BombardingNight', 'Bombarding Night', 1.5, 2, ['BokTraining']);
	addFrame('BokEscapeNight', 'Bok Escape (Night)', 0.5, 3, ['BombardingDay']);
	addFrame('BokEscapeDay', 'Bok Escape (Day)', 1.5, 3, ['BombardingNight']);
	addFrame('next', 'Mission...', 1, 4, ['BokEscapeNight', 'BokEscapeDay']);
}

function fx(x) {
	return x*(frameWidth+50)+25;
}

function fy(y) {
	return y*(frameHeight+25)+25;
}

function drawFrame(id) {
	var f = treeFrames[id];
	var x = fx(f.x);
	var y = fy(f.y);
	var div = document.createElement('div');
	div.style = 'border: 1px solid black; width: '+(frameWidth-2)+'px; height: '+(frameHeight-2)+'px; position: absolute; top: '+y+'px; left: '+x+'px';
	div.innerHTML = '<div style="position: relative; top: '+frameHeight/2+'px; left: '+frameWidth/2+'px; transform: translate(-50%, -50%)" >'+f.name+'</div>';
	document.body.append(div);
}

function drawArrow(frameFrom, frameTo) {
	var f1 = treeFrames[frameFrom];
	var f2 = treeFrames[frameTo];
	var x1 = fx(f1.x)+frameWidth/2;
	var y1 = fy(f1.y)+frameHeight;
	var x2 = fx(f2.x)+frameWidth/2;
	var y2 = fy(f2.y);
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function drawTree() {
	for (var i in treeFrames) {
		var f = treeFrames[i];
		drawFrame(i);
		for (var j in f.upper) {
			drawArrow(f.upper[j], i);
		}
	}
}

prepareFrames();
drawTree();