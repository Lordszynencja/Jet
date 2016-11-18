class JetEngine {
	f(x) {
		return this.height*Math.pow(this.width-Math.abs(x), 2)*100;
	}
	
	calculateHeight(x, lvl) {
		return this.f(x)*lvl/this.maxN;
	}
	
	update() {
		this.pos = [this.ship.x+this.offset[0], this.ship.y+this.offset[1]];
		for (var i=0;i<this.maxN;i++) {
			this.r[i] = [];
			this.v[i] = [];
			for (var j=0;j<this.details;j++) {
				var x = this.width*j/(this.details-1);
				var y = this.calculateHeight(x, i);
				this.r[i][j] = Math.random()*y*this.randomness;
				if (i>1) this.r[i][j] += this.r[i-1][j];
				y += this.r[i][j];
				var x1 = this.cos*x - this.sin*y;
				var y1 = this.sin*x + this.cos*y;
				this.v[i].push([this.pos[0]+x1, this.pos[1]+y1]);
			}
			for (var j=1;j<this.details;j++) {
				var x = -this.width*j/(this.details-1);
				var y = this.calculateHeight(x, i);
				this.r[i][j+this.details-1] = Math.random()*y*this.randomness;
				if (i>1) this.r[i][j+this.details-1] += this.r[i-1][j+this.details-1];
				y += this.r[i][j+this.details-1];
				var x1 = this.cos*x - this.sin*y;
				var y1 = this.sin*x + this.cos*y;
				this.v[i].push([this.pos[0]+x1, this.pos[1]+y1]);
			}
		}
	}
	
	drawBottom() {
		var color2 = [1, 1, 1];
		for (var i in this.color) color2[i] = this.color[i]*(1-1/this.maxN);
		for (var i=1;i<this.details;i++) {
			g.addJetEngineEffect(this.pos, this.color);
			g.addJetEngineEffect(this.v[0][i-1], color2);
			g.addJetEngineEffect(this.v[0][i], color2);
		}
		g.addJetEngineEffect(this.pos, this.color);
		g.addJetEngineEffect(this.v[0][0], color2);
		g.addJetEngineEffect(this.v[0][this.details], color2);
		for (var i=1;i<this.details-1;i++) {
			g.addJetEngineEffect(this.pos, this.color);
			g.addJetEngineEffect(this.v[0][this.details+i-1], color2);
			g.addJetEngineEffect(this.v[0][this.details+i], color2);
		}
	}
	
	drawLevel(n) {
		var color1 = [0, 0, 0];
		for (var i in this.color) color1[i] = this.color[i]*(1-(n-1)/this.maxN);
		var color2 = [0, 0, 0];
		for (var i in this.color) color2[i] = this.color[i]*(1-n/this.maxN);
		
		for (var i=1;i<this.details;i++) {
			g.addJetEngineEffect(this.v[n-1][i-1], color1);
			g.addJetEngineEffect(this.v[n][i-1], color2);
			g.addJetEngineEffect(this.v[n][i], color2);
			g.addJetEngineEffect(this.v[n-1][i-1], color1);
			g.addJetEngineEffect(this.v[n-1][i], color1);
			g.addJetEngineEffect(this.v[n][i], color2);
		}
		
		g.addJetEngineEffect(this.v[n-1][0], color1);
		g.addJetEngineEffect(this.v[n][0], color2);
		g.addJetEngineEffect(this.v[n][this.details], color2);
		g.addJetEngineEffect(this.v[n-1][0], color1);
		g.addJetEngineEffect(this.v[n-1][this.details], color1);
		g.addJetEngineEffect(this.v[n][this.details], color2);
		
		for (var i=1;i<this.details-1;i++) {
			g.addJetEngineEffect(this.v[n-1][this.details+i-1], color1);
			g.addJetEngineEffect(this.v[n][this.details+i-1], color2);
			g.addJetEngineEffect(this.v[n][this.details+i], color2);
			g.addJetEngineEffect(this.v[n-1][this.details+i-1], color1);
			g.addJetEngineEffect(this.v[n-1][this.details+i], color1);
			g.addJetEngineEffect(this.v[n][this.details+i], color2);
		}
	}
	
	draw() {
		this.drawBottom();
		for (var i=1;i<this.maxN;i++) {
			this.drawLevel(i);
		}
	}
	
	constructor(ship, pos, angle, sizex, sizey, randomness, color) {
		this.ship = ship;
		this.maxN = 16;
		this.details = 8;
		this.angle = angle+Math.PI*0.5;
		this.cos = Math.cos(angle+Math.PI*0.5);
		this.sin = Math.sin(angle+Math.PI*0.5);
		this.v = [];
		this.r = [];
		for (var i=0;i<this.maxN;i++) this.v[i] = [];
		for (var i=0;i<this.maxN;i++) this.r[i] = [];
		this.pos = pos;
		this.offset = pos;
		this.width = sizex;
		this.height = sizey;
		this.color = color;
		this.randomness = randomness;
	}
}