class Player {
	update() {
		if (!this.dead) {
			this.invincibility--;
			if (c.isPressed("left")) {
				this.x-=0.03;
				if (this.x<=-0.85) this.x=-0.85;
			}
			if (c.isPressed("right")) {
				this.x+=0.03;
				if (this.x>=0.85) this.x=0.85;
			}
			if (c.isPressed("up")) {
				this.y+=0.03;
				if (this.y>=0.85) this.y=0.85;
			}
			if (c.isPressed("down")) {
				this.y-=0.03;
				if (this.y<=-0.85) this.y=-0.85;
			}
			var i;
			for (i=0;i<this.weapons.length;i++) {
				this.weapons[i][3]--;
			}
			if (c.isPressed("space") && !this.overheat) {
				for (i=0;i<this.weapons.length;i++) {
					if (this.weapons[i][3]<=0) {
						var t=this.weapons[i][2];
						pm.add[this.weapons[i][2]](this.weapons[i]);
						this.weapons[i][3]=miss_del[t];
					}
				}
			}
			this.heat-=this.cooling;
			if (this.heat>=100) this.heat=100,this.overheat=true;
			if (this.overheat && this.heat<=75) this.overheat=false;
			if (this.heat<0) this.heat=0;
		}
	}

	updateafter() {
		if (this.hp<0) {
			this.hp=0;
			if (!this.dead) {
				s.play("gameover",1);
				this.dead=true;
				this.dead_timer=time;
			}
		}
		if (this.dead && time-this.dead_timer>200) {
			menu=3;
			m.position=0;
			p.hp=100;
			this.dead=false;
		}
	}
	
	prepare() {
		this.x=0.0;
		this.y=-0.85;
		this.hp=100;
		this.invincibility=0;
		this.score=0;
		this.heat=0;
		this.ship=0;
		this.cooling=1;
		this.weapons=[[-0.1,-0.05,1,0],//x,y,type,cooldown
			[0,0.15,3,0],
			[0.1,-0.05,1,0],
			[0,0,4,0]];
		this.overheat=false;
		this.dead=false;
	}
	
	draw_ship() {
		if (!this.dead) {
			var i;
			for (i=0;i<6;i++) {//setting ship
				g.add_v(0,[this.x+ship_v[2*i],this.y+ship_v[2*i+1],0.0],[ship_tex[2*i],ship_tex[2*i+1]]);
			}
		} else {
			for (var i=0;i<6;i++) {
				g.add_v(1,[gameover_v[2*i],gameover_v[2*i+1],-0.999],[gameover_tex[2*i],gameover_tex[2*i+1]]);
			}
		}
	}
	
	draw_score() {
		var i;
		for (i=0;i<12;i++) {//score
			var iscore=[0,0,0,0,0,0];
			var s=this.score;
			var j;
			for (j=0;j<6;j++) {
				iscore[5-j]=s%10;
				s=Math.floor(s/10);
			}
			g.draw_text(-0.9,-0.9,iscore,0.1);
		}
	}
	
	draw_life() {
		var i;
		for (i=0;i<6;i++) {
			g.add_v(0,[lives_v[2*i]+0.75,lives_v[2*i+1]-0.85,-0.998],[lives_tex[2*i],lives_tex[2*i+1]]);
		}
		g.add_v(0,[lives2_v[0]+0.75,lives2_v[1]-0.85,-0.999],[lives2_tex[0],lives2_tex[1]]);
		g.add_v(0,[lives2_v[2]+0.75-((100.0-this.hp)/250.0),lives2_v[3]-0.85,-0.999],[lives2_tex[2],lives2_tex[3]]);
		g.add_v(0,[lives2_v[4]+0.75-((100.0-this.hp)/250.0),lives2_v[5]-0.85,-0.999],[lives2_tex[4],lives2_tex[5]]);
		g.add_v(0,[lives2_v[6]+0.75,lives2_v[7]-0.85,-0.999],[lives2_tex[6],lives2_tex[7]]);
		g.add_v(0,[lives2_v[8]+0.75,lives2_v[9]-0.85,-0.999],[lives2_tex[8],lives2_tex[9]]);
		g.add_v(0,[lives2_v[10]+0.75-((100.0-this.hp)/250.0),lives2_v[11]-0.85,-0.999],[lives2_tex[10],lives2_tex[11]]);
	}
	
	draw_heat() {
		var i;
		for (i=0;i<6;i++) {
			g.add_v(0,[lives_v[2*i]+0.3,lives_v[2*i+1]-0.85,-0.998],[lives_tex[2*i],lives_tex[2*i+1]]);
		}
		g.add_v(0,[0.4,lives2_v[1]-0.85,-0.999],[lives2_tex[0],lives2_tex[1]]);
		g.add_v(0,[0.5,lives2_v[3]-0.85,-0.999],[lives2_tex[2],lives2_tex[3]]);
		g.add_v(0,[0.5,lives2_v[5]-0.85,-0.999],[lives2_tex[4],lives2_tex[5]]);
		g.add_v(0,[0.4,lives2_v[7]-0.85,-0.999],[lives2_tex[6],lives2_tex[7]]);
		g.add_v(0,[0.4,lives2_v[9]-0.85,-0.999],[lives2_tex[8],lives2_tex[9]]);
		g.add_v(0,[0.5,lives2_v[11]-0.85,-0.999],[lives2_tex[10],lives2_tex[11]]);
		g.add_v(0,[lives2_v[0]+0.3,lives2_v[1]-0.85,-0.999],[heat_tex[0],heat_tex[1]]);
		g.add_v(0,[lives2_v[2]+0.3-((100.0-p.heat)/250.0),lives2_v[3]-0.85,-0.999],[heat_tex[2],heat_tex[3]]);
		g.add_v(0,[lives2_v[4]+0.3-((100.0-p.heat)/250.0),lives2_v[5]-0.85,-0.999],[heat_tex[4],heat_tex[5]]);
		g.add_v(0,[lives2_v[6]+0.3,lives2_v[7]-0.85,-0.999],[heat_tex[6],heat_tex[7]]);
		g.add_v(0,[lives2_v[8]+0.3,lives2_v[9]-0.85,-0.999],[heat_tex[8],heat_tex[9]]);
		g.add_v(0,[lives2_v[10]+0.3-((100.0-p.heat)/250.0),lives2_v[11]-0.85,-0.999],[heat_tex[10],heat_tex[11]]);
	}
	
	draw() {
		this.draw_ship();
		this.draw_score();
		this.draw_life();
		this.draw_heat();
	}
	
	constructor() {
		this.prepare();
	}
}

p=new Player();