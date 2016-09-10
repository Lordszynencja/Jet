//==== GAME ====\\

function prepare() {
	g.prepare();
	s.prepare();
	d.prepare();
	em.prepare();
	pm.prepare();
	p.prepare();
	o.prepare();
}

function tick() {
	time++;
	if (!pause) {
		m.update();
		m.draw();
	}
}

prepare();
window.setInterval(tick,20);
g.draw();

//==== UPDATES ====\\

class Updates {
	update() {
		if (!p.dead) {
			map_pos-=0.003;
			if (map_pos<=-2.0) map_pos+=2.0;
			p.update();
			o.update();
			em.update();
			pm.update();
			if (Math.random()<spawn_chance) {
				var new_obj_data=[Math.random()-0.5,Math.random()+1,Math.PI*(0.75+Math.random()*0.5),Math.random()*0.03,10,[[0,0.15,1,0]]]
				o.add(1,new_obj_data);
			}
		}
	}

	collide() {
		o.collide();
		em.collide();
		pm.collide();
	}

	draw() {
		g.reset_drawing();
		var i;
		for (i=0;i<6;i++) {//setting map
			g.add_v(0,[map_v[2*i],map_v[2*i+1]+map_pos,0.999],[map_tex[2*i],map_tex[2*i+1]]);
		}
		for (i=0;i<6;i++) {//setting map 2
			g.add_v(0,[map_v[2*i],map_v[2*i+1]+map_pos+2,0.999],[map_tex[2*i],map_tex[2*i+1]]);
		}
		em.draw();
		pm.draw();
		o.draw();
		p.draw();
	}
}

u=new Updates();