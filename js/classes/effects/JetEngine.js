class JetEngine {
	f(x) {
		return this.height*Math.pow(this.width-Math.abs(x), 2)*100;
	}
	
	calculateHeight(x, lvl) {
		return this.f(x)*lvl/this.maxN;
	}
	
	update() {
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
		this.pos = [this.ship.x+this.offset[0], this.ship.y+this.offset[1]];
		for (var i=0;i<this.maxN;i++) {
			this.r[i] = [];
			this.v[i] = [];
			for (var j=0;j<this.details;j++) {
				var y = this.width*j/(this.details-1);
				var x = -this.calculateHeight(y, i);
				this.r[i][j] = Math.random()*x*this.randomness;
				if (i>1) this.r[i][j] += this.r[i-1][j];
				x += this.r[i][j];
				var x1 = this.cos*x - this.sin*y;
				var y1 = this.sin*x + this.cos*y;
				this.v[i].push([this.pos[0]+x1, this.pos[1]+y1]);
			}
			for (var j=1;j<this.details;j++) {
				var y = -this.width*j/(this.details-1);
				var x = -this.calculateHeight(y, i);
				this.r[i][j+this.details-1] = Math.random()*x*this.randomness;
				if (i>1) this.r[i][j+this.details-1] += this.r[i-1][j+this.details-1];
				x += this.r[i][j+this.details-1];
				var x1 = this.cos*x - this.sin*y;
				var y1 = this.sin*x + this.cos*y;
				this.v[i].push([this.pos[0]+x1, this.pos[1]+y1]);
			}
		}
		this.drawBottom();
		for (var i=1;i<this.maxN;i++) {
			this.drawLevel(i);
		}
	}
	
	changeAngle(angle) {
		this.angle = angle;
		this.cos = Math.cos(angle);
		this.sin = Math.sin(angle);
		this.offset = [this.basicOffset[0]*this.cos-this.basicOffset[1]*this.sin, this.basicOffset[0]*this.sin+this.basicOffset[1]*this.cos];
		this.pos = [this.ship.x+this.offset[0], this.ship.y+this.offset[1]];
	}
	
	constructor(ship, pos, angle, sizex, sizey, randomness, color) {
		this.ship = ship;
		this.maxN = 16;
		this.details = 8;
		this.v = [];
		this.r = [];
		for (var i=0;i<this.maxN;i++) this.v[i] = [];
		for (var i=0;i<this.maxN;i++) this.r[i] = [];
		this.basicOffset = pos;
		this.changeAngle(angle);
		//this.angle = angle;
		//this.cos = Math.cos(angle);
		//this.sin = Math.sin(angle);
		//this.offset = [pos[0]*this.cos-pos[1]*this.sin, pos[0]*this.sin+pos[1]*this.cos];
		//this.pos = [this.ship.x+this.offset[0], this.ship.y+this.offset[1]];
		this.width = sizex;
		this.height = sizey;
		this.defaultHeight = sizey;
		this.color = color;
		this.randomness = randomness;
	}
}