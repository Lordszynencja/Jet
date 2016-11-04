class Flame {
	f(x) {
		return this.height*Math.pow(this.width-Math.abs(x), 2)*100;
	}
	
	calculateHeight(x, lvl) {
		return this.f(x)*lvl/this.maxN;
	}
	
	update() {
		for (var i=0;i<this.maxN;i++) {
			this.r[i] = [];
			this.v[i] = [];
			for (var j=0;j<this.details;j++) {
				var x = this.width*j/(this.details-1);
				var y = this.calculateHeight(x, i);
				this.r[i][j] = Math.random()*y*this.randomness;
				if (i>1) this.r[i][j] += this.r[i-1][j];
				y += this.r[i][j];
				this.v[i].push([this.pos[0]+x, this.pos[1]+y]);
			}
			for (var j=1;j<this.details;j++) {
				var x = -this.width*j/(this.details-1);
				var y = this.calculateHeight(x, i);
				this.r[i][j+this.details-1] = Math.random()*y*this.randomness;
				if (i>1) this.r[i][j+this.details-1] += this.r[i-1][j+this.details-1];
				y += this.r[i][j+this.details-1];
				this.v[i].push([this.pos[0]+x, this.pos[1]+y]);
			}
		}
	}
	
	drawBottom() {
		var color2 = [1,1,1];
		for (var i in this.color) color2[i] = this.color[i]*(1-1/this.maxN);
		for (var i=1;i<this.details;i++) {
			v.push(this.pos);
			v.push(this.v[0][i-1]);
			v.push(this.v[0][i]);
			c.push(this.color);
			c.push(color2);
			c.push(color2);
		}
		v.push(this.pos);
		v.push(this.v[0][0]);
		v.push(this.v[0][this.details]);
		c.push(this.color);
		c.push(color2);
		c.push(color2);
		for (var i=1;i<this.details-1;i++) {
			v.push(this.pos);
			v.push(this.v[0][this.details+i-1]);
			v.push(this.v[0][this.details+i]);
			c.push(this.color);
			c.push(color2);
			c.push(color2);
		}
	}
	
	drawLevel(n) {
		var color1 = [0, 0, 0];
		for (var i in this.color) color1[i] = this.color[i]*(1-(n-1)/this.maxN);
		var color2 = [0, 0, 0];
		for (var i in this.color) color2[i] = this.color[i]*(1-n/this.maxN);
		for (var i=1;i<this.details;i++) {
			v.push(this.v[n-1][i-1]);
			v.push(this.v[n][i-1]);
			v.push(this.v[n][i]);
			c.push(color1);
			c.push(color2);
			c.push(color2);
			
			v.push(this.v[n-1][i-1]);
			v.push(this.v[n-1][i]);
			v.push(this.v[n][i]);
			c.push(color1);
			c.push(color1);
			c.push(color2);
		}
		v.push(this.v[n-1][0]);
		v.push(this.v[n][0]);
		v.push(this.v[n][this.details]);
		c.push(color1);
		c.push(color2);
		c.push(color2);
		
		v.push(this.v[n-1][0]);
		v.push(this.v[n-1][this.details]);
		v.push(this.v[n][this.details]);
		c.push(color1);
		c.push(color1);
		c.push(color2);
		
		for (var i=1;i<this.details-1;i++) {
			v.push(this.v[n-1][this.details+i-1]);
			v.push(this.v[n][this.details+i-1]);
			v.push(this.v[n][this.details+i]);
			c.push(color1);
			c.push(color2);
			c.push(color2);
			v.push(this.v[n-1][this.details+i-1]);
			v.push(this.v[n-1][this.details+i]);
			v.push(this.v[n][this.details+i]);
			c.push(color1);
			c.push(color1);
			c.push(color2);
		}
	}
	
	draw() {
		this.drawBottom();
		for (var i=1;i<this.maxN;i++) {
			this.drawLevel(i);
		}
	}
	
	constructor(pos, sizex, sizey, randomness, details, color) {
		this.maxN = 16;
		this.v = [];
		this.r = [];
		for (var i=0;i<this.maxN;i++) this.v[i] = [];
		for (var i=0;i<this.maxN;i++) this.r[i] = [];
		this.pos = pos;
		this.width = sizex;
		this.height = sizey;
		this.details = details;
		this.color = color;
		this.randomness = randomness;
	}
}