var fragCode=`
precision highp float;

#define PI	3.1415926535897932384626433832795
#define PI2	6.2831853071795864769252867665590
#define stepsNo 4
#define stepsNoFloat float(stepsNo)
#define bpm 60.0
#define FPS `+FPS.toPrecision(20)+`
#define vector000 vec3(0.0,0.0,0.0)
#define vector001 vec3(0.0,0.0,1.0)
#define vector010 vec3(0.0,1.0,0.0)
#define vector011 vec3(0.0,1.0,1.0)
#define vector100 vec3(1.0,0.0,0.0)
#define vector101 vec3(1.0,0.0,1.0)
#define vector110 vec3(1.0,1.0,0.0)
#define vector111 vec3(1.0,1.0,1.0)

varying vec3 c;

uniform float time;

/*
#############################################
USEFUL FUNCTIONS
#############################################
*/

float to_angle(vec2 vect) {
	return mod((vect.y>0.0 ? 2.0*PI + acos(vect.x) : 2.0*PI-acos(vect.x)),2.0*PI);
}

float angle_between(float ang1, float ang2) {
	return min(mod(ang1-ang2,PI2),mod(ang2-ang1,PI2));
}

/*
#############################################
MAIN
#############################################
*/

void main(void) {
	gl_FragColor = vec4(c, pow(max(max(c.r, c.g), c.b), 2.0));
}
`;