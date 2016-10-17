class ShaderTexturesBackground {
	prepareShaderCode() {
		this.vertCode=`
#define PI 3.1415926535897932384626433832795
#define PI2 6.283185307

attribute vec2 position;
attribute vec2 texture_position;

varying vec2 p;
varying vec2 tp;

void main(void) {
	p = position;
	tp = texture_position;
	gl_Position = vec4(position,0.0,1.0);
}
`;
		this.fragCode=`
precision highp float;

#define PI 3.1415926535897932384626433832795
#define PI2 6.283185307
#define stepsNo 4
#define stepsNoFloat float(stepsNo)
#define l_no ` + maxLights + `
#define basic_light 0.75

uniform float time;
uniform bool eight_bit_mode;
uniform sampler2D texture;
uniform vec2 lp[l_no];
uniform vec3 lc[l_no];
uniform int lt[l_no];
uniform vec2 ld[l_no];

varying vec2 p;
varying vec2 tp;

///////////////////////
// FUNCTIONS         //
///////////////////////

float to_angle(vec2 vect) {
	return mod((vect.y>0.0 ? 2.0*PI + acos(vect.x) : 2.0*PI-acos(vect.x)),2.0*PI);
}

float angle_between(float ang1, float ang2) {
	return min(mod(ang1-ang2,PI2),mod(ang2-ang1,PI2));
}

///////////////////////
// EFFECTS           //
///////////////////////

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

///////////////////////
//  MAIN             //
///////////////////////

void main(void) {
	vec4 texture_color = texture2D(texture,tp);
	if (texture_color.a<0.01) discard;
	gl_FragColor = texture_color;
	if (eight_bit_mode) gl_FragColor = vec4(toEightBit(gl_FragColor.rgb),gl_FragColor.a);
}
`;
	}
	
	prepareBuffers() {
		gl.useProgram(this.shader);
		prepareBuffer(this.bPosition, "position", this.shader, 2);
		prepareBuffer(this.bTexturePosition, "texture_position", this.shader, 2);
	}
	
	prepareUniforms() {
		this.uLp = gl.getUniformLocation(this.shader, "lp");
		this.uLc = gl.getUniformLocation(this.shader, "lc");
		this.uLt = gl.getUniformLocation(this.shader, "lt");
		this.uLd = gl.getUniformLocation(this.shader, "ld");
		this.uTime = gl.getUniformLocation(this.shader, "time");
		this.uEightBitMode = gl.getUniformLocation(this.shader, "eight_bit_mode");
		this.uTexture = gl.getUniformLocation(this.shader, "texture");
	}

	createShader() {
		loadTextures(this.texture, 'gui', this.texturesNo);
		this.prepareShaderCode();
		this.shader = compileShaders(this.vertCode, this.fragCode);
		this.prepareBuffers();
		this.prepareUniforms();
	}

	setUniformData() {
		gl.uniform2fv(this.uLp, this.lp);
		gl.uniform3fv(this.uLc, this.lc);
		gl.uniform1iv(this.uLt, this.lt);
		gl.uniform2fv(this.uLd, this.ld);
		gl.uniform1f(this.uTime, time);
		gl.uniform1f(this.uEightBitMode, eightBitMode);
	}
	
	setBufferData(i) {
		fillBuffer(this.bPosition, "position", this.shader, 2, this.position[i]);
		fillBuffer(this.bTexturePosition, "texture_position", this.shader, 2, this.texturePosition[i]);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this.texture[i]);
		gl.uniform1i(gl.getUniformLocation(this.shader, "texture"), 0);
	}

	draw() {
		gl.useProgram(this.shader);
		this.setUniformData();
		var i;
		for (i=0;i<this.texturesNo;i++) {
			if (this.positionCount[i]>0) {
				this.setBufferData(i);
				gl.drawArrays(gl.TRIANGLES, 0, this.positionCount[i]);
			}
		}
	}

	findFreeLight() {
		var i = (this.lastLight+1)%maxLights;
		while (this.lt[i]!=0 && i!=this.lastLight) i = (i+1)%maxLights;
		if (i==this.lastLight) i = (i+1)%maxLights;
		return i;
	}

	addLight(xy, rgb, type, data) {
		var l = this.findFreeLight();
		this.lp[2*l] = xy[0];
		this.lp[2*l+1] = xy[1];
		this.lc[3*l] = rgb[0];
		this.lc[3*l+1] = rgb[1];
		this.lc[3*l+2] = rgb[2];
		this.lt[l] = type;
		this.ld[2*l] = data[0];
		this.ld[2*l+1] = data[1];
		this.lightTime[l] = 0;
	}

	addVertex(t, xy, txy) {
		var v2 = this.positionCount[t]*2;
		for (var i=0;i<2;i++) {
			this.position[t][v2+i] = xy[i];
			this.texturePosition[t][v2+i] = txy[i];
		}
		this.positionCount[t]++;
	}
	
	resetDrawing() {
		for (var i=0;i<this.texturesNo;i++) {
			this.positionCount[i] = 0;
			this.position[i] = [];
		}
	}

	updateLight() {
		for (var i=0;i<maxLights;i++) {
			if (this.lt[i]>0) {
				this.lightTime[i]++;
				if (this.lt[i]==1) {
					if (this.lightTime[i]>1) this.lt[i] = 0;
				} else if (this.lt[i]==2) {
					if (this.lightTime[i]>1) this.lt[i] = 0;
				} else if (this.lt[i]==3) {
					if (this.lightTime[i]>1) this.lt[i] = 0;
				} else if (this.lt[i]==4) {
					if (this.lightTime[i]>1) this.lt[i] = 0;
				}
			}
		}
	}
	
	update() {
		this.resetDrawing();
		this.updateLight();
	}

	prepare() {
		for (var i=0;i<maxLights;i++) {
			this.lp[3*i] = 0;
			this.lp[3*i+1] = 0;
			this.lp[3*i+2] = 0;
			this.lc[3*i] = 0;
			this.lc[3*i+1] = 0;
			this.lc[3*i+2] = 0;
			this.lt[i] = 0;
			this.ld[2*i] = 0;
			this.ld[2*i+1] = 0;
			this.lightTime[i] = 0;
		}
		this.lastLight = maxLights-1;
		this.resetDrawing();
	}
	
	constructor() {
		this.texturesNo = texNo(GUITextures);
		this.position = [];
		this.texturePosition = [];
		this.positionCount = [];
		this.lp = [];
		this.lc = [];
		this.lt = [];
		this.ld = [];
		this.lightTime = [];

		this.bPosition = gl.createBuffer();
		this.bTexturePosition = gl.createBuffer();
		this.texture = [];
		
		for (var i=0;i<this.texturesNo;i++) {
			this.position[i] = [];
			this.texturePosition[i] = [];
			this.texture[i] = gl.createTexture();
		}
		
		this.createShader();
		this.prepare();
	}
}
