class Sound {
	play(x,v) {
		this.active_sound++;
		var a = this.active_sound;
		this.playing[a] = new Audio("sounds/"+this.sounds[x]);
		this.playing[a].onended = function() { delete s.playing[a]; };
		this.playing[a].volume = v*this.overall_volume;
		this.playing[a].play();
	}

	prepare() {
		for (var i in this.playing) this.playing[i].stop(), delete this.playing[i];
	}

	constructor() {
		this.active_sound = 0;
		this.playing = {};
		this.overall_volume = 1;
		this.prepare();
		this.sounds = {
			shot:"shot3.mp3",
			laser:"laser.mp3",
			gameover:"game_over.mp3"
		};
	}
}