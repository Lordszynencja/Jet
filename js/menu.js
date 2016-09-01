//==== MENUS ====\\

class Menu {
	draw_option(name,x,y) {
		var i;
		for (i=0;i<6;i++) {
			var xyz=[this.menu_v[i][0]+x,this.menu_v[i][1]+y,this.menu_v[i][2]];
			g.add_v(1,xyz,this.menu_t[name][i]);
		}
	}
	
	prepare_drawings() {
		this.drawings=[];
		var this_var=this;
		this.drawings[0]=function() {
			u.update();
			u.collide();
			p.updateafter();
			g.update_light();
			u.draw();
		};
		this.drawings[1]=function() {
			g.update_light();
			u.draw();
			this_var.draw_option("continue",0,0.4);
			this_var.draw_option("options",0,0);
			this_var.draw_option("exit",0,-0.4);
			this_var.draw_option("select",0,-0.4*this_var.position-0.2+0.2*this_var.menu_s[menu]);
			m.update();
		};
		this.drawings[2]=function() {
			g.update_light();
			u.draw();
			this_var.draw_option("exit",0,0);
			this_var.draw_option("select",0,-0.4*this_var.position-0.2+0.2*this_var.menu_s[menu]);
			m.update();
		};
		this.drawings[3]=function() {
			g.reset_drawing();
			g.update_light();
			g.add_light([1000,10,1000],[c.mouseX,c.mouseY,1.0],1,[0,Math.PI/5]);
			g.add_light([100,10,10],[c.mouseX,c.mouseY,1.0],2,[0,-1]);
			g.add_light([10,100,10],[c.mouseX,c.mouseY,1.0],3,[1,0]);
			g.add_light([10,10,100],[c.mouseX,c.mouseY,1.0],4,[0,0]);
			var i;
			d.swap_map(1);
			for (i=0;i<6;i++) {//setting map
				g.add_v(0,[map_v[2*i],map_v[2*i+1]+map_pos,0.999],[map_tex[2*i],map_tex[2*i+1]]);
			}
			for (i=0;i<6;i++) {//setting map 2
				g.add_v(0,[map_v[2*i],map_v[2*i+1]+map_pos+2,0.999],[map_tex[2*i],map_tex[2*i+1]]);
			}
			this_var.draw_option("start",0,0.2);
			this_var.draw_option("options",0,-0.2);
			this_var.draw_option("select",0,-0.4*this_var.position-0.2+0.2*this_var.menu_s[menu]);
			m.update();
		};
	}
	
	draw() {
		g.add_light([1.0,1.0,1.0],[c.mouseX,c.mouseY,-1.0],1,[0,Math.PI/4]);
		this.drawings[menu]();
	}
	
	update() {
	}
	
	press(name) {
		if (name=="left") this.position=this.menu_c[menu][this.position][0];
		else if (name=="up") this.position=this.menu_c[menu][this.position][1];
		else if (name=="right") this.position=this.menu_c[menu][this.position][2];
		else if (name=="down") this.position=this.menu_c[menu][this.position][3];
		else if (name=="enter") {
			menu=this.menu_c[menu][this.position][4];
			if (menu>0) {
				this.position=0;
				this.stack.push(this.position);
			} else {
				this.position=this.stack.pop();
				menu=-menu;
			}
			if (menu==3) prepare();
		} else if (name=="esc") {
			if (menu==3) {
				menu=3;
			} else if (menu==0) {
				this.position=0;
				this.stack.push(0);
				menu=1;
			} else {
				this.position=this.stack.pop();
				menu=this.menu_c[menu][this.menu_s[menu]];
			}
		} else if (name=="p") pause=!pause;
	}
	
	prepare_pressed() {
		this.pressed=[];
		var this_var=this;
		this.pressed[0]=function(name) {
			this_var.press(name);
		};
		this.pressed[1]=function(name) {
			this_var.press(name);
		};
		this.pressed[2]=function(name) {
			this_var.press(name);
		};
		this.pressed[3]=function(name) {
			if (this_var.position==0 && name=="enter") prepare();
			this_var.press(name);
		};
	}
	
	prepare_updates() {
		this.updates=[];
		this.updates[0]=function() {};
		this.updates[1]=function() {};
		this.updates[2]=function() {};
		this.updates[3]=function() {};
	}
	
	prepare() {
		this.stack=[0];
		
	}
	
	constructor() {
		this.prepare_drawings();
		this.prepare_updates();
		this.prepare_pressed();
		this.stack=[0];
		
		this.position=0;
		this.menu_v=make_coords3(0.4,0.2,-0.999);
		this.menu_t={};
		this.menu_t["continue"]=coords_test(0,127/tex_s,95/tex_s,64/tex_s);
		this.menu_t["exit"]=coords_test(0,127/tex_s,127/tex_s,96/tex_s);
		this.menu_t["options"]=coords_test(0,127/tex_s,159/tex_s,128/tex_s);
		this.menu_t["select"]=coords_test(128/tex_s,255/tex_s,32/tex_s,0/tex_s);
		this.menu_t["start"]=coords_test(0,127/tex_s,191/tex_s,160/tex_s);
		this.menu_s=[];
		this.menu_s[0]=1;
		this.menu_s[1]=3;
		this.menu_s[2]=1;
		this.menu_s[3]=2;
		this.menu_c=[];//[left, up, right, down, enter],esc
		this.menu_c[0]=[[0,0,0,0,0],1];
		this.menu_c[1]=[[0,0,0,1,0],[1,0,1,2,2],[2,1,2,2,3],0];
		this.menu_c[2]=[[3,2,3,3,-1],1];
		this.menu_c[3]=[[0,0,0,1,0],[1,0,1,1,3],3];
	}
}

m=new Menu();