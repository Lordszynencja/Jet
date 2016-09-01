//==== GAME ====\\

function prepare() {
	g.prepare();
	s.prepare();
	d.prepare();
	em.prepare();
	pm.prepare();
	p.prepare();
	o.prepare();
}

function tick() {
	time++;
	if (!pause) {
		m.update();
		m.draw();
	}
}

prepare();
window.setInterval(tick,20);
g.draw();