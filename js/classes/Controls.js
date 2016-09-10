//==== CONTROLS ====\\

uiButtons = [13,37,38,39,40];

/*

class handling input

*/
class Controls {
	keyDown(e) {
		var code = e.which || e.keyCode;
		var name = c.code[code];
		if (name=="nothing") {
			console.log("button pressed: "+code);
			return;
		}
		e.preventDefault();
		c.act[name] = true;
		if (c in uiButtons) ui.pressed[menu](name);
	}
	
	keyUp(e) {
		var name = c.code[e.which || e.keyCode];
		if (name!="nothing") c.act[name]=false;
	}
	
	mouseMove(e) {
		if (!e) e=window.event;
		var rect = g.canvas.getBoundingClientRect();
		var mx=e.clientX-rect.left;
		var my=e.clienY-rect.top;
		if (mx>=0 && mx<g.canvas.width && my>=0 && my<g.canvas.height) {
			c.mouseX=(mx/g.canvas.width)*2-1;
			c.mouseY=-(my/g.canvas.height)*2+1;
		}
	}
	
	constructor() {
		this.act={};
		this.code=[];
		this.mouseX = 0;
		this.mouseY = 0;
		var i;
		for (i=0;i<256;i++) this.code[i] = "nothing";
		
		//list of buttons codes
		this.code[13] = "enter";
		this.code[16] = "shift";
		this.code[17] = "ctrl";
		this.code[18] = "alt";
		this.code[27] = "esc";
		this.code[32] = "space";
		this.code[37] = "left";
		this.code[38] = "up";
		this.code[39] = "right";
		this.code[40] = "down";
		this.code[80] = "p";
		
		//adding buttons to dictionary
		for (i=0;i<256;i++) if (this.code[i]!="nothing") this.act[this.code[i]] = false;
		//for (i in this.act) console.log(i+":"+this.act[i]);
	}
	
	isPressed(name) {
		return this.act[name];
	}
}

c=new Controls();

window.onkeydown=c.keyDown;
/*function(e) {
	e.preventDefault();
	c.keyDown(e.which || e.keyCode);
};*/

window.onkeyup=c.keyUp;
/*function(e) {
	c.keyUp(e.which || e.keyCode);
};*/

window.onmousemove=c.mouseMove;
/*function(e) {
	c.
}*/
