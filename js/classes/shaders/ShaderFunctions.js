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

function loadTextures(tex, name, texturesNo) {
	con.fillStyle = 'blue';
	con.fillRect(0, 0, tex_s, tex_s);
	
	for (var i=0;i<texturesNo;i++) {
		loadTex(tex, i, canvas);
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