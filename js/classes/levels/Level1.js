class Level1 {
	update() {
		standardLevelUpdate(this);
		/*while (this.nextEnemy<this.enemies.length && this.time >= this.enemies[this.nextEnemy][0]) {
			var enemy = this.enemies[this.nextEnemy][1];
			enemy.num = enemies.length;
			enemies.push(enemy);
			this.nextEnemy++;
		}
		if (this.time == this.levelLength && !p.dead) {
			s.play("gameover",1);
			p.dead = true;
			p.dead_timer = time;
		}
		this.time++;*/
	}
	
	constructor() {
		this.time = 0;
		this.nextEnemy = 0;
		this.levelLength = 500;
		this.number = 1;
		this.texture = 'ground';
		this.enemies = [
		/*[0,new Enemy1([-0.5,1.5],[0.01,Math.PI*3/2],0,[])],
		[0,new Enemy1([0.5,1.5],[0.01,Math.PI*3/2],0,[])],
		[50,new Enemy1([-0.5,1.5],[0.01,Math.PI*3/2],0,[])],
		[50,new Enemy1([0,1.5],[0.01,Math.PI*3/2],0,[])],
		[50,new Enemy1([0.5,1.5],[0.01,Math.PI*3/2],0,[])],
		[100,new Enemy1([-0.5,1.5],[0.01,Math.PI*3/2],0,[])],
		[100,new Enemy1([0.5,1.5],[0.01,Math.PI*3/2],0,[])]*/
		];
	}
}