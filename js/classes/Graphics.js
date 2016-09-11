//======== GRAPHICS =========\\

class Graphics {
	load_tex(id,img) {
		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture[id]);
		this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE);
		this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,img);
		this.gl.bindTexture(this.gl.TEXTURE_2D,null);
	}
	
	load_textures() {
		this.con.fillStyle='blue';
		this.con.fillRect(0,0,tex_s,tex_s);
		var i;
		for (i=0;i<2;i++) {
			this.load_tex(i,this.canvas);
			var imgx=new Image();
			imgx.onload=(function(img,id) {
				return function() {
					g.load_tex(id,img);
				}
			})(imgx,i);
			imgx.src="textures/texture"+i+".png";
		}
	}

	create_shader() {
		this.load_textures();
		light_max=Math.floor(this.gl.getParameter(this.gl.MAX_VERTEX_UNIFORM_VECTORS)/9);
		//console.log("uniform vectors amount="+this.gl.getParameter(this.gl.MAX_VERTEX_UNIFORM_VECTORS));
		if (light_max*9>this.gl.getParameter(this.gl.MAX_VERTEX_UNIFORM_VECTORS)) {
			console.log("error: max uniforms number exceeded");
		}
		
		var vertCode=`
#define PI 3.1415926535897932384626433832795
attribute vec3 coordinates;
attribute vec2 TC;
varying vec2 TexCoords;
varying vec3 p;
void main(void) {
	gl_Position=vec4(coordinates,1.0);
	TexCoords=TC;
	p=coordinates;
}
`;

		var fragCode=
`#define PI 3.1415926535897932384626433832795
#define l_no `+light_max+`
precision mediump float;
varying vec2 TexCoords;
uniform sampler2D tex2D;
uniform vec3 lp[l_no];
uniform vec3 lc[l_no];
uniform int lt[l_no];
uniform vec2 ld[l_no];
varying vec3 p;

vec3 ls(in vec3 l_c, in float dist) {
	if (dist==0.0) dist=0.001;
	return l_c/pow(dist*128.0,2.0);
}

vec3 comp_l1(in vec3 l_p, in vec3 l_c, in vec2 l_d) {
  vec2 pv = normalize(p.xy-l_p.xy);
	float ang = mod((pv.y>0.0 ? asin(pv.x) : PI-asin(pv.x))-l_d.x,2.0*PI);
	if (ang<mod(l_d.y,2.0*PI) || ang>2.0*PI-mod(l_d.y,2.0*PI)) return ls(l_c,distance(p,l_p));
	return vec3(0.0,0.0,0.0);
}

vec3 comp_l2(in vec3 l_p, in vec3 l_c, in vec2 l_d) {//ligth start, light color, y=light height
	if (l_d.y>0.0) {
		if (p.y<l_p.y) return ls(l_c,distance(p,l_p));
		if (p.y>l_p.y+l_d.y) return ls(l_c,distance(p,vec3(l_p.x,l_p.y+l_d.y,l_p.z)));
		return ls(l_c,distance(p.xz,l_p.xz));
	} else {
		if (p.y>l_p.y) return ls(l_c,distance(p,l_p));
		if (p.y<l_p.y+l_d.y) return ls(l_c,distance(p,vec3(l_p.x,l_p.y+l_d.y,l_p.z)));
		return ls(l_c,distance(p.xz,l_p.xz));
	}
}

vec3 comp_l3(in vec3 l_p, in vec3 l_c, in vec2 l_d) {//ligth start, light color, x=light width
	if (l_d.x>0.0) {
		if (p.x<l_p.x) return ls(l_c,distance(p,l_p));
		if (p.x>l_p.x+l_d.x) return ls(l_c,distance(p,vec3(l_p.x+l_d.x,l_p.y,l_p.z)));
		return ls(l_c,distance(p.yz,l_p.yz));
	} else {
		if (p.x>l_p.x) return ls(l_c,distance(p,l_p));
		if (p.x<l_p.x+l_d.x) return ls(l_c,distance(p,vec3(l_p.x+l_d.x,l_p.y,l_p.z)));
		return ls(l_c,distance(p.yz,l_p.yz));
	}
}

vec3 comp_l4(in vec3 l_p, in vec3 l_c, in vec2 l_d) {
	if (l_p.x==0.0 && l_p.y==0.0) return comp_l1(vec3(0.0,0.0,l_p.z),l_c,vec2(0.0,PI));
	if (l_p.y==0.0) return comp_l2(vec3(-l_d.x/l_p.x,-2.0,l_p.z),l_c,vec2(4.0,4.0));
	if (l_p.x==0.0) return comp_l3(vec3(-2.0,-l_d.x/l_p.y,l_p.z),l_c,vec2(4.0,4.0));
	vec3 a,n;
	//float lz=1.0;
	a=vec3(0.0,-l_d.x/l_p.y,l_p.z);
	n=normalize(vec3(1.0/l_p.x,-1.0/l_p.y,0.0));
	return ls(l_c,distance((a-p),dot((a-p),n)*n));
}

vec3 cut_light(in vec3 light) {
	vec3 l=max(light,0.0);
	if (l.r>1.0) l.r=1.0+(l.r-1.0)/10.0;
	if (l.g>1.0) l.g=1.0+(l.g-1.0)/10.0;
	if (l.b>1.0) l.b=1.0+(l.b-1.0)/10.0;
	return l;
}

vec3 compute_lights() {
	vec3 light=vec3(0.4,0.4,0.4);
	for (int i=0;i<l_no;i++) {
		if (lt[i]==0) continue;
		else if (lt[i]==1) light+=comp_l1(lp[i], lc[i], ld[i]);
		else if (lt[i]==2) light+=comp_l2(lp[i], lc[i], ld[i]);
		else if (lt[i]==3) light+=comp_l3(lp[i], lc[i], ld[i]);
		else if (lt[i]==4) light+=comp_l4(lp[i], lc[i], ld[i]);
	}
	return cut_light(light);
}

void main(void) {
	vec4 tex_c=texture2D(tex2D,TexCoords);
	if (tex_c.a<0.01) discard;
	vec3 light=compute_lights();
	gl_FragColor=tex_c*vec4(compute_lights(),1.0);
	`+//`gl_FragColor=/*vec4(light,1.0)*/vec4(p.z/2.0+0.5,0.0,0.0,1.0);`+
`}
`;

		var vertShader=this.gl.createShader(this.gl.VERTEX_SHADER);
		this.gl.shaderSource(vertShader,vertCode);
		this.gl.compileShader(vertShader);
		
		if(!this.gl.getShaderParameter(vertShader, this.gl.COMPILE_STATUS)) {
			var error = this.gl.getShaderInfoLog(vertShader);
			console.log(vertCode);
			console.log("VERT SHADER ERROR\n"+error);
		}
		
		var fragShader=this.gl.createShader(this.gl.FRAGMENT_SHADER);
		this.gl.shaderSource(fragShader,fragCode);
		this.gl.compileShader(fragShader);
		
		if(!this.gl.getShaderParameter(fragShader, this.gl.COMPILE_STATUS)) {
			var error = this.gl.getShaderInfoLog(fragShader);
			console.log(fragCode);
			console.log("FRAG SHADER ERROR\n"+error);
		}

		this.shader=this.gl.createProgram();
		this.gl.attachShader(this.shader, vertShader);
		this.gl.attachShader(this.shader, fragShader);
		this.gl.linkProgram(this.shader);
		this.gl.useProgram(this.shader);
		//this.gl.enableVertexAttribArray(0);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.buf_vert);
		var coord=this.gl.getAttribLocation(this.shader,"coordinates");
		this.gl.vertexAttribPointer(coord,3,this.gl.FLOAT,false,0,0);
		this.gl.enableVertexAttribArray(coord);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.buf_tex);
		var Tcoord=this.gl.getAttribLocation(this.shader,"TC");
		this.gl.vertexAttribPointer(Tcoord,2,this.gl.FLOAT,false,0,0);
		this.gl.enableVertexAttribArray(Tcoord);
		this.loc_lp=this.gl.getUniformLocation(this.shader,"lp");
		this.loc_lc=this.gl.getUniformLocation(this.shader,"lc");
		this.loc_lt=this.gl.getUniformLocation(this.shader,"lt");
		this.loc_ld=this.gl.getUniformLocation(this.shader,"ld");
		this.loc_tex=this.gl.getUniformLocation(this.shader,"tex2D");
		
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LEQUAL);
		this.gl.viewport(0,0,this.canvas.width,this.canvas.height);
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
	}

	buf() {
		this.gl.uniform3fv(this.loc_lp,this.light_pos);
		this.gl.uniform3fv(this.loc_lc,this.light_c);
		this.gl.uniform1iv(this.loc_lt,this.light_t);
		this.gl.uniform2fv(this.loc_ld,this.light_d);
	}
	
	draw_frame() {
		if (g.canDraw) g.draw();
	}

	draw() {
		//var t1=performance.now();
		this.buf();
		this.gl.clearColor(0.0,0.0,0.0,1.0);
		this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		//console.log(this.gl.getProgramParameter(this.shader, this.gl.ACTIVE_UNIFORMS));
		var i;
		for (i=0;i<16;i++) {
			if (this.v[i]>0) {
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.buf_vert);
				this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(this.vert[i]),this.gl.STREAM_DRAW);
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.buf_tex);
				this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(this.TC[i]),this.gl.STREAM_DRAW);
				this.gl.activeTexture(this.gl.TEXTURE0);
				this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture[i]);
				this.gl.uniform1i(this.gl.getUniformLocation(this.shader,"tex2D"),0);
				this.gl.drawArrays(this.gl.TRIANGLES,0,this.v[i]);
			}
		}
		//this.gl.finish();
		//console.log(performance.now()-t1);
		requestAnimationFrame(this.draw_frame);
	}

	find_free_light() {
		var i=(this.last_light+1)%light_max;
		while (this.light_t[i]!=0 && i!=this.last_light) i=(i+1)%light_max;
		return i;
	}

	add_light(rgb,xyz,type,data) {
		var l = this.find_free_light();
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

	draw_text(x,y,s,scale) {
		var i,j,length=0;
		for (i=0;i<s.length;i++) {
			if (s[i]<10) {
				for (j=0;j<6;j++) {
					this.add_v(0,[x+(dig_v[2*j]+length)*scale,y+dig_v[2*j+1]*scale,-0.999],[dig_tex[s[i]][2*j],dig_tex[s[i]][2*j+1]]);
				}
				length+=dig_len[s[i]]/16;
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
		this.last_light=light_max-1;
		this.resetDrawing();
	}
	
	constructor() {
		this.canvas=document.getElementById('canv');
		this.gl=this.canvas.getContext('experimental-webgl');
		this.con=document.getElementById('Tcan').getContext('2d');
		this.vert=[];
		this.TC=[];
		this.v=[];

		this.buf_vert=this.gl.createBuffer();
		this.buf_tex=this.gl.createBuffer();
		this.texture=[];
		
		var i;
		for (i=0;i<16;i++) {
			this.vert[i]=[];
			this.TC[i]=[];
			this.texture[i]=this.gl.createTexture();
		}
		this.canDraw=true;
		this.loc_lp=null;
		this.loc_lc=null;
		this.loc_lt=null;
		this.loc_ld=null;
		this.light_c=[];
		this.light_pos=[];
		this.light_t=[];
		this.light_d=[];
		this.light_time=[];
		this.create_shader();
		this.prepare();
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
