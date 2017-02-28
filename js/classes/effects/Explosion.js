const explosionAngles = 360;
var explosionTrig = {
	sin : [],
	cos : []
};

class Explosion {
	static prepare() {
		for (var i=0;i<explosionAngles;i++) {
			var angle = i/explosionAngles*Math.PI*2;
			explosionTrig.sin[i] = Math.sin(angle);
			explosionTrig.cos[i] = Math.cos(angle);
		}
	}
	
	update() {
		this.t += 1/FPS;
		for (var i=0;i<explosionAngles;i++) {
			this.distances[i] += Math.random()*0.02;
		}
		if (this.t>0.45) delete effects[this.num];
	}
	
	draw() {
		var color = [1-(this.t-0.16)*8, 1-(this.t-0.1)*8, 1-(this.t-0.06)*8, 1-(this.t-0.2)*4];
		for (var i=0;i<explosionAngles;i++) {
			var i2 = i+1;
			if (i2 == explosionAngles) i2 = 0;
			var d1 = this.distances[i];
			var d2 = this.distances[i2];
			var positions = [[this.x, this.y],
				[this.x+d1*explosionTrig.cos[i], this.y+d1*explosionTrig.sin[i]],
				[this.x+d2*explosionTrig.cos[i2], this.y+d2*explosionTrig.sin[i2]]];
			var colors = [color, color, color];
			g.addTriangle(positions, colors);
		}
	}
	
	constructor(x, y, size, num) {
		this.x = x;
		this.y = y;
		this.t = 0;
		this.distances = [];
		this.size = size;
		this.num = num;
		for (var i=0;i<explosionAngles;i++) {
			this.distances[i] = size*(0.5+0.5*Math.random());
		}
	}
}

Explosion.prepare();
