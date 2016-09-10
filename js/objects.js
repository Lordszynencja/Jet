//==== OBJECTS ====\\

class Objects {
	find_free() {
		var i=(this.last_obj+1)%obj_max;
		while (this.obj[i][0]!=0 && i!=this.last_obj) i=(i+1)%obj_max;
		if (i==this.last_obj) i=(i+1)%obj_max;
		return i;
	};

	add(type,data) {
		var i=this.find_free();
		this.obj[i]=[type,0,data];
	};

	prepare() {
		this.last_obj=obj_max-1;
		var i;
		for (i=0;i<obj_max;i++) {
			this.obj[i]=[0,0,[]];
		}
	};

//==== updating ====\\

	prepare_updates() {
		this.updates=[];
		this.updates[0]=function(oi) {};
		this.updates[1]=function(oi) {
			o.obj[oi][2][0]-=Math.sin(o.obj[oi][2][2])*o.obj[oi][2][3];
			o.obj[oi][2][1]+=Math.cos(o.obj[oi][2][2])*o.obj[oi][2][3];
			if (o.obj[oi][2][0]>4 || o.obj[oi][2][0]<-4 || o.obj[oi][2][1]>4 || o.obj[oi][2][1]<-4) {
				o.obj[oi][0]=0;
			}
			var i;
			for (i=0;i<o.obj[oi][2][5].length;i++) {
				o.obj[oi][2][5][i][3]--;
				if (o.obj[oi][2][5][i][3]<=0) em.add[o.obj[oi][2][5][i][2]](oi,i);
			}
		};
	}
	
	update() {
		var i;
		for (i=0;i<obj_max;i++) this.updates[this.obj[i][0]](i);
	};

//==== coilliding ====\\
	
	prepare_collides() {
		this.collides=[];
		this.collides[0]=function(oi) {};
		this.collides[1]=function(oi) {};
	}

	collide() {
		var i;
		for (i=0;i<obj_max;i++) this.collides[this.obj[i][0]](i);
	}

//==== destroiying ====\\

	prepare_destroys() {
		this.destroy=[];
		this.destroy[0]=function(oi) {};
		this.destroy[1]=function(oi) {
			o.obj[oi]=[0,0,[]];
			p.score+=100;
		};
		this.destroy[2]=function(oi) {};
	}

//==== drawing ====\\

	prepare_drawing() {
		this.drawing=[];
		this.drawing[0]=function(oi) {};
		this.drawing[1]=function(oi) {
			var j;
			for (j=0;j<6;j++) {
				var x=o.obj[oi][2][0]+Math.cos(o.obj[oi][2][2])*enemy_v[2*j]-Math.sin(o.obj[oi][2][2])*enemy_v[2*j+1];
				var y=o.obj[oi][2][1]+Math.sin(o.obj[oi][2][2])*enemy_v[2*j]+Math.cos(o.obj[oi][2][2])*enemy_v[2*j+1];
				g.add_v(0,[x,y,0.001],[enemy_tex[2*j],enemy_tex[2*j+1]]);
			}
		};
	}

	draw() {
		var i;
		for (i=0;i<obj_max;i++) {
			this.drawing[this.obj[i][0]](i);
		}
	}
	
	constructor() {
		this.obj=[];
		this.prepare_updates();
		this.prepare_collides();
		this.prepare_destroys();
		this.prepare_drawing();
		this.prepare();
	}
}

o=new Objects();
