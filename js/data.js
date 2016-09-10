//==== DATA ====\\

function swap_map(m) {
	if (m==0) {
		map_tex=make_coords4(0,511/tex_s,1023/tex_s,512/tex_s);
	} else {
		map_tex=make_coords4(512/tex_s,1023/tex_s,1023/tex_s,512/tex_s);
	}
}

const gameoverV=makeCoords2Z(0.4,0.2,-0.999);
const gameoverTex=makeCoords4(0,127/tex_s,63/tex_s,0);

/*const map_v=make_coords2(1,1.005);
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
const missile_tex=[make_coords2(0,0),
	,
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
	make_coords4(288/tex_s,319/tex_s,383/tex_s,352/tex_s)];*/

var map_pos = -1.5;
var menu=3;
var pause=false;
var pause_t=0;
var time=0;
const shoot_chance=0.01;
const spawn_chance=0.05;

function drawGameover() {
	for (var i=0;i<3;i++) {
		g.add_v(1,gameoverV[i],gameoverTex[i]);
	}
	for (var i=1;i<4;i++) {
		g.add_v(1,gameoverV[i],gameoverTex[i]);
	}
}