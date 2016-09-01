//======== SOUND ==========\\

class Sound {
	play(x,v) {
		this.active_sound++;
		var a=this.active_sound;
		this.playing[a]=new Audio(this.sounds[x]);
		this.playing[a].onended=function() { delete s.playing[a]; };
		this.playing[a].volume=v*this.overall_volume;
		this.playing[a].play();
	}

	prepare() {
		var i;
		for (i in this.playing) this.playing[i].stop(),delete this.playing[i];
	}

	constructor() {
		this.active_sound=0;
		this.playing={};
		this.sounds={shot:"music/shot3.mp3",laser:"music/laser.mp3",gameover:"music/game_over.mp3"};
		this.overall_volume=1;
		this.prepare();
	}
}

s=new Sound();