class Sound {
	defaultOnEnded(id) {
		return function() {
			delete s.playing[id];
		};
	}
	
	play(name, volume) {
		if (conf.sound) {
			this.activeSound++;
			var a = this.activeSound;
			this.playing[a] = new Audio("sounds/" + this.sounds[name]);
			this.playing[a].onended = this.defaultOnEnded(a);
			this.playing[a].volume = volume*conf.overallVolume*conf.effectsVolume;
			this.playing[a].play();
		}
	}
	
	playMusic(music) {
		if (conf.sound) {
			if (this.music) {
				this.music.pause();
				delete this.music;
			}
			this.music = new Audio("music/" + this.musics[music]);
			this.music.volume = this.musicVolume*conf.musicVolume*conf.overallVolume;
			this.music.loop = true;
			this.music.play();
			this.changingMusic = false;
		}
	}
	
	changeMusic(music, fadetime = 1) {
		if (conf.sound) {
			var thisvar = this;
			if (this.changingMusic) {
				return;
			} else if (this.music == null) {
				this.changingMusic = true;
				this.playMusic(music);
			} else {
				this.changingMusic = true;
				var musicVolume = this.musicVolume;
				var fadetimeScaled = fadetime*100;
				for (var i=0;i<fadetimeScaled;i++) {
					window.setTimeout((function(volume) {
							return function() {
								thisvar.setMusicVolume(volume);
							}
						})((1-i/fadetimeScaled)*musicVolume), 10*i);
				}
				window.setTimeout(function() {
						thisvar.playMusic(music);
						thisvar.setMusicVolume(1);
					}, fadetimeScaled*10);
			}
		}
	}
	
	setMusicVolume(volume) {
		this.musicVolume = volume;
		if (this.music) this.music.volume = volume*conf.overallVolume*conf.musicVolume;
	}

	prepare() {
		for (var i in this.playing) this.playing[i].pause(), delete this.playing[i];
		if (this.music) {
			this.music.pause();
			delete this.music;
		}
	}
	
	stopAll() {
		for (var i in this.playing) this.playing[i].pause(), delete this.playing[i];
		if (this.music) {
			this.music.pause();
			delete this.music;
		}
	}

	constructor() {
		this.musicVolume = 1;
		this.changingMusic = false;
		this.activeSound = 0;
		this.playing = {};
		this.prepare();
		this.sounds = {
			shot: "shot3.mp3",
			laser: "laser.mp3",
			gameover: "game_over.mp3"
		};
		
		this.musics = {
			menu: "machinae_supremacy-shopmusic.mp3",
			level1: "machinae_supremacy-megascorcher.mp3"
		}
		
		this.music = null;
	}
}