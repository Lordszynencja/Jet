class Particle {
	update() {
		if (time > this.lifeEnd) {
			delete effects[this.num];
			return true;
		}
		this.position = [this.position[0]+this.movement[0], this.position[1]+this.movement[1]];
		return false;
	}
	
	draw() {
		g.addParticle(this.position, this.color, this.size);
	}
	
	constructor(position, angle, speed, lifetime, color, size, num) {
		this.position = position;
		this.movement = [Math.cos(angle)*speed, Math.sin(angle)*speed];
		this.lifeEnd = time+lifetime;
		this.color = color;
		this.size = size;
		this.num = num;
	}
}