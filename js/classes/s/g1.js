var vertCode=`
#define PI 3.1415926535897932384626433832795
#define ratio `+ratio.toPrecision(20)+`

attribute vec2 v;
attribute vec3 color;

varying vec3 c;

void main(void) {
	gl_Position = vec4(v, 0.0, 1.0);
	c = color;
}
`;


