function standardPlayerShipUpdate(ship) {
	ship.x = p.x;
	ship.y = p.y;
	
	for (var i in ship.upgrades) ship.upgrades[i].update();
	var canShoot = c.isPressed("space") && !ship.upgrades.cooling.overheat;
	for (var i in ship.weapons) {
		ship.upgrades.cooling.heat += ship.weapons[i].update(canShoot);
	}
	for (var i in ship.rotatedHitbox) ship.hitbox[i] = moveModel(ship.rotatedHitbox[i], ship.x, ship.y);
	for (var i in ship.jetEngines) ship.jetEngines[i].update();
}

function standardPlayerShipDraw(ship) {
	g.addPlayerShipTexture(ship.texture, moveModel(ship.v, ship.x, ship.y));
	for (var i in ship.weapons) ship.weapons[i].draw();
	for (var i in ship.upgrades) ship.upgrades[i].draw();
	for (var i in ship.jetEngines) ship.jetEngines[i].draw();
}

function standardsPlayerShipGetData(ship) {
	var data = {};
	var weapons = [];
	for (var i in ship.weapons) {
		weapons[i] = serialize(ship.weapons[i]);
	}
	data.weapons = weapons;
	var upgradesLevels = {};
	for (var i in ship.upgrades) {
		upgradesLevels[i] = ship.upgrades[i].level;
	}
	data.upgradesLevels = upgradesLevels;
	return data;
}

function standardsPlayerShipSetData(ship, data) {
	for (var i in data.weapons) {
		ship.weapons[i] = deserialize(data.weapons[i]);
	}
	for (var i in data.upgradesLevels) {
		ship.upgrades[i].level = data.upgradesLevels[i];
		ship.upgrades[i].levelChanged();
	}
}