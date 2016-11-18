class UI {
	draw() {
		this.menu.draw();
	}
	
	prepareGame() {
		p = new Player();
		enemies = [];
		enemyMissiles = [];
		playerMissiles = [];
		backgroundObjects = [];
		effects = [];
	}
	
	newMenu(newMenu) {
		this.menu = newMenu;
	}
	
	pressed(name) {
		this.menu.onPress(name);
	}
	
	update() {
		this.menu.update();
	}
	
	constructor() {
		this.menu = new MainMenu();
	}
}
