//==== DATA ====\\

class Data {
	laser_color(c) {
		weapon_lights[3]=[(c%2)*45+5,(Math.floor(c/2)%2)*45+5,(Math.floor(c/4)%2)*45+5];
	}

	swap_map(m) {
		if (m==0) {
			map_tex=make_coords4(0,511/tex_s,1023/tex_s,512/tex_s);
		} else {
			map_tex=make_coords4(512/tex_s,1023/tex_s,1023/tex_s,512/tex_s);
		}
	}
	
	prepare() {
		map_pos=-1.5;
	}
	
	constructor() {
		this.prepare();
	}
}

d=new Data();