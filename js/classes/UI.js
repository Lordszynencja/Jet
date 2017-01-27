class UI {
	draw() {
		this.menu.draw();
	}
	
	prepareGame() {
		enemies = [];
		enemyMissiles = [];
		playerMissiles = [];
		backgroundObjects = [];
		effects = [];
		p.prepare();
	}
	
	newMenu(newMenu) {
		this.menu = newMenu;
	}
	
	pressed(name) {
		this.menu.onPress(name);
	}
	
	anyKey() {
		this.menu.anyKey();
	}
	
	update() {
		this.menu.update();
	}
	
	constructor() {
		this.menu = new MainMenu();
	}
}
