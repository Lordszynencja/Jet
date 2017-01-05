function loadTex(texs, id, img) {
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texs[id]);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
	gl.bindTexture(gl.TEXTURE_2D, null);
}

function loadTextures(texs, name, texturesNo) {
	con.fillStyle = 'blue';
	con.fillRect(0, 0, tex_s, tex_s);
	
	for (var i=0;i<texturesNo;i++) {
		loadTex(texs, i, canvas);
		var imgx = new Image();
		imgx.onload = (function(texs, id, img) {
			return function() {
				loadTex(texs, id, img);
			}
		})(texs, i, imgx);
		imgx.src = "textures/"+name+"/texture"+i+".png";
	}
}

function texNo(texts) {
	var no = 0;
	for (var i in texts) if (texts[i][0]+1>no) no = texts[i][0]+1;
	return no;
}

//////////////////////
// SHADER FUNCTIONS //
//////////////////////

const shDefines = 
`precision highp float;

#define PI 3.1415926535897932384626433832795
#define PI2 6.283185307
#define vec111 vec3(1.0,1.0,1.0)
#define vec000 vec3(0.0,0.0,0.0)
`;

const shFunctions = `
///////////////
// FUNCTIONS //
///////////////

float to_angle(vec2 vect) {
	return mod((vect.y>0.0 ? PI2 + acos(vect.x) : PI2-acos(vect.x)), PI2);
}

float angle_between(float ang1, float ang2) {
	return min(mod(ang1-ang2, PI2), mod(ang2-ang1, PI2));
}
`;

const shEffects = `
/////////////
// EFFECTS //
/////////////

#define stepsNo 4
#define stepsNoFloat 4.0

vec3 toEightBit(vec3 actualColor) {
	vec3 endColor = vec3(0.0,0.0,0.0);
	float step = 1.0/(stepsNoFloat-1.0);
	vec3 col = actualColor;
	for (int i=0;i<stepsNo;i++) {
		endColor.r = (col.r>=(float(i)-0.49)*step-0.01 ? float(i)*step : endColor.r);
		endColor.g = (col.g>=(float(i)-0.49)*step-0.01 ? float(i)*step : endColor.g);
		endColor.b = (col.b>=(float(i)-0.49)*step-0.01 ? float(i)*step : endColor.b);
	}
	return endColor;
}
`;

const shLightFunctions = `
///////////
// LIGHT //
///////////

#define l_no ` + maxLights + `
#define basic_light 0.75
#define p3 vec3(p,h)

uniform bool use_lightning;

uniform vec2 lp[l_no];
uniform vec3 lc[l_no];
uniform int lt[l_no];
uniform vec2 ld[l_no];

vec3 ls(in vec3 l_c, in float dist) {
	if (dist==0.0) dist = 0.001;
	return l_c/pow(dist*128.0, 2.0);
}

vec3 comp_l1(in vec3 l_p, in vec3 l_c, in vec2 l_d) {
	vec2 pv = normalize(p.xy-l_p.xy);
	float ang = mod(to_angle(pv)-l_d.x,PI2);//mod((pv.x>0.0 ? asin(pv.y) : PI-asin(pv.y))-l_d.y, PI2);
	if (ang<l_d.y || ang>PI2-l_d.y) return ls(l_c, distance(p3, l_p));
	return vec000;
}

vec3 comp_l2(in vec3 l_p, in vec3 l_c, in vec2 l_d) {//vertical line light, l_d.y = light height
	if (l_d.y>0.0) {
		if (p.y<l_p.y) return ls(l_c,distance(p3, l_p));
		if (p.y>l_p.y+l_d.y) return ls(l_c, distance(p3, vec3(l_p.x, l_p.y+l_d.y, l_p.z)));
		return ls(l_c, distance(p3.xz, l_p.xz));
	} else {
		if (p.y>l_p.y) return ls(l_c,distance(p3, l_p));
		if (p.y<l_p.y+l_d.y) return ls(l_c, distance(p3, vec3(l_p.x, l_p.y+l_d.y, l_p.z)));
		return ls(l_c, distance(p3.xz, l_p.xz));
	}
}

vec3 comp_l3(in vec3 l_p, in vec3 l_c, in vec2 l_d) {//horizontal line light l_d.x = light width
	if (l_d.x>0.0) {
		if (p.x<l_p.x) return ls(l_c,distance(p3, l_p));
		if (p.x>l_p.x+l_d.x) return ls(l_c, distance(p3, vec3(l_p.x+l_d.x, l_p.y, l_p.z)));
		return ls(l_c, distance(p3.yz, l_p.yz));
	} else {
		if (p.x>l_p.x) return ls(l_c,distance(p3, l_p));
		if (p.x<l_p.x+l_d.x) return ls(l_c, distance(p3, vec3(l_p.x+l_d.x, l_p.y, l_p.z)));
		return ls(l_c, distance(p3.yz, l_p.yz));
	}
}

vec3 comp_l4(in vec3 l_p, in vec3 l_c, in vec2 l_d) {//line light l_d.x = 
	if (l_p.x==0.0 && l_p.y==0.0) return ls(l_c, distance(p3, l_p));
	if (l_p.y==0.0) return comp_l2(vec3(-l_d.x/l_p.x, -2.0, 0.0), l_c, vec2(0.0, 4.0));
	if (l_p.x==0.0) return comp_l3(vec3(-2.0, -l_d.x/l_p.y, 0.0), l_c, vec2(4.0, 0.0));
	
	vec3 a = vec3(0.0, -l_d.x/l_p.y, 0.0);
	vec3 n = normalize(vec3(1.0/l_p.x, -1.0/l_p.y, 0.0));
	return ls(l_c, distance((a-p3), dot((a-p3), n)*n));
}

vec3 cut_light(in vec3 l) {
	if (l.r>1.0) l.r = 1.0+(l.r-1.0)/4.0;
	if (l.g>1.0) l.g = 1.0+(l.g-1.0)/4.0;
	if (l.b>1.0) l.b = 1.0+(l.b-1.0)/4.0;
	return l;
}

vec3 compute_lights() {
	vec3 light = vec3(basic_light, basic_light, basic_light);
	for (int i=0;i<l_no;i++) {
		if (lt[i]==0) continue;
		else if (lt[i]==1) light += comp_l1(vec3(lp[i], h), lc[i], ld[i]);
		else if (lt[i]==2) light += comp_l2(vec3(lp[i], h), lc[i], ld[i]);
		else if (lt[i]==3) light += comp_l3(vec3(lp[i], h), lc[i], ld[i]);
		else if (lt[i]==4) light += comp_l4(vec3(lp[i], h), lc[i], ld[i]);
	}
	return cut_light(light);
}
`;

const shInvertion = `
///////////////
// INVERTION //
///////////////

uniform vec2 invertion_point;
uniform float invertion_range;

vec2 fragCoordPos() {
	return gl_FragCoord.xy/400.0-1.0;
}

vec4 computeInvertion(vec4 c) {
	if (invertion_range>0.0 && distance(invertion_point, fragCoordPos())<invertion_range) c.rgb = 1.0-c.rgb;
	return c;
}
`;

