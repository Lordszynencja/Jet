//==== PLAYER MISSILES ====\\

class Player_Missiles {
	find_free() {
		var i=(this.last_miss+1)%missiles_max;
		while (this.miss[i][0]!=0 && i!=this.last_miss) i=(i+1)%missiles_max;
		if (i==this.last_miss) i=(i+1)%missiles_max;
		return i;
	}

	prepare() {
		this.last_miss=missiles_max-1;
		var i;
		for (i=0;i<missiles_max;i++) {
			this.miss[i]=[0,0,[]];
		}
	}

	//==== creating ====\\

	prepare_creating() {
		this.add=[];
		this.add[0]=function(w) {};
		this.add[1]=function(w) {//gunshot
			var x=p.x+w[0];
			var y=p.y+w[1];
			var m=pm.find_free();
			pm.miss[m]=[1,0,[x+0.03,y,-0.3,0.05]]
			m=pm.find_free();
			pm.miss[m]=[1,0,[x+0.06,y,-0.3,0.05]]
			m=pm.find_free();
			pm.miss[m]=[1,0,[x+0.03,y,0,0.05]]
			m=pm.find_free();
			pm.miss[m]=[1,0,[x,y,0,0.05]]
			m=pm.find_free();
			pm.miss[m]=[1,0,[x-0.03,y,0,0.05]]
			m=pm.find_free();
			pm.miss[m]=[1,0,[x-0.03,y,0.3,0.05]]
			m=pm.find_free();
			pm.miss[m]=[1,0,[x-0.06,y,0.3,0.05]]
			g.add_light(weapon_lights[1],[x,y,0],1,[0,Math.PI/3]);
			s.play("shot",0.1);
			p.heat+=miss_heat[1];
		};
		this.add[2]=function(w) {//big shot
			var x=p.x+w[0];
			var y=p.y+w[1];
			var m=pm.find_free();
			pm.miss[m]=[2,0,[x,y,0,0.05]]
			g.add_light(weapon_lights[2],[x,y,0],1,[0,Math.PI/3]);
			s.play("shot",0.15);
			p.heat+=miss_heat[2];
		};
		this.add[3]=function(w) {//laser
			var x=p.x+w[0];
			var y=p.y+w[1];
			var m=pm.find_free();
			pm.miss[m]=[3,0,[x,y]];
			g.add_light(weapon_lights[3],[x,y,1],2,[0,2]);
			s.play("laser",0.05);
			p.heat+=miss_heat[3];
		};
		this.add[4]=function(w) {//balls
			var m=pm.find_free();
			pm.miss[m]=[4,0,[w[0],w[1],0.4]];
			p.heat+=miss_heat[4];
		};
	}

	//==== updating ====\\

	prepare_updates() {
		this.updates=[];
		this.updates[0]=function(m) {};
		this.updates[1]=function(m) {
			pm.miss[m][1]++;
			pm.miss[m][2][0]-=Math.sin(pm.miss[m][2][2])*pm.miss[m][2][3];
			pm.miss[m][2][1]+=Math.cos(pm.miss[m][2][2])*pm.miss[m][2][3];
			if (pm.miss[m][2][0]>3 || pm.miss[m][2][0]<-3 || pm.miss[m][2][1]>3 || pm.miss[m][2][1]<-3) {
				pm.miss[m]=[0,0,[]];
			}
		};
		this.updates[2]=function(m) {
			pm.miss[m][1]++;
			pm.miss[m][2][0]-=Math.sin(pm.miss[m][2][2])*pm.miss[m][2][3];
			pm.miss[m][2][1]+=Math.cos(pm.miss[m][2][2])*pm.miss[m][2][3];
			if (pm.miss[m][2][0]>3 || pm.miss[m][2][0]<-3 || pm.miss[m][2][1]>3 || pm.miss[m][2][1]<-3) {
				pm.miss[m]=[0,0,[]];
			}
		};
		this.updates[3]=function(m) {
			pm.miss[m][1]++;
			if (pm.miss[m][1]>1) {
				pm.miss[m]=[0,0,[]];
			}
		};
		this.updates[4]=function(m) {
			pm.miss[m][1]++;
			if (pm.miss[m][1]>50) {
				pm.miss[m]=[0,0,[]];
			}
		};
	}

	update() {
		var i;
		for (i=0;i<missiles_max;i++) this.updates[this.miss[i][0]](i);
	}

	//==== drawing ====\\

	prepare_drawing() {
		this.drawing=[];
		this.drawing[0]=function(m) {};
		this.drawing[1]=function(m) {
			var j;
			for (j=0;j<6;j++) {
				var x=pm.miss[m][2][0]+Math.cos(pm.miss[m][2][2])*missile_v[1][2*j]-Math.sin(pm.miss[m][2][2])*missile_v[1][2*j+1];
				var y=pm.miss[m][2][1]+Math.sin(pm.miss[m][2][2])*missile_v[1][2*j]+Math.cos(pm.miss[m][2][2])*missile_v[1][2*j+1];
				g.add_v(0,[x,y,0.002],[missile_tex[1][2*j],missile_tex[1][2*j+1]]);
			}
		};
		this.drawing[2]=function(m) {
			var j;
			for (j=0;j<6;j++) {
				var x=pm.miss[m][2][0]+Math.cos(pm.miss[m][2][2])*missile_v[2][2*j]-Math.sin(pm.miss[m][2][2])*missile_v[2][2*j+1];
				var y=pm.miss[m][2][1]+Math.sin(pm.miss[m][2][2])*missile_v[2][2*j]+Math.cos(pm.miss[m][2][2])*missile_v[2][2*j+1];
				g.add_v(0,[x,y,0.002],[missile_tex[2][2*j],missile_tex[2][2*j+1]]);
			}
		};
		this.drawing[3]=function(m) {
			var j;
			for (j=0;j<6;j++) {
				var x=pm.miss[m][2][0]+missile_v[3][2*j];
				var y=pm.miss[m][2][1]+missile_v[3][2*j+1];
				g.add_v(0,[x,y,0.002],[missile_tex[3][2*j],missile_tex[3][2*j+1]]);
			}
		};
		this.drawing[4]=function(m) {
			var ball;
			for (ball=0;ball<2;ball++) {
				var x0=p.x+pm.miss[m][2][0]+Math.sin(Math.PI*(pm.miss[m][1]+ball*50)/50)*pm.miss[m][2][2];
				var y0=p.y+pm.miss[m][2][1]+Math.cos(Math.PI*(pm.miss[m][1]+ball*50)/50)*pm.miss[m][2][2];
				var j;
				for (j=0;j<6;j++) {
					var x=x0+missile_v[4][2*j];
					var y=y0+missile_v[4][2*j+1];
					g.add_v(0,[x,y,0.002],[missile_tex[4][2*j],missile_tex[4][2*j+1]]);
				}
				g.add_light(weapon_lights[4],[x0,y0,0],1,[0,Math.PI]);
			}
		};
	}

	draw() {
		var i;
		for (i=0;i<missiles_max;i++) this.drawing[this.miss[i][0]](i);
	}

	//==== checking hitbox ====\\
	
	prepare_collides() {
		this.collides=[];
		this.collides[0]=function(m) {};
		this.collides[1]=function(m) {
			var i;
			for (i=0;i<obj_max;i++) {
				if (o.obj[i][0]==1) {
					var x1=pm.miss[m][2][0]-o.obj[i][2][0];
					var y1=pm.miss[m][2][1]-o.obj[i][2][1];
					var x=Math.cos(o.obj[i][2][2])*x1-Math.sin(o.obj[i][2][2])*y1;
					var y=Math.sin(o.obj[i][2][2])*x1+Math.cos(o.obj[i][2][2])*y1;
					var a=x/0.05;
					var b=y/0.15;
					if (a*a+b*b<1) {
						o.obj[i][2][4]-=miss_dmg[1];
						pm.miss[m]=[0,0,[]];
						if (o.obj[i][2][4]<=0) o.destroy[o.obj[i][0]](i);
					}
				}
			}
		};
		this.collides[2]=function(m) {
			var i;
			for (i=0;i<obj_max;i++) {
				if (o.obj[i][0]==1) {
					var x1=pm.miss[m][2][0]-o.obj[i][2][0];
					var y1=pm.miss[m][2][1]-o.obj[i][2][1];
					var x=Math.cos(o.obj[i][2][2])*x1-Math.sin(o.obj[i][2][2])*y1;
					var y=Math.sin(o.obj[i][2][2])*x1+Math.cos(o.obj[i][2][2])*y1;
					var a=x/0.07;
					var b=y/0.17;
					if (a*a+b*b<1) {
						o.obj[i][2][4]-=miss_dmg[2];
						if (o.obj[i][2][4]<=0) o.destroy[o.obj[i][0]](i);
					}
				}
			}
		};
		this.collides[3]=function(m) {
			var i;
			for (i=0;i<obj_max;i++) {
				if (o.obj[i][0]==1) {
					if (o.obj[i][2][0]>=pm.miss[m][2][0]-0.1 && o.obj[i][2][0]<=pm.miss[m][2][0]+0.1 && o.obj[i][2][1]>=pm.miss[m][2][1]-0.15) {
						o.obj[i][2][4]-=miss_dmg[3];
						if (o.obj[i][2][4]<=0) o.destroy[o.obj[i][0]](i);
					}
				}
			}
		};
		this.collides[4]=function(m) {
			var i;
			for (i=0;i<obj_max;i++) {
				if (o.obj[i][0]==1) {
					var ball;
					for (ball=0;ball<2;ball++) {
						var x0=p.x+pm.miss[m][2][0]+Math.sin(Math.PI*(pm.miss[m][1]+ball*50)/50)*pm.miss[m][2][2];
						var y0=p.y+pm.miss[m][2][0]+Math.cos(Math.PI*(pm.miss[m][1]+ball*50)/50)*pm.miss[m][2][2];
						var x1=x0-o.obj[i][2][0];
						var y1=y0-o.obj[i][2][1];
						var ax=Math.cos(o.obj[i][2][2])*0.05-Math.sin(o.obj[i][2][2])*0.2;
						var by=Math.sin(o.obj[i][2][2])*0.05+Math.cos(o.obj[i][2][2])*0.2;
						var a=x1/(0.1+ax);
						var b=y1/(0.1+by);
						if (a*a+b*b<1) {
							o.obj[i][2][4]-=miss_dmg[4];
							if (o.obj[i][2][4]<=0) o.destroy[o.obj[i][0]](i);
						}
					}
				}
			}
		};
	}

	collide() {
		var i;
		for (i=0;i<missiles_max;i++) this.collides[this.miss[i][0]](i);
	}
	
	constructor() {
		this.miss=[];//[type,time,data], data=[x,y,a,s]
		this.prepare_creating();
		this.prepare_updates();
		this.prepare_drawing();
		this.prepare_collides();
		this.prepare();
	}
}

pm=new Player_Missiles();