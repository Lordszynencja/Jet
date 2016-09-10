//======== SHADER PART =========\\

class Graphics {
	load_textures() {
		this.con.fillStyle='blue';
		this.con.fillRect(0,0,tex_s,tex_s);
		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture);
		this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,this.canvas);
		this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE);
		this.gl.activeTexture(this.gl.TEXTURE1);
		this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture2);
		this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,this.canvas);
		this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE);
		this.gl.bindTexture(this.gl.TEXTURE_2D,null);
		var img=new Image();
		img.onload=function() {
			g.gl.bindTexture(g.gl.TEXTURE_2D,g.texture);
			g.gl.texImage2D(g.gl.TEXTURE_2D,0,g.gl.RGBA,g.gl.RGBA,g.gl.UNSIGNED_BYTE,img);
			g.gl.bindTexture(g.gl.TEXTURE_2D,null);
		}
		img.src="textures.png";
		var img2=new Image();
		img2.onload=function() {
			g.gl.bindTexture(g.gl.TEXTURE_2D,g.texture2);
			g.gl.texImage2D(g.gl.TEXTURE_2D,0,g.gl.RGBA,g.gl.RGBA,g.gl.UNSIGNED_BYTE,img2);
			g.gl.bindTexture(g.gl.TEXTURE_2D,null);
		}
		img2.src="textures2.bmp";
	}

	create_shader() {
		this.load_textures();
		light_max=Math.floor(this.gl.getParameter(this.gl.MAX_VERTEX_UNIFORM_VECTORS)/9);
		console.log(this.gl.getParameter(this.gl.MAX_VERTEX_UNIFORM_VECTORS));
		if (light_max*9>this.gl.getParameter(this.gl.MAX_VERTEX_UNIFORM_VECTORS)) {
			console.log("error: max uniforms number exceeded");
		}
		var vertCode=
		'attribute vec3 coordinates;'+
		'attribute vec2 TC;'+
		'varying vec2 TexCoords;'+
		'varying vec3 p;'+
		'void main(void) {'+
		'	gl_Position=vec4(coordinates,1.0);'+
		'	TexCoords=TC;'+
		'	p=coordinates;'+
		'}';

		var fragCode =/*point light TODO: add cone light from data*//*y=-c*//*x=-c/a*//*line light*/
		'precision mediump float;'+
		'varying vec2 TexCoords;'+
		'uniform sampler2D tex2D;'+
		'uniform vec3 lp['+light_max+'];'+
		'uniform vec3 lc['+light_max+'];'+
		'uniform int lt['+light_max+'];'+
		'uniform vec2 ld['+light_max+'];'+
		'varying vec3 p;'+
		'uniform float angle;'+
		'void main(void) {\
			vec4 tex_c=texture2D(tex2D,TexCoords);'+
		'	if (tex_c.a<0.5) discard;'+
		'	vec3 light=vec3(0.6,0.6,0.6);'+
		'	for (int i=0;i<'+light_max+';i++) {'+
		'		float distance=1.0;'+
		'		if (lt[i]==1) distance=length(p-lp[i]);'+
		'		else if (lt[i]==2) {'+
		'			vec3 a,n;'+
		'			float lz=1.0;'+
		'			if (lp[i].y==0.0) {'+
		'				if (p.y<ld[i].x) distance=length(p-vec3(-lp[i].z/lp[i].x,ld[i].x,lz));'+
		'				else if (p.y<=ld[i].y) {'+
		'					a=vec3(-lp[i].z/lp[i].x,0.0,lz);'+
		'					n=vec3(0.0,1.0,0.0);'+
		'					distance=length((a-p)-dot((a-p),n)*n);'+
		'				} else {'+
		'					distance=length(p-vec3(-lp[i].z/lp[i].x,ld[i].y,lz));'+
		'				}'+
		'			} else if (lp[i].x==0.0) {'+
		'				a=vec3(0.0,-lp[i].z/lp[i].y,lz);'+
		'				n=vec3(1.0,0.0,0.0);'+
		'				distance=length((a-p)-dot((a-p),n)*n);'+
		'			} else {'+
		'				a=vec3(0.0,-lp[i].z/lp[i].y,lz);'+
		'				n=normalize(vec3(1.0/lp[i].x,-1.0/lp[i].y,0.0));'+
		'				distance=length((a-p)-dot((a-p),n)*n);'+
		'			}'+
		'		}'+
		'		if (distance==0.0) distance=0.001;'+
		'		light=light+lc[i]/pow(distance*32.0,2.0);'+
		'	}'+
		'	light=max(light,0.0);\
			if (light.r>1.0) light.r=1.0+(light.r-1.0)/10.0;\
			if (light.g>1.0) light.g=1.0+(light.g-1.0)/10.0;\
			if (light.b>1.0) light.b=1.0+(light.b-1.0)/10.0;\
			gl_FragColor=tex_c*vec4(light,1.0);\
		}';
		var vertShader=this.gl.createShader(this.gl.VERTEX_SHADER);
		this.gl.shaderSource(vertShader,vertCode);
		this.gl.compileShader(vertShader);
		var fragShader=this.gl.createShader(this.gl.FRAGMENT_SHADER);
		this.gl.shaderSource(fragShader,fragCode);
		this.gl.compileShader(fragShader);

		this.shader=this.gl.createProgram();
		this.gl.attachShader(this.shader, vertShader);
		this.gl.attachShader(this.shader, fragShader);
		this.gl.linkProgram(this.shader);
		this.gl.useProgram(this.shader);

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
		
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LEQUAL);
		this.gl.viewport(0,0,this.canvas.width,this.canvas.height);
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
	}

	buf() {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.buf_vert);
		this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(this.vert),this.gl.STREAM_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.buf_tex);
		this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(this.TC),this.gl.STREAM_DRAW);
		this.gl.uniform3fv(this.loc_lp,this.light_pos);
		this.gl.uniform3fv(this.loc_lc,this.light_c);
		this.gl.uniform1iv(this.loc_lt,this.light_t);
		this.gl.uniform2fv(this.loc_ld,this.light_d);
	}
	
	draw_frame() {
		g.draw();
	}

	draw() {
		this.buf();
		this.gl.clearColor(0.0,0.0,0.0,1.0);
		this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		if (true) {
			this.gl.activeTexture(this.gl.TEXTURE0);
			this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture);
			this.gl.uniform1i(this.gl.getUniformLocation(this.shader,"tex2D"),0);
		} else {
			this.gl.activeTexture(this.gl.TEXTURE1);
			this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture2);
			this.gl.uniform1i(this.gl.getUniformLocation(this.shader,"tex2D"),1);
		}
		if (this.v>0) this.gl.drawArrays(this.gl.TRIANGLES,0,this.v);
		requestAnimationFrame(this.draw_frame);
	}

	find_free_light() {
		var i=(this.last_light+1)%light_max;
		while (this.light_t[i]!=0 && i!=this.last_light) i=(i+1)%light_max;
		return i;
	}

	add_light(rgb,xyz,type,data) {
		var l=this.find_free_light();
		this.light_pos[3*l]=xyz[0];
		this.light_pos[3*l+1]=xyz[1];
		this.light_pos[3*l+2]=xyz[2];
		this.light_c[3*l]=rgb[0];
		this.light_c[3*l+1]=rgb[1];
		this.light_c[3*l+2]=rgb[2];
		this.light_t[l]=type;
		this.light_d[2*l]=data[0];
		this.light_d[2*l+1]=data[1];
		this.light_time[l]=0;
	}

	add_v(xyz,txy) {
		this.vert[3*this.v]=xyz[0];
		this.vert[3*this.v+1]=xyz[1];
		this.vert[3*this.v+2]=xyz[2];
		this.TC[2*this.v]=txy[0];
		this.TC[2*this.v+1]=txy[1];
		this.v++;
	}

	draw_text(x,y,s,scale) {
		var i,j,length=0;
		for (i=0;i<s.length;i++) {
			if (s[i]<10) {
				for (j=0;j<6;j++) {
					this.add_v([x+(dig_v[2*j]+length)*scale,y+dig_v[2*j+1]*scale,-0.999],[dig_tex[s[i]][2*j],dig_tex[s[i]][2*j+1]]);
				}
				length+=dig_len[s[i]]/16;
			}
		}
	}

	update_light() {
		var i;
		for (i=0;i<light_max;i++) {
			if (this.light_t[i]>0) {
				this.light_time[i]++;
				if (this.light_t[i]==1) {
					if (this.light_time[i]>1) this.light_t[i]=0;
				} else if (this.light_t[i]==2) {
					if (this.light_time[i]>1) this.light_t[i]=0;
				}
			}
		}
	}
	
	reset_drawing() {
		this.v=0;
	}

	prepare() {
		var i;
		for (i=0;i<light_max;i++) {
			this.light_pos[3*i]=0;
			this.light_pos[3*i+1]=0;
			this.light_pos[3*i+2]=0;
			this.light_c[3*i]=0;
			this.light_c[3*i+1]=0;
			this.light_c[3*i+2]=0;
			this.light_t[i]=0;
			this.light_d[2*i]=0;
			this.light_d[2*i+1]=0;
			this.light_time[i]=0;
		}
		this.last_light=light_max-1;
		this.v=0;
	}
	
	constructor() {
		this.canvas=document.getElementById('canv');
		this.gl=this.canvas.getContext('experimental-webgl');
		this.con=document.getElementById('Tcan').getContext('2d');
		this.vert=[];
		this.TC=[];

		this.buf_vert=this.gl.createBuffer();
		this.buf_tex=this.gl.createBuffer();
		this.texture=this.gl.createTexture();
		this.texture2=this.gl.createTexture();
		this.loc_lp;
		this.loc_lc;
		this.loc_lt;
		this.loc_ld;
		this.light_c=[];
		this.light_pos=[];
		this.light_t=[];
		this.light_d=[];
		this.light_time=[];
		this.create_shader();
		this.prepare();
	}
}

g=new Graphics();