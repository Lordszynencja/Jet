class PlayerWEmpty {
	update(shoot) {return -0.1;}
	setData(data) {}
	getData() {return {};}
	setSlot(id) {}
	levelChanged() {}
	draw() {}
	constructor(slot) {
		this.level = 0;
		this.price = 0;
		this.prices = [];
	}
}

classesList["PlayerWEmpty"] = PlayerWEmpty;
names["PlayerWEmpty"] = 'empty';
