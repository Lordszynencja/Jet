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
		enemies.push(new Enemy1(0,0,0,Math.PI*3/2,enemies.length));
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
