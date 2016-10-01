class Effect0() {
	loadVertexShaderCode() {
		this.vertCode=`
#define PI 3.1415926535897932384626433832795
#define PI2 6.283185307
attribute vec3 coordinates;
varying vec3 p;

void main(void) {
	gl_Position = vec4(coordinates,1.0);
	p = coordinates;
}
`;
	}
	
	loadFragmentShaderCode() {
		this.fragCode=`
precision highp float;
#define PI 3.1415926535897932384626433832795
#define PI2 6.283185307
#define stepsNo 4
#define stepsNoFloat float(stepsNo)

uniform float time;
uniform bool eight_bit_mode;

varying vec3 p;

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

vec3 eight_bit(vec3 actualColor) {
	vec3 endColor = vec3(0.0,0.0,0.0);
	float step = 1.0/(stepsNoFloat-1.0);
	vec3 col = actualColor;
	for (int i=0;i<stepsNo;i++) {
		endColor.r = (col.r>=(float(i)-0.5)*step ? float(i)*step : endColor.r);
		endColor.g = (col.g>=(float(i)-0.5)*step ? float(i)*step : endColor.g);
		endColor.b = (col.b>=(float(i)-0.5)*step ? float(i)*step : endColor.b);
	}
	return endColor;
}

vec3 effect0(vec3 point, vec3 actualColor) {
	vec3 endColor = actualColor;
	float angle = to_angle(normalize(point.xy));
	float distance = (abs(sin(time*PI/5.0))*0.05+1.0)*sqrt(point.x*point.x+point.y*point.y);
	float a = angle+sin(time*PI/50.0)*PI;
	float b = angle+time*PI/50.0;
	float c = angle+time*PI/33.3333333;
	float m = 16.0;
	float white = pow(sin(a*4.0),8.0)*pow(sin(distance*PI*m),256.0);
	float green = pow(sin(b*4.0),8.0)*pow(sin(distance*PI*m/2.0),256.0);
	float blue = pow(sin(c*4.0),8.0)*pow(sin(distance*PI*m/4.0),256.0);
	float yellow = pow(sin(c*4.0),8.0)*pow(sin(distance*PI*m/8.0),256.0);
	float red = pow(sin(c*4.0),8.0)*pow(sin(distance*PI*m/16.0),256.0);
	endColor.r *= 1.0+red+yellow+white;
	endColor.g *= 1.0+green+yellow+white;
	endColor.b *= 1.0+blue+white;
	return endColor;
}

vec3 shader4(vec3 point) {
	float angle = to_angle(normalize(point.xy));
	float lightAngle = time*PI/100.0;
	float ang2 = angle_between(angle,lightAngle);
	return vec3(max(1.0-abs(ang2-PI*0.25),0.0),max(1.0-abs(ang2-PI*0.5),0.0),max(1.0-abs(ang2-PI*0.75),0.0));
}

///////////////////////
//  MAIN             //
///////////////////////

void main(void) {
	vec4 tex_c = texture2D(tex2D,TexCoords);
	if (tex_c.a<0.01) discard;
	vec3 light = (p.z<-0.5 ? compute_lights() : vec3(1.0,1.0,1.0));
	
	gl_FragColor = tex_c*vec4(compute_lights(),1.0);
	if (eight_bit_mode) gl_FragColor = vec4(shader1(p,gl_FragColor.rgb),gl_FragColor.a);
}
`;
	}
	
	prepareConstants() {
	}
	
	compileShaders() {
		var vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
		this.gl.shaderSource(vertShader,this.vertCode);
		this.gl.compileShader(vertShader);
		if (!this.gl.getShaderParameter(vertShader, this.gl.COMPILE_STATUS)) {
			var error = this.gl.getShaderInfoLog(vertShader);
			console.log(this.vertCode);
			console.log("##################\nVERT SHADER ERROR\n##################\n"+error);
		}
		
		var fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
		this.gl.shaderSource(fragShader,this.fragCode);
		this.gl.compileShader(fragShader);
		if (!this.gl.getShaderParameter(fragShader, this.gl.COMPILE_STATUS)) {
			var error = this.gl.getShaderInfoLog(fragShader);
			console.log(this.fragCode);
			console.log("##################\nFRAG SHADER ERROR\n##################\n"+error);
		}
		
		this.shader = this.gl.createProgram();
		this.gl.attachShader(this.shader, vertShader);
		this.gl.attachShader(this.shader, fragShader);
		this.gl.linkProgram(this.shader);
		this.gl.useProgram(this.shader);
	}
	
	prepareBuffers() {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufferVertices);
		var coordinatesAttribLocation = this.gl.getAttribLocation(this.shader,"coordinates");
		this.gl.vertexAttribPointer(coordinatesAttribLocation,3,this.gl.FLOAT,false,0,0);
		this.gl.enableVertexAttribArray(coordinatesAttribLocation);
		this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(this.v),this.gl.STREAM_DRAW);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufferTextures);
		var TCAttribLocation = this.gl.getAttribLocation(this.shader,"TC");
		this.gl.vertexAttribPointer(TCAttribLocation,2,this.gl.FLOAT,false,0,0);
		this.gl.enableVertexAttribArray(TCAttribLocation);
	}
	
	prepareUniforms() {
		this.loc_time = this.gl.getUniformLocation(this.shader,"time");
		this.loc_8bitmode = this.gl.getUniformLocation(this.shader,"eight_bit_mode");
	}

	createShader() {
		this.loadTextures();
		this.prepareConstants();
		this.loadVertexShaderCode();
		this.loadFragmentShaderCode();
		this.compileShaders();
		this.prepareBuffers();
		this.prepareUniforms();
	}

	setShaderData() {
		this.gl.uniform3fv(this.loc_lp,this.light_pos);
		this.gl.uniform3fv(this.loc_lc,this.light_c);
		this.gl.uniform1iv(this.loc_lt,this.light_t);
		this.gl.uniform2fv(this.loc_ld,this.light_d);
		this.gl.uniform1f(this.loc_time,time);
		this.gl.uniform1f(this.loc_8bitmode,eightBitMode);
	}

	draw() {
		g.gl.disable(this.gl.DEPTH_TEST);
		this.setBufferData();
		this.clearScene();
		console.log(this.gl.getProgramParameter(this.shader, this.gl.ACTIVE_UNIFORMS)+"/"+this.gl.getParameter(this.gl.MAX_VERTEX_UNIFORM_VECTORS));
		var i;
		for (i=0;i<16;i++) {
			if (this.v[i]>0) {
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.bufferVertices);
				this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(this.vert[i]),this.gl.STREAM_DRAW);
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.bufferTextures);
				this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(this.TC[i]),this.gl.STREAM_DRAW);
				this.gl.activeTexture(this.gl.TEXTURE0);
				this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture[i]);
				this.gl.uniform1i(this.gl.getUniformLocation(this.shader,"tex2D"),0);
				this.gl.drawArrays(this.gl.TRIANGLES,0,this.v[i]);
			}
		}
	}

	findFreeLight() {
		var i = (this.lastLight+1)%light_max;
		while (this.light_t[i]!=0 && i!=this.lastLight) i = (i+1)%light_max;
		if (i==this.lastLight) i = (i+1)%light_max;
		return i;
	}

	add_light(rgb,xyz,type,data) {
		var l = this.findFreeLight();
		this.light_pos[3*l]   = xyz[0];
		this.light_pos[3*l+1] = xyz[1];
		this.light_pos[3*l+2] = xyz[2];
		this.light_c[3*l]     = rgb[0];
		this.light_c[3*l+1]   = rgb[1];
		this.light_c[3*l+2]   = rgb[2];
		this.light_t[l]       = type;
		this.light_d[2*l]     = data[0];
		this.light_d[2*l+1]   = data[1];
		this.light_time[l]    = 0;
	}

	add_v(t,xyz,txy) {
		var vertice=this.v[t];
		this.vert[t][3*vertice]=xyz[0];
		this.vert[t][3*vertice+1]=xyz[1];
		this.vert[t][3*vertice+2]=xyz[2];
		this.TC[t][2*vertice]=txy[0];
		this.TC[t][2*vertice+1]=txy[1];
		this.v[t]++;
	}

	drawText(x,y,s,scale) {
		var i,j,length=0;
		for (i=0;i<s.length;i++) {
			var textData = this.characters[s[i]];
			if (s[i] in this.characters) {
				for (j=0;j<6;j++) {
					//this.add_v(0,[x+(dig_v[2*j]+length)*scale,y+dig_v[2*j+1]*scale,-0.999],[dig_tex[s[i]][2*j],dig_tex[s[i]][2*j+1]]);
				}
				//length+=dig_len[s[i]]/16;
			}
		}
	}

	updateLight() {
		var i;
		for (i=0;i<light_max;i++) {
			if (this.light_t[i]>0) {
				this.light_time[i]++;
				if (this.light_t[i]==1) {
					if (this.light_time[i]>1) this.light_t[i]=0;
				} else if (this.light_t[i]==2) {
					if (this.light_time[i]>1) this.light_t[i]=0;
				} else if (this.light_t[i]==3) {
					if (this.light_time[i]>1) this.light_t[i]=0;
				} else if (this.light_t[i]==4) {
					if (this.light_time[i]>1) this.light_t[i]=0;
				}
			}
		}
	}
	
	update() {
		this.resetDrawing();
		this.updateLight();
	}
	
	resetDrawing() {
		for (var i=0;i<16;i++) this.v[i] = 0,this.vert[i] = [];
	}

	prepare() {
		var i;
		for (i=0;i<light_max;i++) {
			this.light_pos[3*i] = 0;
			this.light_pos[3*i+1] = 0;
			this.light_pos[3*i+2] = 0;
			this.light_c[3*i] = 0;
			this.light_c[3*i+1] = 0;
			this.light_c[3*i+2] = 0;
			this.light_t[i] = 0;
			this.light_d[2*i] = 0;
			this.light_d[2*i+1] = 0;
			this.light_time[i] = 0;
		}
		this.lastLight = light_max-1;
		this.resetDrawing();
	}
	
	createCharacters() {
		this.characters = {
			//'0' : [],
			//'1' : []
		}
	}
	
	constructor() {
		this.gl = g.gl;
		this.vert = [];
		this.TC = [];
		this.v = [];

		this.bufferVertices = this.gl.createBuffer();
		
		this.loc_lp = null;
		this.loc_lc = null;
		this.loc_lt = null;
		this.loc_ld = null;
		this.light_c = [];
		this.light_pos = [];
		this.light_t = [];
		this.light_d = [];
		this.light_time = [];
		this.createShader();
		this.prepare();
		this.createCharacters();
		/*this.canvas.addEventListener('webglcontextlost', function(event){
			g.canDraw=false;
			event.preventDefault();
		}, false);

		this.canvas.addEventListener('webglcontextrestored', function(){
			g.create_shader();
			g.canDraw=true;
		}, false);*/
	}
}

	draw() {
		
	}
	
	constructor() {
		
	}
}