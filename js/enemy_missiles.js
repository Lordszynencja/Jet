//==== ENEMY MISSILES ====\\

class Enemy_Missiles {
	prepare() {
		this.last_miss=missiles_max-1;
		var i;
		for (i=0;i<missiles_max;i++) {
			this.miss[i]=[0,0,[]];
		}
	}

	//==== creating ====\\

	find_free() {
		var i=(this.last_miss+1)%missiles_max;
		while (this.miss[i][0]!=0 && i!=this.last_miss) i=(i+1)%missiles_max;
		if (i==this.last_miss) i=(i+1)%missiles_max;
		return i;
	}
	
	prepare_creating() {
		var this_var=this;
		this.add=[];
		this.add[0]=function(oi,w) {};
		this.add[1]=function(oi,w) {//gunshot
			var x=o.obj[oi][2][0]+o.obj[oi][2][5][w][0]*Math.cos(o.obj[oi][2][2])-o.obj[oi][2][5][w][1]*Math.sin(o.obj[oi][2][2]);
			var y=o.obj[oi][2][1]+o.obj[oi][2][5][w][0]*Math.sin(o.obj[oi][2][2])+o.obj[oi][2][5][w][1]*Math.cos(o.obj[oi][2][2]);
			var m=em.find_free();
			this_var.miss[m]=[1,0,[x,y,o.obj[oi][2][2],0.05+o.obj[oi][2][3]]];
			g.add_light(weapon_lights[1],[x,y,0],1,[0,Math.PI]);
			o.obj[oi][2][5][w][3]=miss_del[1];
		};
		this.add[2]=function(o,w) {//big shot
			var x=o.obj[oi][2][0]-o.obj[oi][2][5][w][0]*Math.sin(o.obj[oi][2][2])+o.obj[oi][2][5][w][1]*Math.cos(o.obj[oi][2][2]);
			var y=o.obj[oi][2][1]-o.obj[oi][2][5][w][1]*Math.sin(o.obj[oi][2][2])+o.obj[oi][2][5][w][0]*Math.cos(o.obj[oi][2][2]);
			var m=em.find_free();
			this_var.miss[m]=[2,0,[x,y,o.obj[oi][2][2],0.05+o.obj[oi][2][3]]];
			g.add_light(weapon_lights[1],[x,y,0],1,[0,Math.PI]);
			o.obj[oi][2][5][w][3]=miss_del[2];
		};
	}

	//==== updating ====\\

	prepare_updates() {
		this.updates=[];
		this.updates[0]=function(m) {};
		this.updates[1]=function(m) {
			em.miss[m][1]++;
			em.miss[m][2][0]-=Math.sin(em.miss[m][2][2])*em.miss[m][2][3];
			em.miss[m][2][1]+=Math.cos(em.miss[m][2][2])*em.miss[m][2][3];
			if (em.miss[m][2][0]>3 || em.miss[m][2][0]<-3 || em.miss[m][2][1]>3 || em.miss[m][2][1]<-3) {
				em.miss[m]=[0,0,[]];
			}
		};
		this.updates[2]=function(m) {
			em.miss[m][1]++;
			em.miss[m][2][0]-=Math.sin(em.miss[m][2][2])*em.miss[m][2][3];
			em.miss[m][2][1]+=Math.cos(em.miss[m][2][2])*em.miss[m][2][3];
			if (em.miss[m][2][0]>3 || em.miss[m][2][0]<-3 || em.miss[m][2][1]>3 || em.miss[m][2][1]<-3) {
				em.miss[m]=[0,0,[]];
			}
		};
	}

	update() {
		var i;
		for (i=0;i<missiles_max;i++) this.updates[this.miss[i][0]](i);
	}

	//==== colliding ====\\

	prepare_collides() {
		this.collides=[];
		this.collides[0]=function(m) {};
		this.collides[1]=function(m) {
			var x=em.miss[m][2][0]-p.x;
			var y=em.miss[m][2][1]-p.y;
			var a=x/0.05;
			var b=y/0.15;
			if (a*a+b*b<1 && !p.dead) {
				em.miss[m]=[0,0,[]];
				p.hp-=miss_dmg[1];
			}
		};
		this.collides[2]=function(m) {
			var x=em.miss[m][2][0]-p.x;
			var y=em.miss[m][2][1]-p.y;
			var a=x/0.07;
			var b=y/0.17;
			if (a*a+b*b<1 && !p.dead) {
				p.hp-=miss_dmg[2];
			}
		};
	}

	collide() {
		var i;
		for (i=0;i<missiles_max;i++) this.collides[this.miss[i][0]](i);
	}

	//==== drawing ====\\

	prepare_drawing() {
		this.drawing=[];
		this.drawing[0]=function(m) {};
		this.drawing[1]=function(m) {
			var j;
			for (j=0;j<6;j++) {
				var x=em.miss[m][2][0]+Math.cos(em.miss[m][2][2])*missile_v[1][2*j]-Math.sin(em.miss[m][2][2])*missile_v[1][2*j+1];
				var y=em.miss[m][2][1]+Math.sin(em.miss[m][2][2])*missile_v[1][2*j]+Math.cos(em.miss[m][2][2])*missile_v[1][2*j+1];
				g.add_v(0,[x,y,0.002],[missile_tex[1][2*j],missile_tex[1][2*j+1]]);
			}
		};
		this.drawing[2]=function(m) {
			var j;
			for (j=0;j<6;j++) {
				var x=em.miss[m][2][0]+Math.cos(em.miss[m][2][2])*missile_v[2][2*j]-Math.sin(em.miss[m][2][2])*missile_v[2][2*j+1];
				var y=em.miss[m][2][1]+Math.sin(em.miss[m][2][2])*missile_v[2][2*j]+Math.cos(em.miss[m][2][2])*missile_v[2][2*j+1];
				g.add_v(0,[x,y,0.002],[missile_tex[2][2*j],missile_tex[2][2*j+1]]);
			}
		};
	}

	draw() {
		var i;
		for (i=0;i<missiles_max;i++) this.drawing[this.miss[i][0]](i);
	}
	
	constructor() {
		this.miss=[];//[type,time,data], data=[x,y,a,s]
		this.prepare_creating();
		this.prepare_updates();
		this.prepare_collides();
		this.prepare_drawing();
		this.prepare();
	}
}

em=new Enemy_Missiles();