var canv=document.createElement("canvas");
var div2=document.getElementById("div2");
canv.width=1000;
canv.height=400;
document.getElementById("div1").appendChild(canv);
var context = canv.getContext("2d");
context.beginPath();
context.fillStyle="#FFFFFF";
context.fillRect(0,0,1000,400);
context.moveTo(100,100);
context.bezierCurveTo(100,200,200,200,300,100);
context.stroke();

function myfunc(e) {
	if (!e) e=window.event;
	var rect = canv.getBoundingClientRect();
	var x=Math.floor(e.clientX-rect.left);
	var y=Math.floor(e.clientY-rect.top);
	if (x>0 && x<canv.width && y>0 && y<canv.height) div2.innerHTML = "x="+x+",y="+y;
}

document.onmousemove = myfunc;