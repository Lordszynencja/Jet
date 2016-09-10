var interfaces = [];
interfaces[0] = new MainMenu();
interfaces[1] = new Game

class UI {
	draw() {
		
	}
	
	update() {
		
	}
	
	constructor() {
		this.menu = 0;
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