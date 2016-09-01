//==== CONTROLS ====\\

class Controls {
	keyDown(c) {
		var name=this.code[c];
		if (name!="nothing") this.act[name]=true;
		else console.log("button pressed: "+c);
		m.pressed[menu](name);
	}
	
	keyUp(c) {
		var name=this.code[c];
		if (name!="nothing") this.act[name]=false;
	}
	
	constructor() {
		this.act={};
		this.code=[];
		this.mouseX=0;
		this.mouseY=0;
		var i;
		for (i=0;i<256;i++) this.code[i]="nothing";
		
		this.code[13]="enter";
		this.code[16]="shift";
		this.code[17]="ctrl";
		this.code[18]="alt";
		this.code[27]="esc";
		this.code[32]="space";
		this.code[37]="left";
		this.code[38]="up";
		this.code[39]="right";
		this.code[40]="down";
		this.code[80]="p";
		
		for (i=0;i<256;i++) if (this.code[i]!="nothing") this.act[this.code[i]]=false;
		//for (i in this.act) console.log(i+":"+this.act[i]);
	}
	
	isPressed(name) {
		return this.act[name];
	}
}

c=new Controls();

window.onkeydown=function(e) {
	if (e.keyCode in c.code) e.preventDefault();
	c.keyDown(e.which || e.keyCode);
};

window.onkeyup=function(e) {
	c.keyUp(e.which || e.keyCode);
};

window.onmousemove=function(e) {
	if (!e) e=window.event;
	var rect = g.canvas.getBoundingClientRect();
	var mx=e.clientX-rect.left;
	var my=e.clientY-rect.top;
	if (mx>=0 && mx<g.canvas.width && my>=0 && my<g.canvas.height) {
		c.mouseX=(mx/g.canvas.width)*2-1;
		c.mouseY=-(my/g.canvas.height)*2+1;
	}
}

