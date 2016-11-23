class Sound {
	defaultOnEnded(id) {
		return function() {
			delete s.playing[id];
		};
	}
	
	play(name, volume) {
		this.active_sound++;
		var a = this.active_sound;
		this.playing[a] = new Audio("sounds/" + this.sounds[name]);
		this.playing[a].onended = this.defaultOnEnded(a);
		this.playing[a].volume = volume*conf.overallVolume;
		this.playing[a].play();
	}
	
	playMusic(music) {
		if (this.music == null) {
			this.music = new Audio("music/" + this.musics[music]);
			this.music.volume = conf.musicVolume*this.overallVolume;
			this.music.loop = true;
		} else {
			for (var i=0;i<100;i++) {
				document.setTimeout((function(volume) {return function() {s.setMusicVolume(volume)}})(1-i/100), 10*i);
			}
			document.setTimeout(function() {s.music.stop(); delete s.music; s.music = null; s.playMusic(music)}, 1000);
		}
	}
	
	setMusicVolume(volume) {
		this.music.volume = colume*conf.overallVolume*conf.musicVolume;
	}

	prepare() {
		for (var i in this.playing) this.playing[i].stop(), delete this.playing[i];
	}

	constructor() {
		this.active_sound = 0;
		this.playing = {};
		this.overallVolume = 1;
		this.prepare();
		this.sounds = {
			shot: "shot3.mp3",
			laser: "laser.mp3",
			gameover: "game_over.mp3"
		};
		
		this.musics = {
			menu: "machinae_supremacy-shopmusic",
			level1: "machinae_supremacy-megascorcher"
		}
		
		this.music = null;
	}
}