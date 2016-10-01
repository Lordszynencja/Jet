//======== GRAPHICS =========\\

class Graphics {
	draw() {
		gl.clearColor(0.1,0.1,0.1,1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT);
		gl.clear(gl.COLOR_BUFFER_BIT);
		sh['textures'].draw();
		sh['effect0'].draw(0);
	}

	addLight(xy, rgb, type, data) {
		sh['textures'].addLight(xy, rgb, type, data);
	}
	
	addEffect0(pos, size) {
		sh['effect0'].addEffect(pos, size);
	}

	drawText(x,y,s,scale) {
		var i,j,length=0;
		/*for (i=0;i<s.length;i++) {
			var textData = this.characters[s[i]];
			if (s[i] in this.characters) {
				for (j=0;j<6;j++) {
					//this.add_v(0,[x+(dig_v[2*j]+length)*scale,y+dig_v[2*j+1]*scale,-0.999],[dig_tex[s[i]][2*j],dig_tex[s[i]][2*j+1]]);
				}
				//length+=dig_len[s[i]]/16;
			}
		}*/
	}
	
	update() {
		for (var i in sh) sh[i].update();
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
	
	addTextureVertexBackground(type, xy, txy) {
		sh['textures'].addVertex(type, xy, txy);
		//sh['textures_background'].addVertex(type, xy, txy);
	}
	
	addTextureVertex(type, xy, txy) {
		sh['textures'].addVertex(type, xy, txy);
	}
	
	addTextureVertexNoLight(type, xy, txy) {
		sh['textures'].addVertex(type, xy, txy);
		//sh['textures_no_light'].addVertex(type, xy, txy);
	}
	
	addTextureVertexGUI(type, xy, txy) {
		sh['textures'].addVertex(type, xy, txy);
		//sh['textures_gui'].addVertex(type, xy, txy);
	}
	
	constructor() {
		sh['textures'] = new ShaderTextures();
		sh['effect0'] = new ShaderEffect0();
	}
}
