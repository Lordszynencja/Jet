const frameWidth = 100;
const frameHeight = 40;
const tooltipWidth = 200;
const tooltipHeight = 100;

var tooltipDiv = document.getElementById('tooltipDiv');
var canvas = document.getElementById('canv');
var ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 10000;

var treeFrames = {};
var minLeft = 1;
var minTop = 1;
var tooltips = {
	"0_XantarianEscape" : [150, 100, "Two guys are on a planet, when it is suddenly attacked. They split and try to escape."],
	"1_BokTraining" : [200, 100, "Our Hero escaped in escape pod, but he needs better stuff, so he joins military, where he gets training."],
	"2a_BombardingDay" : [200, 100, "After training, Hero gets first mission, to bombard some enemy positions. This is day version of mission, contains more enemies, and a little better visibility."],
	"2b_BombardingNight" : [100, 100, "After training, Hero gets first mission, to bombard some enemy positions. This is night version of mission, contains less enemies, but bases are harder to see."],
	"undefined" : [10, 20, ""]
};

function addFrame(id, name, x, y, upper) {
	if (x<minLeft) minLeft = x;
	if (y<minTop) minTop = y;
	treeFrames[id] = {
		name: name,
		x: x,
		y: y,
		upper: upper
	};
}

function moveFrames() {
	for (var i in treeFrames) {
		treeFrames[i].x -= minLeft;
		treeFrames[i].y -= minTop;
	}
}

function prepareFrames() {
	addFrame('0_XantarianEscape', 'Escape from Xantarian', 0, 0, []);
	addFrame('1_BokTraining', 'Training on Bok', 0, 1, ['0_XantarianEscape']);
	addFrame('2a_BombardingDay', 'Bombarding during day', -0.5, 2, ['1_BokTraining']);
	addFrame('2b_BombardingNight', 'Bombarding during night', 0.5, 2, ['1_BokTraining']);
	addFrame('3a_BokEscapeNight', 'Bok escape (night)', -0.5, 3, ['2a_BombardingDay']);
	addFrame('3b_BokEscapeDay', 'Bok escape (Day)', 0.5, 3, ['2b_BombardingNight']);
	addFrame('4_KorianVisit', 'Travel to Korian', 0, 4, ['3a_BokEscapeNight', '3b_BokEscapeDay']);
	addFrame('5_MirianTechnic', 'Jump to Mirian', 0, 5, ['4_KorianVisit']);
	addFrame('6_Earth', 'Jump to Mirian', 0, 5, ['4_KorianVisit']);
}

function fx(x) {
	return x*(frameWidth+50)+25;
}

function fy(y) {
	return y*(frameHeight+25)+25;
}

function setDivStyle(div, width, height, x, y, zIndex) {
	if (zIndex == undefined) zIndex = 0;
	div.style = 'position: absolute; border: 1px solid black; background: rgba(255, 255, 255, 1);  width: '+(width-2)+'px; height: '+(height-2)+'px; z-index: '+zIndex+'; left: '+x+'px; top: '+y+'px;';
}

function drawFrame(id) {
	var f = treeFrames[id];
	var x = fx(f.x);
	var y = fy(f.y);
	var div = document.createElement('div');
	setDivStyle(div, frameWidth, frameHeight, x, y);
	div.innerHTML = '<center onmouseout="hideTooltip()" onmouseover="showTooltip(\''+id+'\')" >'+f.name+'</center></div>';
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

var defaultTooltipStyle = "position: absolute; border: 1px solid black; background: rgba(255, 255, 255, 1); width: "+(tooltipWidth-2)+"px; height: "+(tooltipHeight-2)+"px; z-index: 1; opacity: 1;";

function showTooltip(id) {
	var f = treeFrames[id];
	var x = fx(f.x)+frameWidth+1;
	var y = fy(f.y);
	var tooltip = tooltips[id] == undefined ? tooltips["undefined"] : tooltips[id];
	setDivStyle(tooltipDiv, tooltip[0], tooltip[1], x, y, 1);
	tooltipDiv.innerHTML = "<center>"+tooltip[2]+"</center>"
}

function hideTooltip() {
	tooltipDiv.style = "visibility: hidden";
}

prepareFrames();
moveFrames();
drawTree();