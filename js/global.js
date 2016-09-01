const tex_s=2048;
var light_max=64;
const obj_max=256;//obj[i]=[type,time,data],data=[x,y,a,s,hp,weapons],weapons[j]=[x,y,type,cd]
const missiles_max=512;
var g;
var d;
var s;
var o;
var em;
var pm;
var u;
var p;
var c;
var m;

function collide(vert1,vert2) {
	var i,s,s1;
	var l1=vert1.length;
	var l2=vert2.length;
	for (s=0;s<l1;s++) {
		for (s1=s+1;s1<l1;s1++) {
			var x1=vert1[s][0];
			var x2=vert1[s1][0];
			var y2=vert1[s1][1];
			var sfun;
			var tan;
			if (y1==y2) {
				sfun=shadow2;
				tan=0;
			} else {
				sfun=shadow;
				tan=(x2-x1)/(y2-y1);
			}
			var max=sfun(vert1[0],tan);
			var min=max;
			for (i=1;i<l1;i++) {
				var val=sfun(vert1[i],tan);
				if (val<min) min=val;
				else if (val>max) max=val;
			}
			var on_left=false;
			var on_right=false;
			for (i=0;i<l2;i++) {
				var val=sfun(vert2[i],tan);
				if (val>=min) on_right=true;
				if (val<=max) on_left=true;
			}
			if (!on_left || !on_right) return false;
		}
	}
	return true;
}

function make_coords2(x,y) {
	return [-x,-y, x,-y, x,y, -x,-y, -x,y, x,y];
}

function coords_test(x1,x2,y1,y2) {
	return [[x1,y1], [x2,y1], [x2,y2], [x1,y1], [x1,y2], [x2,y2]];
}

function make_coords4(x1,x2,y1,y2) {
	return [x1,y1, x2,y1, x2,y2, x1,y1, x1,y2, x2,y2];
}

function make_coords3(x,y,z) {
	return [[-x,-y,z], [x,-y,z], [x,y,z], [-x,-y,z], [-x,y,z], [x,y,z]];
}

function make_coords5(x1,x2,y1,y2,z) {
	return [[x1,y1,z], [x2,y1,z], [x2,y2,z], [x1,y1,z], [x1,y2,z], [x2,y2,z]];
}

const map_v=make_coords2(1,1.005);
const gameover_v=make_coords2(0.4,0.2);
const missile_v=[make_coords2(0,0),
	make_coords2(0.02,-0.02),
	make_coords2(0.05,-0.05),
	make_coords2(0.05,3.0),
	make_coords2(0.1,0.1)];
const enemy_v=make_coords2(0.15,0.15);
const ship_v=make_coords2(0.15,0.15);
const lives_v=make_coords2(0.2,0.05);
const lives2_v=make_coords4(-0.2,0.2,-0.04,0.04);
const dig_v=make_coords2(1,1);
const dig_len=[20,16,16,16,16,16,16,16,16,16];

var map_tex=make_coords4(0,511/tex_s,1023/tex_s,512/tex_s);
const gameover_tex=make_coords4(0,127/tex_s,63/tex_s,0);
const missile_tex=[make_coords2(0,0),
	make_coords4(0,255/tex_s,256/tex_s,511/tex_s),
	make_coords4(0,255/tex_s,256/tex_s,511/tex_s),
	make_coords4(1,1,0,0),
	make_coords4(353/tex_s,383/tex_s,287/tex_s,256/tex_s)];
const enemy_tex=make_coords4(256/tex_s,511/tex_s,255/tex_s,0);
const ship_tex=make_coords4(0,255/tex_s,255/tex_s,0);
const lives_tex=make_coords4(288/tex_s,319/tex_s,287/tex_s,256/tex_s);
const lives2_tex=make_coords4(320/tex_s,351/tex_s,287/tex_s,256/tex_s);
const heat_tex=make_coords4(256/tex_s,287/tex_s,287/tex_s,256/tex_s);
const dig_tex=[make_coords4(256/tex_s,287/tex_s,319/tex_s,288/tex_s),
	make_coords4(288/tex_s,319/tex_s,319/tex_s,288/tex_s),
	make_coords4(320/tex_s,351/tex_s,319/tex_s,288/tex_s),
	make_coords4(352/tex_s,383/tex_s,319/tex_s,288/tex_s),
	make_coords4(256/tex_s,287/tex_s,351/tex_s,320/tex_s),
	make_coords4(288/tex_s,319/tex_s,351/tex_s,320/tex_s),
	make_coords4(320/tex_s,351/tex_s,351/tex_s,320/tex_s),
	make_coords4(352/tex_s,383/tex_s,351/tex_s,320/tex_s),
	make_coords4(256/tex_s,287/tex_s,383/tex_s,352/tex_s),
	make_coords4(288/tex_s,319/tex_s,383/tex_s,352/tex_s)];

var map_pos;
var menu=3;
var pause=false;
var pause_t=0;
var time=0;
const shoot_chance=0.01;
const spawn_chance=0.05;
const miss_dmg=[0,1,5,8,1.5];
const miss_spd=[0,0.05,0.05,0,0];
const miss_del=[0,5,10,100,50];
const miss_heat=[0,2,5,10,20];
const miss_size=[[0],[0.01,0.02],[0.03,0.06],[0.05,3],[0.2]];
var weapon_lights=[[0,0,0],[1,0.6,0],[100,60,0],[100,10,10],[1,1,2]];