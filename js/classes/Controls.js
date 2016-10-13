uiButtons = {13:1,27:1,37:1,38:1,39:1,40:1};

class Controls {
	keyDown(e) {
		var code = e.which || e.keyCode;
		var name = c.code[code];
		if (name == "nothing") {
			console.log("button pressed: "+code);
			return;
		}
		e.preventDefault();
		c.act[name] = true;
		if (code in uiButtons) {
			ui.pressed(name);
		}
	}
	
	keyUp(e) {
		var name = c.code[e.which || e.keyCode];
		if (name!="nothing") c.act[name] = false;
	}
	
	mouseMove(e) {
		if (!e) e = window.event;
		var rect = canvas.getBoundingClientRect();
		var mx = e.clientX-rect.left;
		var my = e.clienY-rect.top;
		if (mx>=0 && mx<canvas.width && my>=0 && my<canvas.height) {
			c.mouseX = (mx/canvas.width)*2-1;
			c.mouseY = -(my/canvas.height)*2+1;
		}
	}
	
	constructor() {
		this.act={};
		this.code=[];
		this.mouseX = 0;
		this.mouseY = 0;
		for (var i=0;i<256;i++) this.code[i] = "nothing";
		
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
		
		for (var i=0;i<256;i++) if (this.code[i]!="nothing") this.act[this.code[i]] = false;
		
		window.onkeydown = this.keyDown;
		window.onkeyup = this.keyUp;
		window.onmousemove = this.mouseMove;
	}
	
	isPressed(name) {
		return this.act[name];
	}
}
